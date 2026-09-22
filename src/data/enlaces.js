import catalogo from './catalogo.json' with { type: 'json' };

const rutas = {
  'Campera-Jean': '/colecciones/campera-jean', Remeras: '/colecciones/remeras',
  'Buzos Uy': '/colecciones/buzos-uy', 'Cardigans UruWhy': '/colecciones/cardigans-uruwhy',
  Sweaters: '/colecciones/sweaters', Guríses: '/vestimenta/gurises',
  Mujeres: '/vestimenta/mujeres', Hombres: '/vestimenta/hombres',
  Carteras: '/accesorios/carteras', TOTES: '/accesorios/bags',
  'Materas criollas': '/accesorios/materas-criollas',
};

export function enlaceProducto(id) {
  const categoria = Object.keys(catalogo).find((nombre) => catalogo[nombre].some((p) => p.id === id));
  return rutas[categoria] ? `${rutas[categoria]}?producto=${encodeURIComponent(id)}` : null;
}
