import { productosPorId } from "./catalogo.js";

export function cargarCarrito() {
  try {
    const stored = JSON.parse(localStorage.getItem('juveelina-cart') || '[]');
    if (!Array.isArray(stored)) return [];
    const grouped = new Map();
    for (const item of stored.slice(0, 100)) {
      if (!item || typeof item !== 'object') continue;
      const matches = Object.values(productosPorId).filter((p) => p.nombre === item.nombre && p.color === item.color && (!item.talle || p.talles.includes(item.talle)));
      const producto = productosPorId[item.productoId] || matches.find((p) => p.imagenes.includes(item.imagen)) || (matches.length === 1 ? matches[0] : null);
      const talle = producto?.talles.length ? item.talle : null;
      const key = producto ? `${producto.id}:${talle}` : item.id || crypto.randomUUID();
      const cantidad = Number.isInteger(item.cantidad) ? Math.min(10, Math.max(1, item.cantidad)) : 1;
      grouped.set(key, { ...item, id: key, productoId: producto?.id, talle, cantidad: Math.min(10, (grouped.get(key)?.cantidad || 0) + cantidad) });
    }
    return [...grouped.values()];
  } catch { return []; }
}

