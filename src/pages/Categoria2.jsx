import { useState } from "react";

//REMERAS
import remera1 from "../assets/RGB.jpeg";
import remera2 from "../assets/RGF.jpeg";
import remera3 from "../assets/RNF.jpeg";
import remera4 from "../assets/RNB.jpeg";
import remera5 from "../assets/RBF.jpeg";
import remera6 from "../assets/RBB.jpeg";
import remera7 from "../assets/RMF.jpeg";
import remera8 from "../assets/RMB.jpeg";

//buzos
import buzo1 from "../assets/buzos/buzo-blanco.jpeg.jpeg";
import buzo2 from "../assets/buzos/buzo-gris.jpeg.jpeg";
import buzo3 from "../assets/buzos/buzo-negro.jpeg.jpeg";
import buzo4 from "../assets/buzos/buzo-negro2.jpeg.jpeg";

//CARTERAS

const productosPorCategoria = {
  Remeras: [
    {
      nombre: "Básica Sol",
      color: "Negro",
      material: "Algodón",
      imagenes: [remera3, remera4],
    },
    {
      nombre: "Básica Sol",
      color: "Blanco",
      material: "Algodón",
      imagenes: [remera5, remera6],
    },
    {
      nombre: "Básica Sol",
      color: "Gris",
      material: "Algodón",
      imagenes: [remera2, remera1],
    },
    {
      nombre: "Básica Sol",
      color: "Marrón",
      material: "Algodón",
      imagenes: [remera7, remera8],
    },
  ],

  Buzos: [
    {
      nombre: "Buzo oversize",
      color: "Negro",
      material: "Algodón frizado",
      imagenes: [buzo1, buzo2],
    },
    {
      nombre: "Buzo oversize",
      color: "Negro",
      material: "Algodón frizado",
      imagenes: [buzo3, buzo4],
    },
  ],

  Sweaters: [],
};

function Categoria({ titulo }) {
  const [productoActivo, setProductoActivo] = useState(null);
  const [fotoActual, setFotoActual] = useState(0);

  const productos = productosPorCategoria[titulo] || [];

  return (
    <main className="category-page">
      <h1>{titulo}</h1>

      <div className="category-layout">
  <aside className="category-sidebar">
    <h3>Categorías</h3>
    <a href="/colecciones/remeras">Remeras</a>
    <a href="/colecciones/buzos">Buzos</a>
    <a href="/colecciones/sweaters">Sweaters</a>
  </aside>

  <div className="category-products">

  {productos.map((producto, index) => (
          <div
            className="category-product"
            key={index}
            onClick={() => {
              setProductoActivo(producto);
              setFotoActual(0);
            }}
          >
            <img src={producto.imagenes[0]} />
            <p>{producto.nombre}</p>
            <span>{producto.color} · {producto.material}</span>
          </div>
        ))}

  </div>
        </div>
       
        
      

      {productoActivo && (
        <div className="modal" onClick={() => setProductoActivo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setProductoActivo(null)}>
              ×
            </button>

            <img src={productoActivo.imagenes[fotoActual]} />

            <h2>{productoActivo.nombre}</h2>
            <p>{productoActivo.color} · {productoActivo.material}</p>

            <div className="modal-thumbs">
              {productoActivo.imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setFotoActual(index)}
                  className={fotoActual === index ? "active-thumb" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Categoria;