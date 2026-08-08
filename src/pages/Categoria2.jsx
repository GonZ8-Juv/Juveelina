/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaShareAlt, FaWhatsapp } from "react-icons/fa";

// REMERAS
import remeraGrisSolFrente from "../assets/Remeras/RGF.webp";
import remeraGrisSolEspalda from "../assets/Remeras/RGB.webp";
import remeraNegraSolFrente from "../assets/Remeras/RNF.webp";
import remeraNegraSolEspalda from "../assets/Remeras/RNB.webp";
import remeraBlancaSolFrente from "../assets/Remeras/RBF.webp";
import remeraBlancaSolEspalda from "../assets/Remeras/RBB.webp";
import remeraMarronSolFrente from "../assets/Remeras/RMF.webp";
import remeraMarronSolEspalda from "../assets/Remeras/RMB.webp";
import remeraGrisEscudoFrente from "../assets/Remeras/RGFE.webp";
import remeraGrisEscudoEspalda from "../assets/Remeras/RGBE.webp";
import remeraNegraEscudoFrente from "../assets/Remeras/RNFE.webp";
import remeraNegraEscudoEspalda from "../assets/Remeras/RNBE.webp";
import remeraBlancaEscudoFrente from "../assets/Remeras/RBFE.webp";
import remeraBlancaEscudoEspalda from "../assets/Remeras/RBBE.webp";
import remeraMarronEscudoFrente from "../assets/Remeras/RMFE.webp";
import remeraMarronEscudoEspalda from "../assets/Remeras/RMBE.webp";
import remeraSensacionBlancaFrente from "../assets/RemerasSensacionUy/remera-sensacion-blanca-frente.webp";
import remeraSensacionBlancaDetalle from "../assets/RemerasSensacionUy/remera-sensacion-blanca-detalle.webp";
import remeraSensacionNegraFrente from "../assets/RemerasSensacionUy/remera-sensacion-negra-frente.webp";
import remeraSensacionNegraEspalda from "../assets/RemerasSensacionUy/remera-sensacion-negra-espalda.webp";

// BUZOS UY
import buzoUyMedioSolFrente from "../assets/BuzosUy/buzo-medio-sol-frente.webp";
import buzoUyMedioSolEspalda from "../assets/BuzosUy/buzo-medio-sol-espalda.webp";

// CARDIGANS URUWHY
import cardiganBeigePrincipal from "../assets/CardigansUruWhy/cardigan-beige-principal.webp";
import cardiganBeigeDetalle from "../assets/CardigansUruWhy/cardigan-beige-detalle.webp";
import cardiganBeigeEspalda from "../assets/CardigansUruWhy/cardigan-beige-espalda.webp";
import cardiganGrisPrincipal from "../assets/CardigansUruWhy/cardigan-gris-principal.webp";
import cardiganGrisDetalle from "../assets/CardigansUruWhy/cardigan-gris-detalle.webp";
import cardiganGrisEspalda from "../assets/CardigansUruWhy/cardigan-gris-espalda.webp";
import cardiganRosaPrincipal from "../assets/CardigansUruWhy/cardigan-rosa-principal.webp";
import cardiganRosaFrente from "../assets/CardigansUruWhy/cardigan-rosa-frente.webp";
import cardiganRosaEspalda from "../assets/CardigansUruWhy/cardigan-rosa-espalda.webp";
import cardiganAzulPrincipal from "../assets/CardigansUruWhy/cardigan-azul-principal.webp";
import cardiganAzulEntero from "../assets/CardigansUruWhy/cardigan-azul-entero.webp";
import cardiganAzulEspalda from "../assets/CardigansUruWhy/cardigan-azul-espalda.webp";

// ACCESORIOS
import carteraPrint from "../assets/Carprint.webp";
import necesserSoyCeleste from "../assets/SoyCel.webp";
import bagSoles from "../assets/Bolsos/Soles2.webp";
import bagJuvee from "../assets/Bolsos/Juvee.webp";
import bagSol from "../assets/Bolsos/bolsosol.webp";
import bagSols from "../assets/Bolsos/sols.webp";
import bagPinkJuvee from "../assets/Bag PinkJuvee.webp";
import bagMixUy from "../assets/Bag Mix.Uy.webp";
import printUy from "../assets/Print.Uy.webp";
import printUyDetalle from "../assets/Print.Uy 2.webp";
import bagSolUy from "../assets/Bag Sol.uy.webp";
import bagSolUyDetalle from "../assets/Bag sol.uy2.webp";
import materasGrupo from "../assets/3 materas.webp";
import materaBeige from "../assets/Matera Juvee beige.webp";
import materaMarron from "../assets/Matera Juvee brown.webp";
import materaNegra from "../assets/Matera Juvee black.webp";

// HOMBRES
import hombreBlanco1 from "../assets/hombre/Blancosol.webp";
import hombreBlanco2 from "../assets/hombre/blancoesc.webp";
import hombreBlancoNuevo from "../assets/hombre/blancosoln.webp";
import hombreGris1 from "../assets/hombre/grissol.webp";
import hombreGris2 from "../assets/hombre/grisesc.webp";
import hombreMarron1 from "../assets/hombre/marronsol.webp";
import hombreMarron2 from "../assets/hombre/marronsolb.webp";
import hombreNegro1 from "../assets/hombre/negrosol.webp";
import hombreNegro2 from "../assets/hombre/NegroEsc.webp";
import hombreNegroRubio from "../assets/hombre/solamnegro.webp";
import hombreBlancoEspalda from "../assets/hombre/blancoespalda.webp";
import hombreMarronEspalda from "../assets/hombre/marronespalda.webp";
import hombreNegroEspalda from "../assets/hombre/negroespalda.webp";
import hombreBuzoUruUyFrente from "../assets/hombre/Buzouy.webp";
import hombreBuzoUruUyEspalda from "../assets/hombre/Buzouyesp.webp";
import hombreBuzoGoldenFrente from "../assets/hombre/Solyoru.webp";
import hombreBuzoGoldenEspalda from "../assets/hombre/solyoruesp.webp";
import hombreHorseFrente from "../assets/hombre/Horse.webp";
import hombreHorseEspalda from "../assets/hombre/Horse back.webp";

// PEQUES
import pequeBuzoBlanco from "../assets/Peques/buzo-blanco.jpeg.webp";
import pequeBuzoNegro from "../assets/Peques/buzo-negro.jpeg.webp";
import pequeCamisetaCeleste from "../assets/Peques/Camisceles.webp";
import pequeCamisetaNegra from "../assets/Peques/Camisnegr.webp";

// MUJERES
import mujerEscudoAzul from "../assets/mujer/escazul.webp";
import mujerEscudoGris from "../assets/mujer/escgris.webp";
import mujerEscudoBlanco from "../assets/mujer/escudoblanco.webp";
import mujerEspaldaGris from "../assets/mujer/espaldagris.webp";
import mujerEspaldaMarron from "../assets/mujer/espaldamarron.webp";
import mujerEspaldaNegro from "../assets/mujer/espaldanegro.webp";
import mujerEscudoMarron from "../assets/mujer/marronesc.webp";
import mujerSolGris2 from "../assets/mujer/solgris2.webp";
import mujerSolMarron from "../assets/mujer/solmarron.webp";
import mujerSolNegro from "../assets/mujer/solnegro2.webp";

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
      nombre: "Print.R.O.U",
      color: "Natural",
      material: "Yute y lona",
      imagenes: [carteraPrint],
    },
    {
      nombre: "Print.Uy",
      color: "Natural",
      material: "Lona",
      imagenes: [printUy, printUyDetalle],
      nuevo: true,
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
      nombre: "Bag Sol.uy",
      color: "Natural",
      material: "Lona",
      imagenes: [bagSolUy, bagSolUyDetalle],
      nuevo: true,
    },
    {
      nombre: "Bag Mix.Uy",
      color: "Natural",
      material: "Lona",
      imagenes: [bagMixUy],
      nuevo: true,
    },
    {
      nombre: "Bag PinkJuvee",
      color: "Rosa",
      material: "Lona",
      imagenes: [bagPinkJuvee],
      nuevo: true,
    },
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
  "Materas.Uy": [
    {
      nombre: "Matera Juvee brown",
      color: "Marrón",
      material: "Lona",
      imagenes: [materaMarron, materasGrupo],
      nuevo: true,
    },
    {
      nombre: "Matera Juvee beige",
      color: "Beige",
      material: "Lona",
      imagenes: [materaBeige, materasGrupo],
      nuevo: true,
    },
    {
      nombre: "Matera Juvee black",
      color: "Negro",
      material: "Lona",
      imagenes: [materaNegra, materasGrupo],
      nuevo: true,
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
    { nombre: "Materas.Uy", url: "/accesorios/materas-uy" },
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
  "Materas.Uy": "accesorios",
  Neceser: "accesorios",
};

const tallesDisponibles = ["S", "M", "L", "XL", "XXL"];

const getProductDescription = (producto, categoriaPredeterminada) => {
  const categoria = producto.categoria || categoriaPredeterminada;
  const material = producto.material?.toLowerCase() || "materiales seleccionados";

  if (categoria === "accesorios") {
    return `Accesorio de ${material}, pensado para sumar identidad uruguaya a todos los días.`;
  }

  if (producto.nombre.toLowerCase().includes("cardigan")) {
    return `Cardigan de ${material}, cómodo y versátil, con detalles inspirados en Uruguay.`;
  }

  if (producto.nombre.toLowerCase().includes("camiseta")) {
    return `Camiseta de ${material}, liviana y cómoda para acompañar todos los días.`;
  }

  if (producto.nombre.toLowerCase().includes("remera")) {
    return `Remera de ${material}, con diseño urbano y detalles de identidad uruguaya.`;
  }

  return `Buzo de ${material}, cómodo y con presencia urbana para vestir la cultura uruguaya.`;
};

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
  const [productoCargando, setProductoCargando] = useState(null);
  const [fotoActual, setFotoActual] = useState(0);
  const [imagenAmpliada, setImagenAmpliada] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState("M");
  const productOpenTimer = useRef(null);
  const modalContentRef = useRef(null);

  const usaTalles = categoriaPredeterminada !== "accesorios";
  const tallesProductoActivo = productoActivo?.talles || tallesDisponibles;
  const productShareText = productoActivo
    ? `Mirá este producto de Juveelina: ${productoActivo.nombre} ${productoActivo.color}`
    : "";
  const productShareUrl =
    typeof window !== "undefined" ? window.location.href : "https://juveelina.com";

  useEffect(() => {
    return () => {
      if (productOpenTimer.current) clearTimeout(productOpenTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!productoActivo) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      modalContentRef.current?.scrollTo({ top: 0, left: 0 });
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [productoActivo]);

  return (
    <>
      <div className={`category-products ${className}`.trim()}>
        {productos.map((producto, index) => (
          <div
            className="category-product"
            key={`${producto.nombre}-${producto.color}-${producto.imagenes[0]}-${index}`}
            style={{ "--product-index": index }}
            onClick={() => {
              if (productOpenTimer.current) clearTimeout(productOpenTimer.current);
              setProductoCargando(producto);
              setFotoActual(0);
              setImagenAmpliada(false);
              setTalleSeleccionado((producto.talles || tallesDisponibles)[0]);
              productOpenTimer.current = setTimeout(() => {
                setProductoActivo(producto);
                setProductoCargando(null);
              }, 430);
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

      {productoCargando && (
        <div className="product-loading-cloud" aria-label="Abriendo producto">
          <span className="page-loading-spinner" />
        </div>
      )}

      {productoActivo && (
        <div
          className="modal product-detail-modal"
          onClick={() => {
            setImagenAmpliada(false);
            setProductoActivo(null);
          }}
        >
          <div
            className="modal-content product-detail-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close product-detail-close"
              onClick={() => {
                setImagenAmpliada(false);
                setProductoActivo(null);
              }}
            >
              ×
            </button>

            <button
              type="button"
              className="product-detail-back"
              onClick={() => {
                setImagenAmpliada(false);
                setProductoActivo(null);
              }}
            >
              Volver al listado
            </button>

            <section className="product-detail-view">
              <div className="product-detail-gallery">
                <div className="modal-thumbs product-detail-thumbs">
                  {productoActivo.imagenes.map((img, index) => (
                    <button
                      type="button"
                      key={`${productoActivo.nombre}-${productoActivo.color}-${index}`}
                      onClick={() => {
                        setFotoActual(index);
                        setImagenAmpliada(false);
                      }}
                      className={fotoActual === index ? "active-thumb" : ""}
                      aria-label={`Ver foto ${index + 1}`}
                    >
                      <img src={img} alt={`${productoActivo.nombre} ${index + 1}`} />
                    </button>
                  ))}
                </div>

                <figure
                  className={`product-detail-main-image ${imagenAmpliada ? "zoomed" : ""}`}
                  onClick={() => setImagenAmpliada((actual) => !actual)}
                >
                  <img
                    key={`${productoActivo.nombre}-${productoActivo.color}-${fotoActual}`}
                    src={productoActivo.imagenes[fotoActual]}
                    alt={productoActivo.nombre}
                  />
                  <figcaption>
                    {imagenAmpliada ? "Tocar para volver" : "Tocar para ampliar"}
                  </figcaption>
                </figure>
              </div>

              <aside className="product-detail-panel">
                {productoActivo.nuevo && <span className="product-detail-new">NEW</span>}
                <p className="product-detail-kicker">
                  {productoActivo.categoria || categoriaPredeterminada}
                </p>
                <h2>{productoActivo.nombre}</h2>
                <p className="product-detail-ref">
                  REF: {productoActivo.nombre.slice(0, 3).toUpperCase()}
                  {productoActivo.color.slice(0, 3).toUpperCase()}
                </p>

                <div className="product-detail-meta">
                  <p>
                    <strong>Color</strong>
                    <span>{productoActivo.color}</span>
                  </p>
                  <p>
                    <strong>Material</strong>
                    <span>{productoActivo.material}</span>
                  </p>
                </div>

                {usaTalles && (
                  <div className="size-selector product-detail-sizes">
                    <span>Seleccionar talle</span>
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
                  className="add-cart-button product-detail-cart"
                  onClick={() => {
                    onAddToCart({
                      nombre: productoActivo.nombre,
                      color: productoActivo.color,
                      material: productoActivo.material,
                      talle: usaTalles ? talleSeleccionado : null,
                      categoria: productoActivo.categoria || categoriaPredeterminada,
                      imagen: productoActivo.imagenes[0],
                    });
                    setImagenAmpliada(false);
                    setProductoActivo(null);
                  }}
                >
                  Agregar al carrito
                </button>

                <div className="product-detail-description">
                  <h3>Descripción</h3>
                  <p>{getProductDescription(productoActivo, categoriaPredeterminada)}</p>
                </div>

                <div className="product-detail-share">
                  <span>Compartir</span>
                  <button
                    type="button"
                    aria-label="Compartir producto"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: productoActivo.nombre,
                          text: productShareText,
                          url: productShareUrl,
                        });
                      } else {
                        navigator.clipboard?.writeText(`${productShareText} ${productShareUrl}`);
                      }
                    }}
                  >
                    <FaShareAlt />
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${productShareText} ${productShareUrl}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Compartir por WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://www.instagram.com/juveelina/?hl=es"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ver Instagram de Juveelina"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </aside>
            </section>
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
            {["Cardigans UruWhy", "Materas.Uy"].includes(categoria.nombre) && (
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
