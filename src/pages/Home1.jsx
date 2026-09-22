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
      <section className="home-featured">
        <div className="featured-card">
          <img src={cardiganGris} alt="Cardigan UruWhy gris" />
        </div>

        <div className="featured-card">
          <img src={buzo} alt="Accesorios Juveelina" />
        </div>

        <div className="featured-card">
          <img src={camperaJean} alt="Campera de jean clara" />
        </div>
      </section>

      <section id="prendas" className="home-store" aria-labelledby="home-store-title">
        <h2 id="home-store-title">NO TE QUEDES CON LA MANIJA, VESTILA!</h2>
        <ProductGallery
          productos={productosTienda}
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
