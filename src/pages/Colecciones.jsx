import camis from "../assets/Peques/Camisceles.webp";
import buzo from "../assets/Peques/buzo-blanco.jpeg.webp";
import remera from "../assets/Remeras/RGF.webp";

function Colecciones() {
  return (
    <div className="colecciones">

      <div className="coleccion-card">
        <img src={remera} />
        <span>Remeras</span>
      </div>

      <div className="coleccion-card">
        <img src={buzo} />
        <span>Buzos</span>
      </div>

      <div className="coleccion-card">
        <img src={camis} />
        <span>Sweaters</span>
      </div>

    </div>
  );
}

export default Colecciones;
