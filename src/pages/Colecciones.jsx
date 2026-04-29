import camis from "../assets/Camisceles.jpeg";
import buzo from "../assets/Buzoblan.jpeg";
import remera from "../assets/RGF.jpeg";

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