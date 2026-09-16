import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(resolve(process.env.ORDER_DATA_DIR || './var', 'pedidos.sqlite'), { open: true });
try {
  if (process.argv.includes('--retry')) {
    const result = db.prepare("UPDATE outbox SET state='pending', attempts=0, next_attempt=0 WHERE state='failed'").run();
    console.log(`${result.changes} correos vuelven a la cola.`);
  }
  console.table(db.prepare('SELECT recipient, state, COUNT(*) AS cantidad FROM outbox GROUP BY recipient, state').all());
} finally { db.close(); }
