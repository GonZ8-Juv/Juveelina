import camis from "../assets/Peques/Camisceles.jpeg";
import buzo from "../assets/Carprint.jpeg";
import remera from "../assets/Peques/buzo-blanco.jpeg.jpeg";

function Home() {
  return (
    <section className="home-featured">
      <div className="featured-card">
        <img src={camis} />
      </div>

      <div className="featured-card">
        <img src={buzo} />
      </div>

      <div className="featured-card">
        <img src={remera} />
      </div>
    </section>
  );
}

export default Home;
