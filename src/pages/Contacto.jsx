import { useState } from "react";

const contactoInicial = {
  nombre: "",
  apellido: "",
  correo: "",
  mensaje: "",
};

function Contacto() {
  const [formulario, setFormulario] = useState(contactoInicial);

  const actualizarCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const enviarConsulta = (event) => {
    event.preventDefault();

    const asunto = encodeURIComponent("Consulta desde Juveelina");
    const cuerpo = encodeURIComponent(
      `Nombre: ${formulario.nombre}\n` +
        `Apellido: ${formulario.apellido}\n` +
        `Correo: ${formulario.correo}\n\n` +
        `Mensaje:\n${formulario.mensaje}`
    );

    window.location.href = `mailto:juveelinauy2@gmail.com?subject=${asunto}&body=${cuerpo}`;
  };

  return (
    <main className="info-page contact-page">
      <section className="contact-content">
        <div>
          <h1>Contacto</h1>

          <form className="contact-form" onSubmit={enviarConsulta}>
            <label>
              <span>Nombre</span>
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={actualizarCampo}
                required
              />
            </label>

            <label>
              <span>Apellido</span>
              <input
                type="text"
                name="apellido"
                value={formulario.apellido}
                onChange={actualizarCampo}
                required
              />
            </label>

            <label>
              <span>Correo electrónico</span>
              <input
                type="email"
                name="correo"
                value={formulario.correo}
                onChange={actualizarCampo}
                required
              />
            </label>

            <label>
              <span>Mensaje</span>
              <textarea
                name="mensaje"
                value={formulario.mensaje}
                onChange={actualizarCampo}
                rows="8"
                required
              />
            </label>

            <button type="submit">Enviar</button>
          </form>
        </div>

        <aside className="contact-details">
          <h2>Juveelina</h2>
          <p>Montevideo, Punta Carretas</p>
          <p>Uruguay</p>
          <a href="mailto:juveelinauy2@gmail.com">juveelinauy2@gmail.com</a>
          <p>Lunes a viernes</p>
        </aside>
      </section>
    </main>
  );
}

export default Contacto;
