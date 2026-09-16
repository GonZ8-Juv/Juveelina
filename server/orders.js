import { createHash, randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { validarPedido, crearCorreo, OrderError } from './pedido.js';
export { validarPedido, crearCorreo, OrderError } from './pedido.js';

export function abrirPedidos(path) {
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY, request_id TEXT UNIQUE NOT NULL, fingerprint TEXT NOT NULL,
      email TEXT NOT NULL, created_at INTEGER NOT NULL, data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS outbox (
      id INTEGER PRIMARY KEY, order_id TEXT NOT NULL, recipient TEXT NOT NULL,
      state TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0,
      next_attempt INTEGER NOT NULL DEFAULT 0, UNIQUE(order_id, recipient)
    );
    UPDATE outbox SET state='pending' WHERE state='sending';`);
  return db;
}

export function registrarPedido(db, body, now = Date.now()) {
  const pedido = validarPedido(body);
  const fingerprint = createHash('sha256').update(JSON.stringify(pedido)).digest('hex');
  const existente = db.prepare('SELECT id, fingerprint FROM orders WHERE request_id=?').get(body.requestId);
  if (existente) {
    if (existente.fingerprint !== fingerprint) throw new OrderError('Esta solicitud ya fue utilizada. Recargá la página para crear otra.', 409);
    return { id: existente.id, repetido: true };
  }
  const recientes = db.prepare('SELECT COUNT(*) AS count FROM orders WHERE email=? AND created_at>?').get(pedido.correo, now - 3600000);
  if (recientes.count >= 3) throw new OrderError('Ya recibimos varias solicitudes de este correo. Intentá más tarde o contactanos.', 429);
  const id = `JUV-${randomUUID()}`;
  db.exec('BEGIN IMMEDIATE');
  try {
    db.prepare('INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?)').run(id, body.requestId, fingerprint, pedido.correo, now, JSON.stringify(pedido));
    const queue = db.prepare('INSERT INTO outbox (order_id, recipient) VALUES (?, ?)');
    queue.run(id, 'tienda');
    queue.run(id, 'cliente');
    db.exec('COMMIT');
  } catch (error) { db.exec('ROLLBACK'); throw error; }
  return { id, repetido: false };
}

export async function procesarCorreos(db, transport, config, now = Date.now()) {
  const pendientes = db.prepare("SELECT outbox.*, orders.data FROM outbox JOIN orders ON orders.id=outbox.order_id WHERE state='pending' AND next_attempt<=? ORDER BY outbox.id LIMIT 10").all(now);
  for (const job of pendientes) {
    db.prepare("UPDATE outbox SET state='sending' WHERE id=?").run(job.id);
    try {
      const result = await transport.sendMail(crearCorreo(JSON.parse(job.data), job.order_id, job.recipient, config));
      if (!result.accepted?.length) throw new Error('SMTP did not accept recipient');
      db.prepare("UPDATE outbox SET state='sent', attempts=attempts+1 WHERE id=?").run(job.id);
    } catch {
      const attempts = job.attempts + 1;
      db.prepare('UPDATE outbox SET state=?, attempts=?, next_attempt=? WHERE id=?').run(attempts >= 8 ? 'failed' : 'pending', attempts, now + Math.min(3600000, 30000 * 2 ** attempts), job.id);
      console.error(`Correo pendiente: ${job.order_id}, ${job.recipient}, intento ${attempts}.`);
    }
  }
}
