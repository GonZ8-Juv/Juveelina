import express from 'express';
import nodemailer from 'nodemailer';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { abrirPedidos, procesarCorreos } from './orders.js';
import { createApp } from './app.js';

const directory = resolve(process.env.ORDER_DATA_DIR || './var');
mkdirSync(directory, { recursive: true });
const db = abrirPedidos(resolve(directory, 'pedidos.sqlite'));
const config = { from: process.env.MAIL_FROM, to: process.env.ORDER_EMAIL || 'juveelinauy2@gmail.com' };
const configured = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'PUBLIC_ORIGIN'].every((name) => Boolean(process.env[name]));
const transport = configured ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_PORT || '465') === '465',
  requireTLS: (process.env.SMTP_PORT || '465') !== '465',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10000,
  socketTimeout: 20000,
}) : null;
let ready = false;
let processing = false;
async function tick() {
  if (!transport || processing) return;
  processing = true;
  try {
    if (!ready) { await transport.verify(); ready = true; }
    await procesarCorreos(db, transport, config);
  } catch { ready = false; console.error('El servicio de correo no está disponible. Revisar configuración SMTP.'); }
  finally { processing = false; }
}
const app = createApp({ db, ready: () => ready, origin: process.env.PUBLIC_ORIGIN, trustProxy: Number(process.env.TRUST_PROXY_HOPS || 0) });
app.use(express.static(resolve('dist')));
app.get('/{*path}', (req, res) => res.sendFile(resolve('dist/index.html')));
const server = app.listen(Number(process.env.PORT || 3001), '0.0.0.0', () => {
  console.log(`Servidor de Juveelina en puerto ${process.env.PORT || 3001}.`);
  if (!configured) console.log('Pedidos deshabilitados: falta configurar el correo y PUBLIC_ORIGIN.');
});
void tick();
const timer = setInterval(() => void tick(), 30000);
process.on('SIGTERM', () => { clearInterval(timer); server.close(() => process.exit(0)); });
