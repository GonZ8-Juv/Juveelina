import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { abrirPedidos, registrarPedido, validarPedido, procesarCorreos, crearCorreo } from './orders.js';
import { createApp } from './app.js';
import precios from '../src/data/precios.json' with { type: 'json' };
import { resumenImportes } from '../src/data/importes.js';

function body(overrides = {}) {
  return { requestId: randomUUID(), nombre: 'Cliente de prueba', correo: 'cliente@example.com', telefono: '099000000', entrega: 'retiro', metodoPago: 'mercadopago', notas: '', items: [{ productoId: 'JUV-001', talle: 'M', cantidad: 2 }], ...overrides };
}
const mailConfig = { from: 'tienda@example.com', to: 'pedidos@example.com' };

test('los importes del navegador no reemplazan el catálogo del servidor', () => {
  const pedido = validarPedido(body({ items: [{ productoId: 'JUV-001', talle: 'M', cantidad: 2, precio: 1, nombre: 'Manipulado' }], subtotal: 1 }));
  assert.equal(pedido.items[0].precio, 2720);
  assert.equal(pedido.items[0].precioOriginal, 3200);
  assert.equal(pedido.items[0].nombre, 'Campera de Jean');
  assert.equal(pedido.estado, 'pendiente_confirmacion');
});

test('aplica el precio del medio elegido y los accesorios quedan a confirmar', () => {
  const transferencia = validarPedido(body({ metodoPago: 'transferencia' }));
  const mercadoPago = validarPedido(body());
  assert.equal(transferencia.subtotal, 5100);
  assert.equal(mercadoPago.subtotal, 5440);
  assert.equal(transferencia.metodoPago, 'transferencia');
  assert.throws(() => validarPedido(body({ metodoPago: '__proto__' })));
  assert.throws(() => validarPedido(body({ metodoPago: undefined })));
  const mixto = validarPedido(body({ metodoPago: 'transferencia', items: [{ productoId: 'JUV-001', talle: 'M', cantidad: 1 }, { productoId: 'JUV-030', cantidad: 1 }] }));
  assert.equal(mixto.subtotal, 2550);
  assert.equal(mixto.pendiente, true);
  const correo = crearCorreo(transferencia, 'prueba', 'cliente', mailConfig);
  assert.match(correo.text, /datos bancarios para realizar la transferencia/);
  assert.doesNotMatch(correo.text, /enlace de Mercado Pago/);
});

test('envío fijo por pedido, retiro gratis y total pendiente si falta un precio', () => {
  for (const [metodoPago, total] of [['transferencia', 5300], ['mercadopago', 5640]]) {
    const pedido = validarPedido(body({ metodoPago, entrega: 'envio', direccion: 'Dirección de prueba', envio: 1, total: 1 }));
    assert.equal(pedido.envio, 200);
    assert.equal(pedido.total, total);
    for (const recipient of ['cliente', 'tienda']) {
      const correo = crearCorreo(pedido, 'prueba', recipient, mailConfig);
      assert.match(correo.text, /Costo de envío:.*200/);
      assert.match(correo.text, new RegExp(`Total:.*5[.,]${total === 5300 ? '300' : '640'}`));
      assert.doesNotMatch(correo.text, /envío a confirmar/);
    }
  }
  const retiro = validarPedido(body());
  assert.equal(retiro.envio, 0);
  assert.equal(retiro.total, 5440);
  const pendiente = validarPedido(body({ entrega: 'envio', direccion: 'Dirección de prueba', items: [{ productoId: 'JUV-030', cantidad: 1 }] }));
  assert.equal(pendiente.envio, 200);
  assert.equal(pendiente.total, null);
  assert.match(crearCorreo(pendiente, 'prueba', 'cliente', mailConfig).text, /Total a confirmar por productos/);
});

test('tarifas por tipo de prenda coinciden con la lista del negocio', () => {
  for (const [id, transferencia, mercadopago] of [
    ['JUV-001', 3000, 3200], ['JUV-003', 1500, 1800], ['JUV-005', 1300, 1500],
    ['JUV-013', 2100, 2400], ['JUV-014', 2400, 2700], ['JUV-018', 2300, 2600], ['JUV-019', 2300, 2600],
  ]) assert.deepEqual(precios[id], { transferencia, mercadopago });
});

test('calcula cantidades y marca importes pendientes sin tratar desconocidos como gratis', () => {
  assert.deepEqual(resumenImportes([{ precio: 1200, cantidad: 2 }, { precio: null, cantidad: 1 }]), { subtotal: 2400, pendiente: true });
  assert.deepEqual(resumenImportes([{ precio: 0.1, cantidad: 3 }]), { subtotal: 0.3, pendiente: false });
});

test('rechaza productos, talles, cantidades, correo y dirección inválidos', () => {
  for (const item of [{ productoId: 'fake', talle: 'M', cantidad: 1 }, { productoId: 'JUV-001', talle: 'FAKE', cantidad: 1 }, { productoId: 'JUV-001', talle: 'M', cantidad: -1 }]) assert.throws(() => validarPedido(body({ items: [item] })));
  assert.throws(() => validarPedido(body({ correo: 'a@example.com\r\nBcc: b@example.com' })));
  assert.throws(() => validarPedido(body({ correo: 'a,b@example.com' })));
  assert.throws(() => validarPedido(body({ entrega: 'envio', direccion: '' })));
  assert.throws(() => validarPedido(body({ website: 'spam' })));
  assert.throws(() => validarPedido(body({ items: [] })));
});

test('persiste el pedido y los correos; reintentar no crea duplicados incluso tras reiniciar', () => {
  const dir = mkdtempSync(join(tmpdir(), 'juveelina-test-'));
  let db;
  try {
    db = abrirPedidos(join(dir, 'orders.sqlite'));
    const input = body();
    const first = registrarPedido(db, input);
    db.close();
    db = abrirPedidos(join(dir, 'orders.sqlite'));
    assert.equal(registrarPedido(db, input).id, first.id);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM orders').get().n, 1);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM outbox').get().n, 2);
    assert.throws(() => registrarPedido(db, { ...input, nombre: 'Otro nombre' }), { status: 409 });
  } finally { db?.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('limita solicitudes por correo sin impedir repetir una solicitud existente', () => {
  const db = abrirPedidos(':memory:');
  try {
    const first = body();
    registrarPedido(db, first);
    registrarPedido(db, body());
    registrarPedido(db, body());
    assert.throws(() => registrarPedido(db, body()), { status: 429 });
    assert.equal(registrarPedido(db, first).repetido, true);
  } finally { db.close(); }
});

test('cola separada: reintenta solo el correo fallido, mantiene destinatarios y no afirma pago', async () => {
  const db = abrirPedidos(':memory:');
  try {
    registrarPedido(db, body(), 1000);
    const sent = [];
    const fake = { sendMail: async (mail) => {
      if (mail.to === mailConfig.to) throw new Error('Fallo simulado');
      sent.push(mail);
      return { accepted: [mail.to] };
    } };
    await procesarCorreos(db, fake, mailConfig, 1000);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].to, 'cliente@example.com');
    assert.equal(sent[0].replyTo, mailConfig.to);
    assert.match(sent[0].text, /Todavía no se realizó ningún cobro/);
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM outbox WHERE state='pending'").get().n, 1);
    await procesarCorreos(db, { sendMail: async (mail) => { sent.push(mail); return { accepted: [mail.to] }; } }, mailConfig, 100000);
    assert.equal(sent.length, 2);
    assert.equal(sent[1].to, mailConfig.to);
    assert.equal(sent[1].replyTo, 'cliente@example.com');
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM outbox WHERE state='sent'").get().n, 2);
    await procesarCorreos(db, fake, mailConfig, 200000);
    assert.equal(sent.length, 2);
  } finally { db.close(); }
});

test('API: deshabilitada sin correo, origen validado, registro real y repetición segura', async () => {
  const db = abrirPedidos(':memory:');
  let ready = false;
  const app = createApp({ db, ready: () => ready, origin: 'https://tienda.example' });
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const input = body();
  const post = (origin = 'https://tienda.example', content = input) => fetch(`${base}/api/pedidos`, { method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(content) });
  try {
    assert.deepEqual(await (await fetch(`${base}/api/pedidos/config`)).json(), { disponible: false });
    assert.equal((await post()).status, 503);
    ready = true;
    assert.equal((await post('https://otro.example')).status, 403);
    const first = await post();
    assert.equal(first.status, 201);
    const result = await first.json();
    const second = await post();
    assert.equal(second.status, 200);
    assert.equal((await second.json()).id, result.id);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM orders').get().n, 1);
    assert.equal((await post('https://tienda.example', body({ correo: 'no-email' }))).status, 400);
  } finally { await new Promise((resolve) => server.close(resolve)); db.close(); }
});
