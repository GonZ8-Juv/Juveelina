import camis from "../assets/Peques/Camisceles.webp";
import buzo from "../assets/Carprint.webp";
import remera from "../assets/Peques/buzo-blanco.jpeg.webp";
import { ProductGallery, productosTienda } from "./Categoria2.jsx";

function Home({ onAddToCart }) {
  return (
    <>
      <section className="home-featured">
        <div className="featured-card">
          <img src={camis} alt="Colección infantil Juveelina" />
        </div>

        <div className="featured-card">
          <img src={buzo} alt="Accesorios Juveelina" />
        </div>

        <div className="featured-card">
          <img src={remera} alt="Ropa Juveelina" />
        </div>
      </section>

      <section className="home-store" aria-labelledby="home-store-title">
        <h2 id="home-store-title">NO TE QUEDES CON LA MANIJA, VESTILA!</h2>
        <ProductGallery
          productos={productosTienda}
          onAddToCart={onAddToCart}
          categoriaPredeterminada="Ropa"
          className="home-products-grid"
        />
      </section>
    </>
  );
}

export default Home;
