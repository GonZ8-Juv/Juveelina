import catalogo from '../src/data/catalogo.json' with { type: 'json' };
import precios from '../src/data/precios.json' with { type: 'json' };
import { formatoPrecio, resumenImportes, precioPorMedio, mediosPago } from '../src/data/importes.js';

const productos = new Map(Object.values(catalogo).flat().map((p) => [p.id, p]));
const emailValido = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;
export class OrderError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
function campo(value, max, requerido = true) {
  if (typeof value !== 'string' || value.length > max || (requerido && !value.trim()) || [...value].some((char) => char.charCodeAt(0) < 32 && !['\n', '\r', '\t'].includes(char))) {
    throw new OrderError('Revisá los datos del formulario.');
  }
  return value.trim();
}

export function validarPedido(body) {
  if (!body || body.website || !/^[a-f0-9-]{36}$/i.test(body.requestId || '')) throw new OrderError('Solicitud no válida.');
  const nombre = campo(body.nombre, 100);
  const correo = campo(body.correo, 254).toLowerCase();
  if (!emailValido.test(correo)) throw new OrderError('Ingresá un correo válido.');
  const telefono = campo(body.telefono, 40);
  if (!Object.hasOwn(mediosPago, body.metodoPago)) throw new OrderError('Elegí transferencia bancaria o Mercado Pago.');
  if (!['envio', 'retiro'].includes(body.entrega)) throw new OrderError('Elegí envío o retiro.');
  const direccion = body.entrega === 'envio' ? campo(body.direccion, 400) : '';
  const notas = campo(body.notas ?? '', 1000, false);
  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 30) throw new OrderError('El pedido debe tener entre 1 y 30 productos.');
  const items = body.items.map((item) => {
    const producto = productos.get(item?.productoId);
    if (!producto || !Number.isInteger(item.cantidad) || item.cantidad < 1 || item.cantidad > 10) throw new OrderError('Revisá los productos y las cantidades.');
    const talle = producto.talles.length ? item.talle : null;
    if (producto.talles.length && !producto.talles.includes(talle)) throw new OrderError('Seleccioná un talle válido.');
    return { productoId: producto.id, nombre: producto.nombre, color: producto.color, talle, cantidad: item.cantidad, precio: precioPorMedio(precios[producto.id], body.metodoPago) };
  });
  const keys = items.map((item) => `${item.productoId}:${item.talle}`);
  if (new Set(keys).size !== keys.length) throw new OrderError('Agrupá las cantidades de cada producto.');
  return { nombre, correo, telefono, entrega: body.entrega, metodoPago: body.metodoPago, direccion, notas, items, ...resumenImportes(items), moneda: 'UYU', estado: 'pendiente_confirmacion' };
}

export function crearCorreo(pedido, id, recipient, config) {
  const metodoPago = pedido.metodoPago || 'mercadopago';
  const instrucciones = metodoPago === 'transferencia' ? 'los datos bancarios para realizar la transferencia' : 'un enlace de Mercado Pago para completar el pago';
  const detalle = pedido.items.map((item) => `• ${item.cantidad} × ${item.nombre} · ${item.color}${item.talle ? ` · Talle ${item.talle}` : ''} (${item.productoId}) — ${formatoPrecio(item.precio)} por unidad`).join('\n');
  const importe = pedido.pendiente
    ? `Hay productos con precio a confirmar.${pedido.subtotal ? ` Subtotal de productos con precio: ${formatoPrecio(pedido.subtotal)}.` : ''}`
    : `Subtotal de productos: ${formatoPrecio(pedido.subtotal)}.`;
  const entrega = pedido.entrega === 'envio' ? `Envío a: ${pedido.direccion}. Costo de envío a confirmar.` : 'Retiro en Punta Carretas, a coordinar.';
  const resumen = `Solicitud ${id}\nMedio de pago: ${mediosPago[metodoPago]}\nMoneda: pesos uruguayos (UYU)\n\n${detalle}\n\n${importe}\n${entrega}\n${pedido.notas ? `Observaciones: ${pedido.notas}\n` : ''}`;
  const cliente = recipient === 'cliente';
  return {
    from: config.from,
    to: cliente ? pedido.correo : config.to,
    replyTo: cliente ? config.to : pedido.correo,
    subject: cliente ? `Juveelina: recibimos tu solicitud ${id}` : `Nueva solicitud ${id} — ${mediosPago[metodoPago]}`,
    text: cliente
      ? `Hola ${pedido.nombre},\n\n¡Gracias por elegir Juveelina! Recibimos tu solicitud.\n\n${resumen}\nVamos a confirmar disponibilidad y el importe final. Después te enviaremos manualmente ${instrucciones}.\n\nTodavía no se realizó ningún cobro ni se reservó stock. No necesitás enviar datos de tu tarjeta por correo.\n\nSi querés corregir algo, respondé este mensaje.\n\nEquipo Juveelina`
      : `${resumen}\nCliente: ${pedido.nombre}\nCorreo: ${pedido.correo}\nTeléfono: ${pedido.telefono}\n\nPendiente de confirmación y pago. Revisar stock, confirmar el total con envío y responder al cliente con ${instrucciones}. Verificar el ingreso en ${metodoPago === 'transferencia' ? 'la cuenta bancaria' : 'Mercado Pago'} antes de preparar la entrega.`,
  };
}

