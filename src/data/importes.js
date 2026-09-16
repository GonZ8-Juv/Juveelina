export const tienePrecio = (precio) => Number.isFinite(precio) && precio > 0;
export const mediosPago = { transferencia: 'Transferencia bancaria', mercadopago: 'Mercado Pago' };
export const precioPorMedio = (precios, medio) => tienePrecio(precios?.[medio]) ? precios[medio] : null;
export const formatoPrecio = (precio) => tienePrecio(precio)
  ? new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(precio)
  : 'Consultar precio';

export function resumenImportes(items) {
  return {
    subtotal: items.reduce((total, item) => total + (tienePrecio(item.precio) ? Math.round(item.precio * 100) * item.cantidad : 0), 0) / 100,
    pendiente: items.some((item) => !tienePrecio(item.precio)),
  };
}
