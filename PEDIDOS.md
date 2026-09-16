# Pedidos y precios de Juveelina

La tienda registra solicitudes pendientes. No cobra, no reserva stock y no crea links de Mercado Pago automáticamente. El equipo confirma disponibilidad, precio final y entrega, responde con un link generado en Mercado Pago o los datos bancarios, según el medio elegido, y verifica el ingreso.

## Precios

El catálogo está en `src/data/catalogo.json`; cada variante tiene un ID estable. Los importes se editan en `src/data/precios.json`, en pesos uruguayos, como objetos con ambos medios (por ejemplo `{"transferencia": 1300, "mercadopago": 1500}`). `null` significa “Consultar precio”. Los precios recibidos se aplicaron a remeras cortas (incluidas camisetas Escudo), Sensación Uy de manga larga, buzos (incluidos Guríses), Oriental uy y Golden.uy con cierre, cardigans y camperas de jean. Accesorios siguen pendientes. Las apariciones del mismo producto comparten el ID y el precio. No cambiar los IDs existentes.

Después de editar precios, recompilar el frontend y reiniciar el servidor para que ambos usen la misma versión. El servidor obtiene los nombres, talles e importes del catálogo; no confía en precios enviados por el navegador. Los productos sin precio se pueden solicitar y quedan pendientes de cotización.

Las imágenes importadas se encuentran en `src/data/imagenes.js`. Al agregar imágenes al catálogo, agregar también su import en ese archivo.

## Activar el correo en Vercel (sitio publicado)

Las funciones `api/pedidos.js` y `api/pedidos/config.js` ejecutan el envío directamente en Vercel. No usan SQLite, disco persistente ni procesos en segundo plano. Se envían dos correos en una llamada a Resend: el pedido para `juveelinauy2@gmail.com` y el acuse para el cliente. El correo a la tienda usa Reply-To del cliente; la confirmación usa Reply-To de Juveelina.

1. Iniciar sesión en Resend y verificar un dominio propio, por ejemplo `juveelina.com`, agregando exactamente los registros DNS de envío que indique el proveedor. No modificar los registros MX de recepción existentes. No se puede usar `gmail.com` como dominio remitente propio.
2. Crear una clave de API limitada a enviar desde ese dominio. Guardarla directamente en Vercel, proyecto asociado a `juveelina.com` (actualmente `juveelina-o3qr`), Settings → Environment Variables → Production. No compartir la clave por chat.
3. Configurar `RESEND_API_KEY`, `MAIL_FROM` (por ejemplo `Juveelina <pedidos@juveelina.com>` una vez verificado el dominio), `ORDER_EMAIL=juveelinauy2@gmail.com` y `PUBLIC_ORIGIN=https://juveelina.com`. No usar prefijos `VITE_`.
4. Agregar en Vercel Firewall un límite por IP para solicitudes POST a `/api/pedidos`. El contador del código es por instancia y no sustituye una protección distribuida.
5. Volver a desplegar y comprobar que `/api/pedidos/config` responde `{"disponible":true}`. Esto confirma presencia de configuración, no verifica la clave ni la entrega: hacer un pedido de prueba autorizado y revisar ambos buzones y los eventos de Resend antes de dar el envío por activado.

La interfaz conserva el carrito si el proveedor rechaza o no confirma los dos envíos. Resend deduplica la misma clave de solicitud durante 24 horas; dentro de ese plazo se puede reintentar con los mismos datos sin duplicar el lote. La aceptación del proveedor no garantiza entrega en bandeja: revisar rebotes y spam. No hay una base de pedidos en este modo; el registro operativo es el correo de la tienda y los eventos del proveedor. Las pruebas automatizadas usan transporte simulado y no envían correos reales.

Documentación: https://resend.com/docs/api-reference/emails/send-batch-emails y https://resend.com/docs/knowledge-base/how-do-i-create-an-email-address-or-sender-in-resend .

## Alternativa: servidor Node con SMTP y almacenamiento persistente

1. Usar Node.js 24 o posterior y ejecutar `npm install`.
2. Copiar `.env.example` a `.env` y completar el remitente autorizado, correo receptor y datos SMTP del proveedor. Nunca poner credenciales en variables `VITE_`, código del navegador, Git ni mensajes de chat.
3. El correo confirmado para pedidos es `juveelinauy2@gmail.com`, valor predeterminado de `ORDER_EMAIL`. El remitente `MAIL_FROM` debe estar autorizado por el proveedor. El cliente puede responder directamente al correo de la tienda.
4. Para desarrollo: `npm run server` y, en otra terminal, `npm run dev`. `PUBLIC_ORIGIN` debe coincidir exactamente con el origen del navegador (por defecto `http://localhost:5173`).
5. En producción: `npm run build` y `npm start` en un hosting con procesos Node y disco persistente. El servidor sirve la web y `/api/pedidos`. Establecer `PUBLIC_ORIGIN` al dominio HTTPS definitivo. Un hosting de archivos estáticos por sí solo no ejecuta esta API.
6. Configurar `ORDER_DATA_DIR` en un volumen persistente privado, fuera de `dist`. Respaldar la base SQLite. Ejecutar una sola instancia de este servicio y ajustar `TRUST_PROXY_HOPS` solo a la configuración real del proxy del hosting.
7. Hacer una solicitud de prueba autorizada y comprobar recepción de ambos correos antes de anunciar la función. Las pruebas automatizadas usan un transporte simulado: no envían correo real.

El formulario se deshabilita si faltan las variables o no se logra verificar SMTP. El carrito se conserva y se ofrece WhatsApp. No hay confirmaciones ficticias en ese caso.

Se recomienda un proveedor de correo transaccional con dominio verificado. Gmail admite OAuth2 o contraseña de aplicación cuando la cuenta lo permite, pero no se recomienda como transporte de producción: https://nodemailer.com/guides/using-gmail . El receptor de pedidos puede seguir siendo Gmail aunque el remitente use otro proveedor.

## Entrega y operación del servidor Node con SMTP

Se mantuvieron las opciones ya anunciadas en la web: envío a todo el país y retiro en Punta Carretas. El envío cuesta $200 UYU por pedido y el retiro es sin costo. La tarifa compartida por el carrito y el servidor está en `src/data/importes.js`. Los productos sin precio siguen pendientes de cotización.

Cada solicitud se guarda en `orders` junto con dos tareas en `outbox`, una para la tienda y otra para el cliente. La respuesta de la API confirma el registro, no la entrega en la bandeja del destinatario. El servicio procesa la cola cada 30 segundos. Los correos fallidos se reintentan con demoras crecientes hasta 8 intentos; luego quedan en estado `failed` para revisión. Los logs solo muestran ID de solicitud, tipo de destinatario e intento.

La clave de solicitud evita duplicados al reintentar con los mismos datos durante la sesión. La confirmación por SMTP no garantiza que el mensaje no caiga en spam. Una interrupción justo después de aceptar SMTP y antes de marcar la tarea como enviada puede ocasionar un correo repetido, con la misma referencia.

No hay panel administrativo público. Los pedidos se gestionan desde el correo de la tienda. La base guarda datos personales: mantenerla privada, respaldada y definir con el negocio su plazo de conservación. Supervisar las tareas fallidas; `npm run orders:mail-status` muestra los conteos y `npm run orders:retry-mail` vuelve a poner las fallidas en cola después de corregir SMTP.

## Verificación

`npm test` comprueba validación, persistencia, reintentos, separación de destinatarios, importes y protección frente a duplicados. `npm run lint` y `npm run build` verifican el código y los assets.
