import test from 'node:test';
import assert from 'node:assert/strict';
import catalogo from '../src/data/catalogo.json' with { type: 'json' };
import { enlaceProducto } from '../src/data/enlaces.js';

test('cada producto tiene un enlace estable y las variantes se distinguen', () => {
  const ids = new Set(Object.values(catalogo).flat().map((p) => p.id));
  for (const id of ids) {
    const url = new URL(enlaceProducto(id), 'https://www.juveelina.com');
    assert.equal(url.searchParams.get('producto'), id);
    assert.match(url.pathname, /^\/(colecciones|accesorios|vestimenta)\//);
  }
  assert.equal(enlaceProducto('JUV-001'), '/colecciones/campera-jean?producto=JUV-001');
  assert.notEqual(enlaceProducto('JUV-001'), enlaceProducto('JUV-002'));
  assert.equal(enlaceProducto('inexistente'), null);
});
