import test from 'node:test';
import assert from 'node:assert/strict';
import { correoClienteHtml } from './correo-html.js';

test('HTML escapa los datos del comprador y mantiene envío, retiro y precios pendientes', () => {
  const pedido = { nombre: '<img src=x onerror=alert(1)>', direccion: 'A & B\nApartamento 2', notas: '<script>hola</script>', metodoPago: 'transferencia', entrega: 'envio', items: [{ nombre: 'Campera', color: 'Clara', talle: 'M', precio: 3000, cantidad: 2 }] };
  const html = correoClienteHtml(pedido, 'prueba', {});
  assert.doesNotMatch(html, /<script>|<img src=x/);
  assert.match(html, /&lt;img/);
  assert.match(html, /A &amp; B<br>Apartamento 2/);
  assert.match(html, /5\.600,00/);
  assert.match(html, /200,00/);
  const retiro = correoClienteHtml({ ...pedido, entrega: 'retiro' }, 'prueba', {});
  assert.match(retiro, /Sin costo/);
  assert.match(retiro, /5\.400,00/);
  const pendiente = correoClienteHtml({ ...pedido, items: [{ ...pedido.items[0], precio: null }] }, 'prueba', {});
  assert.match(pendiente, /Hay productos con precio a confirmar/);
  assert.doesNotMatch(pendiente, /Total<\/td><td[^>]*>\$/);
});
