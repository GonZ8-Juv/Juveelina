import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { crearHandler, correoDisponible, crearLimite } from './vercel-pedidos.js';

const config = { key: 'clave-ficticia-para-pruebas', from: 'Juveelina <pedidos@example.com>', to: 'tienda@example.com', origin: 'https://tienda.example' };
function request() {
  return { method: 'POST', headers: { origin: config.origin, 'content-type': 'application/json' }, socket: { remoteAddress: '127.0.0.1' }, body: {
    requestId: randomUUID(), nombre: 'Prueba', correo: 'cliente@example.com', telefono: '099000000', metodoPago: 'transferencia', entrega: 'retiro',
    items: [{ productoId: 'JUV-001', talle: 'M', cantidad: 2, precio: 1 }],
  } };
}
function response() {
  return { code: 200, headers: {}, setHeader(name, value) { this.headers[name] = value; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
}

test('Vercel: envía ambos correos, usa precio del catálogo y permite responder al destinatario correcto', async () => {
  const sent = [];
  const handler = crearHandler({ config, fetchImpl: async (url, options) => { sent.push({ url, ...options }); return { ok: true, json: async () => ({ data: [{ id: 'tienda' }, { id: 'cliente' }] }) }; } });
  const req = request();
  const res = response();
  await handler(req, res);
  assert.equal(res.code, 201);
  assert.equal(res.body.id, `JUV-${req.body.requestId}`);
  const emails = JSON.parse(sent[0].body);
  assert.equal(emails.length, 2);
  assert.deepEqual(emails[0].to, [config.to]);
  assert.equal(emails[0].reply_to, 'cliente@example.com');
  assert.deepEqual(emails[1].to, ['cliente@example.com']);
  assert.equal(emails[1].reply_to, config.to);
  assert.match(emails[1].text, /Recibimos tu solicitud/);
  assert.match(emails[1].text, /6[.,]000/);
  assert.match(emails[1].text, /datos bancarios/);
  await handler(req, response());
  assert.equal(sent[0].headers['Idempotency-Key'], sent[1].headers['Idempotency-Key']);
  assert.equal(sent[0].body, sent[1].body);
});

test('Vercel: no confirma éxito si falla el proveedor o solo devuelve un correo', async () => {
  for (const result of [{ ok: false, status: 403, data: {} }, { ok: true, status: 200, data: { data: [{ id: 'solo-uno' }] } }]) {
    const res = response();
    await crearHandler({ config, fetchImpl: async () => ({ ...result, json: async () => result.data }) })(request(), res);
    assert.equal(res.code, 502);
    assert.equal(res.body.id, undefined);
  }
  const res = response();
  await crearHandler({ config, fetchImpl: async () => { throw new Error('timeout'); } })(request(), res);
  assert.equal(res.code, 502);
});

test('Vercel: exige configuración, origen, formato y datos válidos antes de enviar', async () => {
  assert.equal(correoDisponible({}), false);
  const calls = [];
  const fetchImpl = async () => { calls.push(true); throw new Error('No debe enviar'); };
  for (const [overrides, expected] of [
    [{ method: 'GET' }, 405], [{ headers: { origin: 'https://otro.example' } }, 403],
    [{ headers: { origin: config.origin, 'content-type': 'text/plain' } }, 415],
    [{ body: { ...request().body, website: 'spam' } }, 400],
    [{ body: '{' }, 400], [{ body: 'x'.repeat(25000) }, 413],
  ]) {
    const res = response();
    await crearHandler({ config, fetchImpl })({ ...request(), ...overrides }, res);
    assert.equal(res.code, expected);
  }
  const res = response();
  await crearHandler({ config: {}, fetchImpl })(request(), res);
  assert.equal(res.code, 503);
  assert.equal(calls.length, 0);
});

test('Vercel: limita intentos y recupera la ventana sin guardar direcciones en el contador', async () => {
  const permitir = crearLimite();
  for (let i = 0; i < 10; i++) assert.equal(permitir('ip:prueba', 0), true);
  assert.equal(permitir('ip:prueba', 0), false);
  assert.equal(permitir('ip:prueba', 3600001), true);
  const res = response();
  await crearHandler({ config, permitir: () => false })(request(), res);
  assert.equal(res.code, 429);
});
