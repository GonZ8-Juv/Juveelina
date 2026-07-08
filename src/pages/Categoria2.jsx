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
import remeraSensacionBlancaFrente from "../assets/RemerasSensacionUy/remera-sensacion-blanca-frente.png";
import remeraSensacionBlancaDetalle from "../assets/RemerasSensacionUy/remera-sensacion-blanca-detalle.png";
import remeraSensacionNegraFrente from "../assets/RemerasSensacionUy/remera-sensacion-negra-frente.jpg";
import remeraSensacionNegraEspalda from "../assets/RemerasSensacionUy/remera-sensacion-negra-espalda.jpg";

// BUZOS UY
import buzoUyMedioSolFrente from "../assets/BuzosUy/buzo-medio-sol-frente.png";
import buzoUyMedioSolEspalda from "../assets/BuzosUy/buzo-medio-sol-espalda.png";

// CARDIGANS URUWHY
import cardiganBeigePrincipal from "../assets/CardigansUruWhy/cardigan-beige-principal.jpg";
import cardiganBeigeDetalle from "../assets/CardigansUruWhy/cardigan-beige-detalle.jpg";
import cardiganBeigeEspalda from "../assets/CardigansUruWhy/cardigan-beige-espalda.jpg";
import cardiganGrisPrincipal from "../assets/CardigansUruWhy/cardigan-gris-principal.jpg";
import cardiganGrisDetalle from "../assets/CardigansUruWhy/cardigan-gris-detalle.jpg";
import cardiganGrisEspalda from "../assets/CardigansUruWhy/cardigan-gris-espalda.jpg";
import cardiganRosaPrincipal from "../assets/CardigansUruWhy/cardigan-rosa-principal.png";
import cardiganRosaFrente from "../assets/CardigansUruWhy/cardigan-rosa-frente.png";
import cardiganRosaEspalda from "../assets/CardigansUruWhy/cardigan-rosa-espalda.png";
import cardiganAzulPrincipal from "../assets/CardigansUruWhy/cardigan-azul-principal.png";
import cardiganAzulEntero from "../assets/CardigansUruWhy/cardigan-azul-entero.png";
import cardiganAzulEspalda from "../assets/CardigansUruWhy/cardigan-azul-espalda.png";

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
import hombreBuzoUruUyFrente from "../assets/hombre/Buzouy.jpeg";
import hombreBuzoUruUyEspalda from "../assets/hombre/Buzouyesp.jpeg";
import hombreBuzoGoldenFrente from "../assets/hombre/Solyoru.jpeg";
import hombreBuzoGoldenEspalda from "../assets/hombre/solyoruesp.jpeg";
import hombreHorseFrente from "../assets/hombre/Horse.png";
import hombreHorseEspalda from "../assets/hombre/Horse back.png";

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

export const productosPorCategoria = {
  Remeras: [
    {
      nombre: "Sensación Uy",
      color: "Blanco",
      material: "Algodón",
      imagenes: [remeraSensacionBlancaDetalle, remeraSensacionBlancaFrente],
      nuevo: true,
    },
    {
      nombre: "Sensación Uy",
      color: "Negro",
      material: "Algodón",
      imagenes: [remeraSensacionNegraFrente, remeraSensacionNegraEspalda],
      nuevo: true,
    },
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

  "Buzos Uy": [
    {
      nombre: "Buzo Uy medio sol",
      color: "Natural",
      material: "Algodón frizado",
      imagenes: [buzoUyMedioSolFrente, buzoUyMedioSolEspalda],
    },
  ],

  "Cardigans UruWhy": [
    {
      nombre: "Cardigan UruWhy",
      color: "Beige",
      material: "Tejido",
      imagenes: [cardiganBeigePrincipal, cardiganBeigeDetalle, cardiganBeigeEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
    {
      nombre: "Cardigan UruWhy",
      color: "Gris",
      material: "Tejido",
      imagenes: [cardiganGrisPrincipal, cardiganGrisDetalle, cardiganGrisEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
    {
      nombre: "Cardigan UruWhy",
      color: "Rosa",
      material: "Tejido",
      imagenes: [cardiganRosaPrincipal, cardiganRosaFrente, cardiganRosaEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
    {
      nombre: "Cardigan UruWhy",
      color: "Azul",
      material: "Tejido",
      imagenes: [cardiganAzulPrincipal, cardiganAzulEntero, cardiganAzulEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
  ],

  Sweaters: [
    {
      nombre: "Buzo Oriental uy",
      color: "Natural",
      material: "Algodón frizado",
      imagenes: [hombreBuzoUruUyFrente, hombreBuzoUruUyEspalda],
    },
    {
      nombre: "Buzo Golden.uy",
      color: "Natural",
      material: "Algodón frizado",
      imagenes: [hombreBuzoGoldenEspalda, hombreBuzoGoldenFrente],
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
      nombre: "Bag Juveelina",
      color: "Natural",
      material: "Lona",
      imagenes: [bagJuvee],
    },
    {
      nombre: "Bag Vilaró",
      color: "Natural",
      material: "Lona",
      imagenes: [bagSol, bagSoles],
    },
    {
      nombre: "Bag SolUY",
      color: "Natural",
      material: "Lona",
      imagenes: [bagSols],
    },
  ],
    Guríses: [
    {
      nombre: "Buzo Vilaró",
      color: "Blanco",
      material: "Algodón frizado",
      imagenes: [pequeBuzoBlanco],
    },
    {
      nombre: "Buzo Vilaró",
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
      nombre: "Buzo patriota",
      color: "Azul",
      material: "Algodón",
      imagenes: [mujerEscudoAzul],
    },
    {
      nombre: "Buzo patriota",
      color: "Gris",
      material: "Algodón",
      imagenes: [mujerEscudoGris, mujerEspaldaGris],
    },
    {
      nombre: "Buzo patriota",
      color: "Blanco",
      material: "Algodón",
      imagenes: [mujerEscudoBlanco],
    },
    {
      nombre: "Buzo patriota",
      color: "Marrón",
      material: "Algodón",
      imagenes: [mujerEscudoMarron, mujerEspaldaMarron],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Gris",
      material: "Algodón",
      imagenes: [mujerSolGris2],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Marrón",
      material: "Algodón",
      imagenes: [mujerSolMarron, mujerEspaldaMarron],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Negro",
      material: "Algodón",
      imagenes: [mujerSolNegro, mujerEspaldaNegro],
    },
    {
      nombre: "Cardigan UruWhy",
      color: "Beige",
      material: "Tejido",
      imagenes: [cardiganBeigePrincipal, cardiganBeigeDetalle, cardiganBeigeEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
    {
      nombre: "Cardigan UruWhy",
      color: "Gris",
      material: "Tejido",
      imagenes: [cardiganGrisPrincipal, cardiganGrisDetalle, cardiganGrisEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
    {
      nombre: "Cardigan UruWhy",
      color: "Rosa",
      material: "Tejido",
      imagenes: [cardiganRosaPrincipal, cardiganRosaFrente, cardiganRosaEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
    {
      nombre: "Cardigan UruWhy",
      color: "Azul",
      material: "Tejido",
      imagenes: [cardiganAzulPrincipal, cardiganAzulEntero, cardiganAzulEspalda],
      nuevo: true,
      talles: ["S/M", "L/XL"],
    },
    {
      nombre: "Sensación Uy",
      color: "Blanco",
      material: "Algodón",
      imagenes: [remeraSensacionBlancaFrente, remeraSensacionBlancaDetalle],
      nuevo: true,
    },
    {
      nombre: "Sensación Uy",
      color: "Negro",
      material: "Algodón",
      imagenes: [remeraSensacionNegraFrente, remeraSensacionNegraEspalda],
      nuevo: true,
    },
  ],
  Hombres: [
    {
      nombre: "Buzo Horse",
      color: "Natural",
      material: "Algodón frizado",
      imagenes: [hombreHorseFrente, hombreHorseEspalda],
      nuevo: true,
    },
    {
      nombre: "Buzo Vilaró",
      color: "Blanco",
      material: "Algodón",
      imagenes: [hombreBlanco1],
    },
    {
      nombre: "Buzo patriota",
      color: "Blanco",
      material: "Algodón",
      imagenes: [hombreBlanco2],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Blanco",
      material: "Algodón",
      imagenes: [hombreBlancoNuevo, hombreBlancoEspalda],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Gris",
      material: "Algodón",
      imagenes: [hombreGris1],
    },
    {
      nombre: "Buzo patriota",
      color: "Gris",
      material: "Algodón",
      imagenes: [hombreGris2],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Marrón",
      material: "Algodón",
      imagenes: [hombreMarron1, hombreMarronEspalda],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Marrón",
      material: "Algodón",
      imagenes: [hombreMarron2],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Negro",
      material: "Algodón",
      imagenes: [hombreNegro1],
    },
    {
      nombre: "Buzo patriota",
      color: "Negro",
      material: "Algodón",
      imagenes: [hombreNegro2],
    },
    {
      nombre: "Buzo Vilaró",
      color: "Negro",
      material: "Algodón",
      imagenes: [hombreNegroRubio, hombreNegroEspalda],
    },
    {
      nombre: "Buzo Oriental uy",
      color: "Natural",
      material: "Algodón frizado",
      imagenes: [hombreBuzoUruUyFrente, hombreBuzoUruUyEspalda],
    },
  ],
};

const categoriasPorSeccion = {
  colecciones: [
    { nombre: "Remeras", url: "/colecciones/remeras" },
    { nombre: "Buzos Uy", url: "/colecciones/buzos-uy" },
    { nombre: "Cardigans UruWhy", url: "/colecciones/cardigans-uruwhy" },
    { nombre: "Sweaters", url: "/colecciones/sweaters" },
  ],
  vestimenta: [
      { nombre: "Guríses", url: "/vestimenta/gurises" },
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
  "Buzos Uy": "colecciones",
  "Cardigans UruWhy": "colecciones",
  Sweaters: "colecciones",
    Guríses: "vestimenta",
  Mujeres: "vestimenta",
  Hombres: "vestimenta",
  Carteras: "accesorios",
  Bags: "accesorios",
  Neceser: "accesorios",
};

const tallesDisponibles = ["S", "M", "L", "XL", "XXL"];

const categoriasDeRopa = [
  "Cardigans UruWhy",
  "Remeras",
  "Buzos Uy",
  "Sweaters",
  "Guríses",
  "Mujeres",
  "Hombres",
];

const categoriaPorProductoVisto = new Map();

export const productosTienda = categoriasDeRopa
  .flatMap((categoria) =>
    (productosPorCategoria[categoria] || []).map((producto) => ({
      ...producto,
      categoria,
    }))
  )
  .filter((producto) => {
    const identidad = `${producto.nombre}-${producto.color}`;
    const categoriaVista = categoriaPorProductoVisto.get(identidad);

    if (categoriaVista && categoriaVista !== producto.categoria) return false;
    if (!categoriaVista) categoriaPorProductoVisto.set(identidad, producto.categoria);
    return true;
  })
  .sort((a, b) => Number(Boolean(b.nuevo)) - Number(Boolean(a.nuevo)));

export function ProductGallery({
  productos,
  onAddToCart,
  categoriaPredeterminada,
  className = "",
}) {
  const [productoActivo, setProductoActivo] = useState(null);
  const [fotoActual, setFotoActual] = useState(0);
  const [talleSeleccionado, setTalleSeleccionado] = useState("M");

  const usaTalles = categoriaPredeterminada !== "accesorios";
  const tallesProductoActivo = productoActivo?.talles || tallesDisponibles;

  return (
    <>
      <div className={`category-products ${className}`.trim()}>
        {productos.map((producto, index) => (
          <div
            className="category-product"
            key={`${producto.nombre}-${producto.color}-${producto.imagenes[0]}-${index}`}
            onClick={() => {
              setProductoActivo(producto);
              setFotoActual(0);
              setTalleSeleccionado((producto.talles || tallesDisponibles)[0]);
            }}
          >
            {producto.nuevo && <span className="product-new-badge">NEW</span>}
            <img src={producto.imagenes[0]} alt={producto.nombre} />
            <p>{producto.nombre}</p>
            <span>
              {producto.color} · {producto.material}
            </span>
          </div>
        ))}
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
                  {tallesProductoActivo.map((talle) => (
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
                  categoria: productoActivo.categoria || categoriaPredeterminada,
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
    </>
  );
}

function Categoria({ titulo, onAddToCart }) {
  const productos = productosPorCategoria[titulo] || [];
  const seccionActiva = seccionPorCategoria[titulo] || "colecciones";
  const categorias = categoriasPorSeccion[seccionActiva];

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
            <span>{categoria.nombre}</span>
            {categoria.nombre === "Cardigans UruWhy" && (
              <span className="category-new-badge">NEW</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="category-layout">
        <ProductGallery
          productos={productos}
          onAddToCart={onAddToCart}
          categoriaPredeterminada={seccionActiva === "accesorios" ? "accesorios" : titulo}
        />
      </div>
    </main>
  );
}

export default Categoria;
