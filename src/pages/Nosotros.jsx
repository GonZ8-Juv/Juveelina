import { Link } from "react-router-dom";

function Nosotros() {
  return (
    <main className="info-page split-info-page">
      <section className="info-copy">
        <h1>Nosotros</h1>
        <p>
          Somos un proyecto familiar y una marca uruguaya con sede en Montevideo,
          Punta Carretas. Creamos productos de calidad que reflejan la cultura
          uruguaya y el estilo urbano. Nuestro proyecto está abierto a toda
          persona que quiera formar parte y se identifique con lo que hacemos.
        </p>
        <p>Sigamos creciendo juntos.</p>
      </section>

      <aside className="info-side-link">
        <Link to="/como-comprar">Cómo comprar</Link>
      </aside>
    </main>
  );
}

export default Nosotros;
