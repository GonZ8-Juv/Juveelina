function ComoComprar() {
  return (
    <main className="info-page buy-page">
      <section className="info-copy">
        <h1>Cómo comprar</h1>
        <p>
          Elegí tus prendas, talles y cantidades y agregalos al carrito. Los
          precios publicados están en pesos uruguayos; donde dice “Consultar
          precio”, te confirmaremos el importe antes de pagar.
        </p>
        <ol>
          <li>Completá tus datos en el carrito y elegí envío o retiro y el medio de pago: transferencia bancaria o Mercado Pago. El subtotal se calcula según tu elección.</li>
          <li>Enviá tu solicitud. Recibirás por correo el resumen de tu pedido.</li>
          <li>Confirmaremos disponibilidad y el importe final, incluido el envío si corresponde.</li>
          <li>Te enviaremos por correo los datos bancarios o un enlace de Mercado Pago, según el medio que hayas elegido.</li>
          <li>Una vez verificado el pago, coordinaremos la entrega.</li>
        </ol>
        <p>La solicitud no implica un cobro ni una reserva de stock. No envíes datos de tu tarjeta por correo: si elegís Mercado Pago, pagarás desde su enlace seguro.</p>
        <p>Si el formulario todavía no está disponible o preferís atención personal, podés contactarnos por WhatsApp.</p>
        <a
          className="whatsapp-order-link"
          href="https://wa.me/59899489924"
          target="_blank"
          rel="noreferrer"
        >
          Consultar por WhatsApp
        </a>
      </section>
    </main>
  );
}

export default ComoComprar;
