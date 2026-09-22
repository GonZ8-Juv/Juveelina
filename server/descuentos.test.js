import test from 'node:test';
import assert from 'node:assert/strict';
import { precioPorMedio, resumenPedido } from '../src/data/importes.js';

test('15% en ambos medios sin descontar envío ni inventar precios pendientes', () => {
  const precios = { transferencia: 1300, mercadopago: 1500 };
  assert.equal(precioPorMedio(precios, 'transferencia'), 1105);
  assert.equal(precioPorMedio(precios, 'mercadopago'), 1275);
  assert.equal(precioPorMedio(null, 'transferencia'), null);
  const items = [{ precio: precioPorMedio(precios, 'transferencia'), cantidad: 2 }];
  assert.equal(resumenPedido(items, 'envio').total, 2410);
  assert.equal(resumenPedido(items, 'retiro').total, 2210);
  assert.equal(resumenPedido([...items, { precio: null, cantidad: 1 }], 'envio').total, null);
  assert.deepEqual(precios, { transferencia: 1300, mercadopago: 1500 });
});
