import { formatoPrecio, mediosPago, resumenPedido } from '../src/data/importes.js';

const escapar = (valor) => String(valor ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const multilinea = (valor) => escapar(valor).replace(/\r?\n/g, '<br>');

export function correoClienteHtml(pedido, id, config) {
  const { subtotal, pendiente, envio, total } = resumenPedido(pedido.items, pedido.entrega);
  const origen = config.origin || 'https://www.juveelina.com';
  const imagen = new URL('/mail/jmarr-2x.png', origen).href;
  const metodo = pedido.metodoPago || 'mercadopago';
  const filas = pedido.items.map((item) => `<tr><td style="padding:20px 0;border-bottom:1px solid #e5e5e5;vertical-align:top;">
    <strong style="font-size:15px;">${escapar(item.nombre)}</strong><br>
    <span style="color:#666;font-size:13px;">${escapar(item.color)}${item.talle ? ` · Talle ${escapar(item.talle)}` : ''}<br>Cantidad: ${item.cantidad}</span>
    </td><td align="right" style="padding:20px 0 20px 12px;border-bottom:1px solid #e5e5e5;vertical-align:top;font-size:14px;">${escapar(formatoPrecio(item.precio))}<br><span style="font-size:12px;color:#666;">por unidad</span></td></tr>`).join('');
  const importe = (label, value, bold = false) => `<tr><td style="padding:8px 0;${bold ? 'font-weight:700;font-size:18px;' : ''}">${label}</td><td align="right" style="padding:8px 0;${bold ? 'font-weight:700;font-size:18px;' : ''}">${escapar(value)}</td></tr>`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Recibimos tu solicitud · Juveelina</title></head>
  <body style="margin:0;padding:0;background:#fff;color:#111;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Gracias por elegir Juveelina. Recibimos tu solicitud y te responderemos por correo.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
  <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;"><tr><td style="padding:32px 24px 16px;text-align:center;">
  <img src="${escapar(imagen)}" alt="Juveelina" width="160" height="240" style="display:block;width:160px;max-width:100%;height:auto;margin:0 auto;border:0;">
  <p style="font-size:11px;letter-spacing:3px;margin:20px 0 0;">JUVEELINA</p>
  </td></tr><tr><td style="padding:24px;">
  <h1 style="font-size:28px;line-height:1.25;font-weight:700;margin:0 0 16px;overflow-wrap:anywhere;">Hola ${escapar(pedido.nombre)},</h1>
  <p style="font-size:15px;line-height:1.7;margin:0 0 32px;">¡Gracias por elegir Juveelina!</p>
  <h2 style="font-size:18px;line-height:1.4;margin:0 0 12px;">RECIBIMOS TU SOLICITUD</h2>
  <p style="font-size:12px;line-height:1.6;color:#666;margin:0 0 24px;word-break:break-all;">Solicitud ${escapar(id)}</p>
  <p style="font-size:14px;line-height:1.7;margin:0 0 32px;">Vamos a confirmar disponibilidad y el importe final. Después te enviaremos por correo ${metodo === 'transferencia' ? 'los datos bancarios para realizar la transferencia' : 'un enlace de Mercado Pago para completar el pago'}.</p>
  <h2 style="font-size:13px;letter-spacing:1px;margin:0;">TU PEDIDO</h2>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout:fixed;">${filas}</table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;margin-top:20px;">
  ${importe(pendiente ? 'Subtotal con precio informado' : 'Subtotal de productos', subtotal ? formatoPrecio(subtotal) : 'A confirmar')}
  ${importe(pedido.entrega === 'envio' ? 'Envío a domicilio' : 'Retiro en Punta Carretas', envio ? formatoPrecio(envio) : 'Sin costo')}
  ${importe('Total', total === null ? 'A confirmar' : formatoPrecio(total), true)}
  </table>
  <p style="font-size:12px;color:#666;line-height:1.6;margin:8px 0 32px;">Precios en pesos uruguayos (UYU).${pendiente ? '<br>Hay productos con precio a confirmar. Te enviaremos el importe final antes de pagar.' : ''}</p>
  <h2 style="font-size:13px;letter-spacing:1px;margin:0 0 10px;">${pedido.entrega === 'envio' ? 'ENVÍO A DOMICILIO' : 'RETIRO'}</h2>
  <p style="font-size:14px;line-height:1.7;margin:0 0 24px;">${pedido.entrega === 'envio' ? multilinea(pedido.direccion) : 'Punta Carretas, a coordinar.'}</p>
  <h2 style="font-size:13px;letter-spacing:1px;margin:0 0 10px;">MEDIO DE PAGO</h2>
  <p style="font-size:14px;margin:0 0 24px;">${escapar(mediosPago[metodo])}</p>
  ${pedido.notas ? `<h2 style="font-size:13px;letter-spacing:1px;margin:0 0 10px;">OBSERVACIONES</h2><p style="font-size:14px;line-height:1.7;margin:0 0 24px;">${multilinea(pedido.notas)}</p>` : ''}
  <p style="font-size:13px;line-height:1.7;padding-top:24px;border-top:1px solid #e5e5e5;">Todavía no se realizó ningún cobro ni se reservó stock. No necesitás enviar datos de tu tarjeta por correo.</p>
  <p style="font-size:14px;line-height:1.7;">Si querés corregir algo, respondé este mensaje.</p>
  <p style="font-size:14px;font-weight:700;margin:24px 0;">Equipo Juveelina</p>
  </td></tr></table></td></tr></table></body></html>`;
}
