import { useState } from "react";
import { Link } from "react-router-dom";

// REMERAS
import remeraGrisSolFrente from "../assets/Remeras/RGF.jpeg";
import remeraGrisSolEspalda from "../assets/Remeras/RGB.jpeg";
import remeraNegraSolFrente from "../assets/Remeras/RNF.jpeg";
import remeraNegraSolEspalda from "../assets/Remeras/RNB.jpeg";
import remeraBlancaSolFrente from "../assets/Remeras/RBF.jpeg";
import remeraBlancaSolEspalda from "../assets/Remeras/RBB.jpeg";
import remeraMarronSolFrente from "../assets/Remeras/RMF.jpeg";
import remeraMarronSolEspalda from "../assets/Remeras/RMB.jpeg";
import remeraGrisEscudoFrente from "../assets/Remeras/RGFE.JPG";
import remeraGrisEscudoEspalda from "../assets/Remeras/RGBE.jpg";
import remeraNegraEscudoFrente from "../assets/Remeras/RNFE.jpg";
import remeraNegraEscudoEspalda from "../assets/Remeras/RNBE.jpg";
import remeraBlancaEscudoFrente from "../assets/Remeras/RBFE.jpg";
import remeraBlancaEscudoEspalda from "../assets/Remeras/RBBE.jpg";
import remeraMarronEscudoFrente from "../assets/Remeras/RMFE.jpg";
import remeraMarronEscudoEspalda from "../assets/Remeras/RMBE.jpg";

// SWEATERS
import sweater1 from "../assets/buzo-blanco.jpeg.jpeg";
import sweater3 from "../assets/buzo-negro.jpeg.jpeg";

// ACCESORIOS
import carteraPrint from "../assets/Carprint.jpeg";
import necesserSoyCeleste from "../assets/SoyCel.jpeg";
import bagSoles from "../assets/Bolsos/Soles2.jpg";
import bagJuvee from "../assets/Bolsos/Juvee.jpg";
import bagSol from "../assets/Bolsos/bolsosol.jpg";
import bagSols from "../assets/Bolsos/sols.jpg";

// HOMBRES
import hombreBlanco1 from "../assets/hombre/Blancosol.jpg";
import hombreBlanco2 from "../assets/hombre/blancoesc.jpg";
import hombreBlancoNuevo from "../assets/hombre/blancosoln.jpg";
import hombreGris1 from "../assets/hombre/grissol.jpg";
import hombreGris2 from "../assets/hombre/grisesc.jpg";
import hombreMarron1 from "../assets/hombre/marronsol.jpg";
import hombreMarron2 from "../assets/hombre/marronsolb.jpg";
import hombreNegro1 from "../assets/hombre/negrosol.jpg";
import hombreNegro2 from "../assets/hombre/NegroEsc.jpeg";
import hombreNegroRubio from "../assets/hombre/solamnegro.jpg";
import hombreBlancoEspalda from "../assets/hombre/blancoespalda.jpg";
import hombreMarronEspalda from "../assets/hombre/marronespalda.jpg";
import hombreNegroEspalda from "../assets/hombre/negroespalda.jpg";

// PEQUES
import pequeBuzoBlanco from "../assets/Peques/buzo-blanco.jpeg.jpeg";
import pequeBuzoNegro from "../assets/Peques/buzo-negro.jpeg.jpeg";
import pequeCamisetaCeleste from "../assets/Peques/Camisceles.jpeg";
import pequeCamisetaNegra from "../assets/Peques/Camisnegr.jpeg";

// MUJERES
import mujerEscudoAzul from "../assets/mujer/escazul.jpg";
import mujerEscudoGris from "../assets/mujer/escgris.jpg";
import mujerEscudoBlanco from "../assets/mujer/escudoblanco.jpg";
import mujerEspaldaGris from "../assets/mujer/espaldagris.jpg";
import mujerEspaldaMarron from "../assets/mujer/espaldamarron.jpg";
import mujerEspaldaNegro from "../assets/mujer/espaldanegro.jpg";
import mujerEscudoMarron from "../assets/mujer/marronesc.jpg";
import mujerSolGris2 from "../assets/mujer/solgris2.jpg";
import mujerSolMarron from "../assets/mujer/solmarron.jpg";
import mujerSolNegro from "../assets/mujer/solnegro2.jpg";

const productosPorCategoria = {
  Remeras: [
    {
      nombre: "Básica Sol",
      color: "Negro",
      material: "Algodón",
      imagenes: [remeraNegraSolFrente, remeraNegraSolEspalda],
    },
    {
      nombre: "Básica Sol",
      color: "Blanco",
      material: "Algodón",
      imagenes: [remeraBlancaSolFrente, remeraBlancaSolEspalda],
    },
    {
      nombre: "Básica Sol",
      color: "Gris",
      material: "Algodón",
      imagenes: [remeraGrisSolFrente, remeraGrisSolEspalda],
    },
    {
      nombre: "Básica Sol",
      color: "Marrón",
      material: "Algodón",
      imagenes: [remeraMarronSolFrente, remeraMarronSolEspalda],
    },
    {
      nombre: "Básica Escudo",
      color: "Negro",
      material: "Algodón",
      imagenes: [remeraNegraEscudoFrente, remeraNegraEscudoEspalda],
    },
    {
      nombre: "Básica Escudo",
      color: "Blanco",
      material: "Algodón",
      imagenes: [remeraBlancaEscudoFrente, remeraBlancaEscudoEspalda],
    },
    {
      nombre: "Básica Escudo",
      color: "Gris",
      material: "Algodón",
      imagenes: [remeraGrisEscudoFrente, remeraGrisEscudoEspalda],
    },
    {
      nombre: "Básica Escudo",
      color: "Marrón",
      material: "Algodón",
      imagenes: [remeraMarronEscudoFrente, remeraMarronEscudoEspalda],
    },
  ],

  Sweaters: [
    {
      nombre: "Sweater oversize",
      color: "Blanco",
      material: "Algodón frizado",
      imagenes: [sweater1],
    },
    {
      nombre: "Sweater oversize",
      color: "Negro",
      material: "Algodón frizado",
      imagenes: [sweater3],
    },
  ],

  Carteras: [
    {
      nombre: "Cartera print",
      color: "Natural",
      material: "Yute y lona",
      imagenes: [carteraPrint],
    },
  ],

  Neceser: [
    {
      nombre: "Neceser Soy Celeste",
      color: "Natural",
      material: "Lona y yute",
      imagenes: [necesserSoyCeleste],
    },
  ],

  Bags: [
    {
      nombre: "Bag Soles",
      color: "Natural",
      material: "Lona",
      imagenes: [bagSoles],
    },
    {
      nombre: "Bag Juveelina",
      color: "Natural",
      material: "Lona",
      imagenes: [bagJuvee],
    },
    {
      nombre: "Bag Sol",
      color: "Natural",
      material: "Lona",
      imagenes: [bagSol],
    },
    {
      nombre: "Bag Sols",
      color: "Natural",
      material: "Lona",
      imagenes: [bagSols],
    },
  ],
  Peques: [
    {
      nombre: "Buzo Sol",
      color: "Blanco",
      material: "Algodón frizado",
      imagenes: [pequeBuzoBlanco],
    },
    {
      nombre: "Buzo Sol",
      color: "Negro",
      material: "Algodón frizado",
      imagenes: [pequeBuzoNegro],
    },
    {
      nombre: "Camiseta Escudo",
      color: "Celeste",
      material: "Algodón",
      imagenes: [pequeCamisetaCeleste],
    },
    {
      nombre: "Camiseta Escudo",
      color: "Negro",
      material: "Algodón",
      imagenes: [pequeCamisetaNegra],
    },
  ],
  Mujeres: [
    {
      nombre: "Buzo Escudo",
      color: "Azul",
      material: "Algodón",
      imagenes: [mujerEscudoAzul],
    },
    {
      nombre: "Buzo Escudo",
      color: "Gris",
      material: "Algodón",
      imagenes: [mujerEscudoGris, mujerEspaldaGris],
    },
    {
      nombre: "Buzo Escudo",
      color: "Blanco",
      material: "Algodón",
      imagenes: [mujerEscudoBlanco],
    },
    {
      nombre: "Buzo Escudo",
      color: "Marrón",
      material: "Algodón",
      imagenes: [mujerEscudoMarron, mujerEspaldaMarron],
    },
    {
      nombre: "Buzo Sol",
      color: "Gris",
      material: "Algodón",
      imagenes: [mujerSolGris2],
    },
    {
      nombre: "Buzo Sol",
      color: "Marrón",
      material: "Algodón",
      imagenes: [mujerSolMarron, mujerEspaldaMarron],
    },
    {
      nombre: "Buzo Sol",
      color: "Negro",
      material: "Algodón",
      imagenes: [mujerSolNegro, mujerEspaldaNegro],
    },
  ],
  Hombres: [
    {
      nombre: "Buzo Sol",
      color: "Blanco",
      material: "Algodón",
      imagenes: [hombreBlanco1],
    },
    {
      nombre: "Buzo Escudo",
      color: "Blanco",
      material: "Algodón",
      imagenes: [hombreBlanco2],
    },
    {
      nombre: "Buzo Sol",
      color: "Blanco",
      material: "Algodón",
      imagenes: [hombreBlancoNuevo, hombreBlancoEspalda],
    },
    {
      nombre: "Buzo Sol",
      color: "Gris",
      material: "Algodón",
      imagenes: [hombreGris1],
    },
    {
      nombre: "Buzo Escudo",
      color: "Gris",
      material: "Algodón",
      imagenes: [hombreGris2],
    },
    {
      nombre: "Buzo Sol",
      color: "Marrón",
      material: "Algodón",
      imagenes: [hombreMarron1, hombreMarronEspalda],
    },
    {
      nombre: "Buzo Sol",
      color: "Marrón",
      material: "Algodón",
      imagenes: [hombreMarron2],
    },
    {
      nombre: "Buzo Sol",
      color: "Negro",
      material: "Algodón",
      imagenes: [hombreNegro1],
    },
    {
      nombre: "Buzo Escudo",
      color: "Negro",
      material: "Algodón",
      imagenes: [hombreNegro2],
    },
    {
      nombre: "Buzo Sol",
      color: "Negro",
      material: "Algodón",
      imagenes: [hombreNegroRubio, hombreNegroEspalda],
    },
  ],
};

const categoriasPorSeccion = {
  colecciones: [
    { nombre: "Remeras", url: "/colecciones/remeras" },
    { nombre: "Sweaters", url: "/colecciones/sweaters" },
  ],
  vestimenta: [
    { nombre: "Peques", url: "/vestimenta/peques" },
    { nombre: "Mujeres", url: "/vestimenta/mujeres" },
    { nombre: "Hombres", url: "/vestimenta/hombres" },
  ],
  accesorios: [
    { nombre: "Carteras", url: "/accesorios/carteras" },
    { nombre: "Bags", url: "/accesorios/bags" },
    { nombre: "Neceser", url: "/accesorios/neceser" },
  ],
};

const seccionPorCategoria = {
  Remeras: "colecciones",
  Sweaters: "colecciones",
  Peques: "vestimenta",
  Mujeres: "vestimenta",
  Hombres: "vestimenta",
  Carteras: "accesorios",
  Bags: "accesorios",
  Neceser: "accesorios",
};

const tallesDisponibles = ["S", "M", "L", "XL", "XXL"];

function Categoria({ titulo, onAddToCart }) {
  const [productoActivo, setProductoActivo] = useState(null);
  const [fotoActual, setFotoActual] = useState(0);
  const [talleSeleccionado, setTalleSeleccionado] = useState("M");

  const productos = productosPorCategoria[titulo] || [];
  const seccionActiva = seccionPorCategoria[titulo] || "colecciones";
  const categorias = categoriasPorSeccion[seccionActiva];
  const usaTalles = seccionActiva !== "accesorios";

  return (
    <main className={`category-page product-count-${productos.length}`}>
      <h1>{titulo}</h1>

      <nav className="category-tabs" aria-label="Categorías">
        {categorias.map((categoria) => (
          <Link
            to={categoria.url}
            key={categoria.url}
            className={categoria.nombre === titulo ? "active-category" : ""}
          >
            {categoria.nombre}
          </Link>
        ))}
      </nav>

      <div className="category-layout">
        <div className="category-products">
          {productos.map((producto, index) => (
            <div
              className="category-product"
              key={`${producto.nombre}-${producto.color}-${index}`}
              onClick={() => {
                setProductoActivo(producto);
                setFotoActual(0);
                setTalleSeleccionado("M");
              }}
            >
              <img src={producto.imagenes[0]} alt={producto.nombre} />
              <p>{producto.nombre}</p>
              <span>
                {producto.color} · {producto.material}
              </span>
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

            <img
              src={productoActivo.imagenes[fotoActual]}
              alt={productoActivo.nombre}
            />

            <h2>{productoActivo.nombre}</h2>
            <p>
              {productoActivo.color} · {productoActivo.material}
            </p>

            {usaTalles && (
              <div className="size-selector">
                <span>Talle</span>
                <div>
                  {tallesDisponibles.map((talle) => (
                    <button
                      type="button"
                      key={talle}
                      className={talleSeleccionado === talle ? "active-size" : ""}
                      onClick={() => setTalleSeleccionado(talle)}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="add-cart-button"
              onClick={() => {
                onAddToCart({
                  nombre: productoActivo.nombre,
                  color: productoActivo.color,
                  material: productoActivo.material,
                  talle: usaTalles ? talleSeleccionado : null,
                  categoria: titulo,
                  imagen: productoActivo.imagenes[0],
                });
                setProductoActivo(null);
              }}
            >
              Agregar al carrito
            </button>

            <div className="modal-thumbs">
              {productoActivo.imagenes.map((img, index) => (
                <img
                  key={`${productoActivo.nombre}-${productoActivo.color}-${index}`}
                  src={img}
                  alt={`${productoActivo.nombre} ${index + 1}`}
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
