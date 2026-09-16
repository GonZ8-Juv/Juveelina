import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { registrarPedido, OrderError } from './orders.js';

export function createApp({ db, ready, origin, trustProxy = false }) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', trustProxy);
  app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
  app.get('/api/pedidos/config', (req, res) => res.json({ disponible: ready() }));
  app.post('/api/pedidos',
    (req, res, next) => {
      if (!origin || req.get('origin') !== origin) return res.status(403).json({ error: 'Origen no permitido.' });
      if (!ready()) return res.status(503).json({ error: 'Los pedidos por correo todavía no están disponibles. Podés contactarnos por WhatsApp.' });
      if (!req.is('application/json')) return res.status(415).json({ error: 'Formato no válido.' });
      next();
    },
    rateLimit({ windowMs: 3600000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'Demasiados intentos. Probá más tarde.' } }),
    express.json({ limit: '24kb' }),
    (req, res, next) => {
      try {
        const result = registrarPedido(db, req.body);
        res.status(result.repetido ? 200 : 201).json({ id: result.id, estado: 'pendiente_confirmacion' });
      } catch (error) { next(error); }
    },
  );
  app.use('/api', (req, res) => res.status(404).json({ error: 'No encontrado.' }));
  // Express necesita los cuatro argumentos para reconocer un manejador de errores.
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    const status = error instanceof OrderError ? error.status : error.status === 413 ? 413 : error.type === 'entity.parse.failed' ? 400 : 500;
    res.status(status).json({ error: error instanceof OrderError ? error.message : 'No pudimos registrar la solicitud. Revisá los datos e intentá nuevamente.' });
  });
  return app;
}
