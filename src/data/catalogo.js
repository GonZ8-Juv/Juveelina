import catalogo from './catalogo.json';
import precios from './precios.json';
import imagenes from './imagenes.js';

export const productosPorCategoria = Object.fromEntries(
  Object.entries(catalogo).map(([categoria, productos]) => [categoria,
    productos.map((producto) => ({
      ...producto,
      precios: precios[producto.id] ?? null,
      imagenes: producto.imagenes.map((imagen) => imagenes[imagen]),
    })),
  ]),
);

export const productosPorId = Object.fromEntries(
  Object.values(productosPorCategoria).flat().map((producto) => [producto.id, producto]),
);
