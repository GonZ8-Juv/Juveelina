import { departamentos, barriosMontevideo, errorEntrega } from '../data/entrega.js';
import { normalizarCorreo, errorCorreo, sugerirCorreo } from '../data/correo.js';
import { normalizarNombre, errorNombre } from '../data/nombre.js';
import { useEffect, useRef, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { productosPorId } from '../data/catalogo.js';
import { formatoPrecio, resumenPedido, precioPorMedio, mediosPago } from '../data/importes.js';
import './Carrito.css';

const inicial = { nombre: '', correo: '', telefono: '', entrega: 'envio', metodoPago: 'mercadopago', direccion: '', departamento: '', barrio: '', calle: '', numero: '', apartamento: '', notas: '', website: '' };

export default function Carrito({ visible, onClose, items, setItems }) {
  const [form, setForm] = useState(inicial);
  const sugerenciaCorreo = sugerirCorreo(form.correo);
  const [disponible, setDisponible] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [pedido, setPedido] = useState(null);
  const intento = useRef(null);
  const submitLock = useRef(false);
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const productos = items.map((item) => ({ ...item, ...productosPorId[item.productoId], precio: precioPorMedio(productosPorId[item.productoId]?.precios, form.metodoPago), id: item.id, cantidad: item.cantidad, talle: item.talle, productoId: item.productoId }));
  const invalido = productos.some((p) => !productosPorId[p.productoId] || (p.talles.length > 0 && !p.talles.includes(p.talle)));
  const { subtotal, pendiente, descuentoWeb, envio, total } = resumenPedido(productos, form.entrega);

  useEffect(() => {
    if (!visible) return;
    const controller = new AbortController();
    fetch('/api/pedidos/config', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(8000)]) })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => setDisponible(data.disponible === true))
      .catch(() => { if (!controller.signal.aborted) setDisponible(false); });
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { controller.abort(); document.body.style.overflow = overflow; previous?.focus(); };
  }, [visible]);

  function cambiar(event) {
    const { name, value } = event.target;
    const valor = name === 'telefono' ? value.replace(/[^0-9]/g, '').slice(0, 9) : value;
    setForm((prev) => ({ ...prev, [name]: valor, ...(name === 'departamento' ? { barrio: '' } : {}) }));
    setError('');
  }

  async function enviar(event) {
    event.preventDefault();
    if (submitLock.current || !disponible || invalido || !items.length) return;
    const nombre = normalizarNombre(form.nombre);
    const mensajeNombre = errorNombre(nombre);
    if (mensajeNombre) {
      setError(mensajeNombre);
      return;
    }
    if (!/^09[0-9]{7}$/.test(form.telefono)) {
      setError('Ingresá un celular de Uruguay de 9 dígitos que empiece con 09.');
      return;
    }
    const correo = normalizarCorreo(form.correo);
    const mensajeCorreo = errorCorreo(correo);
    if (mensajeCorreo) {
      setError(mensajeCorreo);
      return;
    }
    const mensajeEntrega = errorEntrega(form);
    if (mensajeEntrega) { setError(mensajeEntrega); return; }
    submitLock.current = true;
    setEnviando(true);
    setError('');
    const payload = { ...form, nombre, correo, direccion: form.entrega === 'envio' ? form.direccion : '', items: productos.map(({ productoId, talle, cantidad }) => ({ productoId, talle, cantidad })) };
    const serialized = JSON.stringify(payload);
    if (intento.current?.serialized !== serialized) intento.current = { serialized, requestId: crypto.randomUUID() };
    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, requestId: intento.current.requestId }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No pudimos registrar la solicitud.');
      if (!data.id || data.estado !== 'pendiente_confirmacion') throw new Error('No pudimos confirmar la recepción. Intentá nuevamente.');
      setPedido({ id: data.id, correo, metodoPago: form.metodoPago });
      setItems([]);
      setForm(inicial);
      intento.current = null;
    } catch (err) {
      setError(err.name === 'TimeoutError' || err instanceof TypeError || err instanceof SyntaxError
        ? 'No pudimos confirmar la recepción. Tu carrito sigue guardado; reintentá con los mismos datos para evitar duplicados.'
        : err.message);
    } finally { setEnviando(false); submitLock.current = false; }
  }

  function teclado(event) {
    if (event.key === 'Escape' && !enviando) onClose();
    if (event.key !== 'Tab') return;
    const controls = [...panelRef.current.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled):not([tabindex="-1"]), select:not(:disabled), textarea:not(:disabled)')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  if (!visible) return null;
  return (
    <div className="cart-backdrop" onClick={() => !enviando && onClose()} onKeyDown={teclado}>
      <aside className="cart-panel order-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={panelRef} onClick={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <h2 id="cart-title">Tu pedido</h2>
          <button type="button" ref={closeRef} onClick={onClose} disabled={enviando} aria-label="Cerrar carrito">×</button>
        </div>
        {pedido && !items.length ? (
          <div className="order-success" role="status">
            <h3>¡Recibimos tu solicitud!</h3>
            <p>Tu referencia es <strong>{pedido.id}</strong>.</p>
            <p>Te enviaremos la confirmación a <strong>{pedido.correo}</strong>. Revisá también el correo no deseado.</p>
            <p>Vamos a confirmar disponibilidad y el importe final. Después recibirás {pedido.metodoPago === 'transferencia' ? 'los datos bancarios para transferir.' : 'un link de Mercado Pago para pagar.'}</p>
            <p>Todavía no se realizó ningún cobro ni se reservó stock.</p>
            <button className="order-submit" onClick={onClose}>Seguir mirando</button>
          </div>
        ) : items.length ? (
          <>
            <section className="order-email-notice" aria-labelledby="order-email-title">
              <FaEnvelope className="order-email-icon" aria-hidden="true" />
              <div>
                <strong id="order-email-title">Importante: tu compra se coordina por correo</strong>
                <p>Enviá tu solicitud y revisá tu correo. Te confirmaremos disponibilidad y total, y te enviaremos <strong>los datos para transferir o el link de Mercado Pago</strong>, según tu elección.</p>
                <p className="order-email-reminder">El pago se realiza después de recibir nuestra respuesta por correo.</p>
              </div>
            </section>
            <div className="cart-items">
              {productos.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.imagenes?.[0] || item.imagen} alt={item.nombre} />
                  <div>
                    <h3>{item.nombre}</h3>
                    <p>{item.color}{item.talle ? ` · Talle ${item.talle}` : ''}</p>
                    <p className="product-price"><strong>{formatoPrecio(item.precio)}</strong> <small>por unidad</small></p>
                    {!productosPorId[item.productoId] && <p className="order-error">Volvé a agregar este producto desde el catálogo.</p>}
                    <label className="order-quantity">Cantidad
                      <select aria-label={`Cantidad de ${item.nombre} ${item.color} ${item.talle || ''}`} value={item.cantidad} disabled={enviando} onChange={(e) => setItems((prev) => prev.map((p) => p.id === item.id ? { ...p, cantidad: Number(e.target.value) } : p))}>
                        {Array.from({ length: 10 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
                      </select>
                    </label>
                    <button type="button" disabled={enviando} onClick={() => setItems((prev) => prev.filter((p) => p.id !== item.id))}>Quitar</button>
                  </div>
                </article>
              ))}
            </div>
            <div className="order-totals">
              <p><span>{pendiente ? 'Subtotal con precio informado' : 'Subtotal de productos'}</span><strong>{subtotal ? formatoPrecio(subtotal) : 'A confirmar'}</strong></p>
              <p>Precios en pesos uruguayos · {mediosPago[form.metodoPago]}</p>
              {pendiente && <p>Hay productos con precio a confirmar. Te enviaremos el importe final antes de pagar.</p>}
              <p className="order-amount"><span>Descuento por solicitar en la web (10%)</span><strong>−{formatoPrecio(descuentoWeb)}</strong></p>
              <p>¡Tenés un 10% de descuento en tus productos por enviar tu solicitud desde la página! No incluye el envío.</p>
              <p className="order-amount"><span>{form.entrega === 'envio' ? 'Envío a domicilio' : 'Retiro en Punta Carretas'}</span><strong>{envio ? formatoPrecio(envio) : 'Sin costo'}</strong></p>
              <p className="order-amount"><span>Total</span><strong>{pendiente ? 'A confirmar' : formatoPrecio(total)}</strong></p>
            </div>
            <form className="order-form" onSubmit={enviar}>
              <fieldset disabled={enviando}>
                <legend>Tus datos</legend>
                <label>Medio de pago<select name="metodoPago" value={form.metodoPago} onChange={cambiar}><option value="mercadopago">Mercado Pago</option><option value="transferencia">Transferencia bancaria</option></select></label>
                <label>Nombre y apellido<input autoComplete="name" name="nombre" value={form.nombre} onChange={cambiar} onBlur={() => setForm((prev) => ({ ...prev, nombre: normalizarNombre(prev.nombre) }))} maxLength={100} required /></label>
                <label>Correo electrónico<input type="email" autoComplete="email" name="correo" value={form.correo} onChange={cambiar} onBlur={() => setForm((prev) => ({ ...prev, correo: normalizarCorreo(prev.correo) }))} maxLength={254} required /></label>
                {sugerenciaCorreo && <p className="order-email-suggestion">¿Quisiste escribir <button type="button" onClick={() => { setForm((prev) => ({ ...prev, correo: sugerenciaCorreo })); setError(''); }}>{sugerenciaCorreo}</button>?</p>}
                <label>Teléfono<input type="tel" autoComplete="tel" name="telefono" value={form.telefono} onChange={cambiar} inputMode="numeric" pattern="09[0-9]{7}" minLength={9} maxLength={9} placeholder="Ej: 098789012" title="Ingresá un celular de Uruguay de 9 dígitos que empiece con 09, sin espacios ni guiones." required /></label>
                <label>Entrega<select name="entrega" value={form.entrega} onChange={cambiar}><option value="envio">Envío a domicilio</option><option value="retiro">Retiro en Punta Carretas</option></select></label>
                {form.entrega === 'envio' && <>
                  <label>Departamento<select name="departamento" autoComplete="address-level1" value={form.departamento} onChange={cambiar} required><option value="">Seleccioná un departamento</option>{departamentos.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}</select></label>
                  {form.departamento === 'Montevideo'
                    ? <label>Barrio<select name="barrio" value={form.barrio} onChange={cambiar} required><option value="">Seleccioná un barrio</option>{barriosMontevideo.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}</select></label>
                    : <label>Localidad o barrio<input name="barrio" autoComplete="address-level2" value={form.barrio} onChange={cambiar} maxLength={100} disabled={!form.departamento} required /></label>}
                  <label>Dirección · calle<input name="calle" autoComplete="address-line1" value={form.calle} onChange={cambiar} placeholder="Ej: Av. 18 de Julio" maxLength={150} required /></label>
                  <label>Número de puerta<input name="numero" inputMode="numeric" pattern="[0-9]{1,6}" value={form.numero} onChange={cambiar} placeholder="Ej: 1234" maxLength={6} required /></label>
                  <label>Apartamento o complemento (opcional)<input name="apartamento" autoComplete="address-line2" value={form.apartamento} onChange={cambiar} maxLength={80} /></label>
                </>}
                <label>Observaciones (opcional)<textarea name="notas" value={form.notas} onChange={cambiar} maxLength={1000} rows={3} /></label>
                <label className="order-honeypot" aria-hidden="true">Sitio web<input name="website" value={form.website} onChange={cambiar} autoComplete="off" tabIndex={-1} /></label>
                <p className="order-privacy">Usaremos estos datos para gestionar tu solicitud y coordinar el pago y la entrega.</p>
              </fieldset>
              {error && <p className="order-error" role="alert">{error}</p>}
              {disponible === false && <p className="order-unavailable">Estamos preparando los pedidos por correo. Por ahora podés <a href="https://wa.me/59899489924" target="_blank" rel="noreferrer">consultarnos por WhatsApp</a>.</p>}
              {invalido && <p className="order-error">Revisá el carrito y volvé a agregar los productos o talles que ya no están disponibles.</p>}
              <button className="order-submit" type="submit" disabled={enviando || !disponible || invalido}>{enviando ? 'Enviando solicitud…' : disponible === null ? 'Verificando disponibilidad…' : 'Enviar solicitud por correo'}</button>
              <p className="order-payment-note">Pago pendiente · Recibirás {form.metodoPago === 'transferencia' ? 'los datos bancarios' : 'el enlace de Mercado Pago'} por correo después de nuestra confirmación.</p>
            </form>
            <button className="clear-cart-button" disabled={enviando} onClick={() => setItems([])}>Vaciar carrito</button>
          </>
        ) : <p className="empty-cart">Todavía no agregaste productos.</p>}
      </aside>
    </div>
  );
}
