import { createHash } from 'node:crypto';
import { crearCorreo, validarPedido, OrderError } from './pedido.js';

export function configuracionCorreo(env = process.env) {
  return {
    key: env.RESEND_API_KEY,
    from: env.MAIL_FROM,
    to: env.ORDER_EMAIL || 'juveelinauy2@gmail.com',
    origin: env.PUBLIC_ORIGIN || 'https://juveelina.com',
  };
}

export const correoDisponible = (config) => Boolean(config.key && config.from && config.origin);

// Complementa el límite por IP de Vercel Firewall; no es un contador distribuido.
export function crearLimite() {
  const attempts = new Map();
  return (identity, now = Date.now()) => {
    for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
    const key = createHash('sha256').update(identity).digest('hex');
    const entry = attempts.get(key) || { count: 0, until: now + 3600000 };
    if (!attempts.has(key) && attempts.size >= 10000) return false;
    entry.count++;
    attempts.set(key, entry);
    return entry.count <= 10;
  };
}

export function crearHandler({ config = configuracionCorreo(), fetchImpl = fetch, permitir = crearLimite() } = {}) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Usá el formulario para enviar el pedido.' });
    }
    if (!correoDisponible(config)) return res.status(503).json({ error: 'El envío de pedidos todavía no está disponible. Podés contactarnos por WhatsApp.' });
    if (req.headers.origin !== config.origin) return res.status(403).json({ error: 'Origen no permitido.' });
    if (!req.headers['content-type']?.toLowerCase().startsWith('application/json')) return res.status(415).json({ error: 'Formato no válido.' });
    try {
      if (Number(req.headers['content-length']) > 24576) throw new OrderError('La solicitud es demasiado larga.', 413);
      const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? null);
      if (Buffer.byteLength(raw) > 24576) throw new OrderError('La solicitud es demasiado larga.', 413);
      let body;
      try { body = JSON.parse(raw); } catch { throw new OrderError('Revisá los datos del formulario.'); }
      const pedido = validarPedido(body);
      const ip = String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown');
      if (!permitir(`ip:${ip}`) || !permitir(`correo:${pedido.correo}`)) {
        res.setHeader('Retry-After', '3600');
        return res.status(429).json({ error: 'Demasiados intentos. Esperá un rato antes de volver a enviar.' });
      }
      const id = `JUV-${body.requestId}`;
      const emails = ['tienda', 'cliente'].map((recipient) => {
        const mail = crearCorreo(pedido, id, recipient, config);
        return { from: mail.from, to: [mail.to], reply_to: mail.replyTo, subject: mail.subject, text: mail.text };
      });
      const response = await fetchImpl('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `pedido/${body.requestId}` },
        body: JSON.stringify(emails),
        signal: AbortSignal.timeout(12000),
      });
      const result = await response.json();
      if (!response.ok || !Array.isArray(result.data) || result.data.length !== 2 || result.data.some((email) => !email.id)) {
        // No devolver errores del proveedor que puedan contener direcciones o configuración.
        console.error(`Proveedor de correo: estado ${response.status}, solicitud ${id}.`);
        return res.status(502).json({ error: 'No pudimos confirmar el envío. Tu carrito sigue guardado; reintentá con los mismos datos.' });
      }
      return res.status(201).json({ id, estado: 'pendiente_confirmacion' });
    } catch (error) {
      return res.status(error instanceof OrderError ? error.status : 502).json({ error: error instanceof OrderError ? error.message : 'No pudimos confirmar el envío. Tu carrito sigue guardado; reintentá con los mismos datos.' });
    }
  };
}
