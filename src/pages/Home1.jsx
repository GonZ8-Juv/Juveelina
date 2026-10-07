import { imagenPequena, fuentesImagen } from "../data/imagenes-responsive.js";
import { Link } from "react-router-dom";
import cardiganGris from "../assets/CardigansUruWhy/cardigan-gris-principal.webp";
import buzo from "../assets/Carprint.webp";
import camperaJean from "../assets/Camp jean/file_00000000cfcc820e81728114c2d3bb03.webp";
import { ProductGallery, productosTienda } from "./Categoria2.jsx";
import { productosPorCategoria } from "../data/catalogo.js";

const accesorios = ["Carteras", "TOTES", "Materas criollas"]
  .flatMap((categoria) => productosPorCategoria[categoria] || []);

function Home({ onAddToCart }) {
  return (
    <>
      <section className="home-featured" aria-label="Explorar colecciones">
        <Link className="featured-card" to="/colecciones/cardigans-uruwhy">
          <img src={imagenPequena(cardiganGris)} srcSet={fuentesImagen(cardiganGris)} sizes="33vw" loading="lazy" decoding="async" alt="Cardigan UruWhy gris" />
          <div className="featured-card-caption"><h2>Cardigans UruWhy</h2><span>Ver colección</span></div>
        </Link>
        <Link className="featured-card" to="/accesorios/carteras">
          <img src={imagenPequena(buzo)} srcSet={fuentesImagen(buzo)} sizes="33vw" loading="lazy" decoding="async" alt="Carteras Juveelina" />
          <div className="featured-card-caption"><h2>Carteras</h2><span>Ver colección</span></div>
        </Link>
        <Link className="featured-card" to="/colecciones/campera-jean">
          <img src={imagenPequena(camperaJean)} srcSet={fuentesImagen(camperaJean)} sizes="33vw" loading="lazy" decoding="async" alt="Campera de jean clara" />
          <div className="featured-card-caption"><h2>Camperas de jean</h2><span>Ver colección</span></div>
        </Link>
      </section>

      <section id="prendas" className="home-store" aria-labelledby="home-store-title">
        <h2 id="home-store-title">NO TE QUEDES CON LA MANIJA, VESTILA!</h2>
        <ProductGallery
          productos={productosTienda}
          productosVisibles={productosTienda.filter((producto) => producto.mostrarInicio !== false)}
          onAddToCart={onAddToCart}
          categoriaPredeterminada="Ropa"
          className="home-products-grid"
        />
      </section>
      <section className="home-store" aria-labelledby="home-accessories-title">
        <h2 id="home-accessories-title">ACCESORIOS</h2>
        <ProductGallery
          productos={accesorios}
          onAddToCart={onAddToCart}
          categoriaPredeterminada="accesorios"
          className="home-products-grid"
        />
      </section>
    </>
  );
}

export default Home;
