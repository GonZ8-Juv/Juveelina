import test from 'node:test';
import assert from 'node:assert/strict';
import { precioPorMedio, resumenPedido } from '../src/data/importes.js';

test('catálogo original y 10% web sin descontar envío ni inventar precios pendientes', () => {
  const precios = { transferencia: 1300, mercadopago: 1500 };
  assert.equal(precioPorMedio(precios, 'transferencia'), 1300);
  assert.equal(precioPorMedio(precios, 'mercadopago'), 1500);
  assert.equal(precioPorMedio(null, 'transferencia'), null);
  const items = [{ precio: precioPorMedio(precios, 'transferencia'), cantidad: 2 }];
  assert.equal(resumenPedido(items, 'envio').total, 2540);
  assert.equal(resumenPedido(items, 'retiro').total, 2340);
  assert.equal(resumenPedido([...items, { precio: null, cantidad: 1 }], 'envio').total, null);
  assert.equal(resumenPedido(items, 'envio').descuentoWeb, 260);
  assert.deepEqual(precios, { transferencia: 1300, mercadopago: 1500 });
});
