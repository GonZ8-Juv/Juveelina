/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { enlaceProducto } from "../data/enlaces.js";
import { DESCUENTO } from "../data/importes.js";
import { FaInstagram, FaShareAlt, FaWhatsapp } from "react-icons/fa";

import { productosPorCategoria } from "../data/catalogo.js";
import Precios from "../components/Precios.jsx";
export { productosPorCategoria } from "../data/catalogo.js";

const categoriasPorSeccion = {
  colecciones: [
    { nombre: "Campera-Jean", url: "/colecciones/campera-jean" },
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
    { nombre: "TOTES", url: "/accesorios/bags" },
    { nombre: "Materas criollas", url: "/accesorios/materas-criollas" },
  ],
};

const seccionPorCategoria = {
  "Campera-Jean": "colecciones",
  Remeras: "colecciones",
  "Buzos Uy": "colecciones",
  "Cardigans UruWhy": "colecciones",
  Sweaters: "colecciones",
    Guríses: "vestimenta",
  Mujeres: "vestimenta",
  Hombres: "vestimenta",
  Carteras: "accesorios",
  TOTES: "accesorios",
  "Materas criollas": "accesorios",
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

  if (producto.nombre.toLowerCase().includes("campera")) {
    return `Campera de ${material}, con detalles que le dan identidad a tu look de todos los días.`;
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
  "Campera-Jean",
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
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productoActivo = productos.find((producto) => producto.id === searchParams.get('producto')) || null;
  const setProductoActivo = (producto) => {
    const siguiente = new URLSearchParams(searchParams);
    if (producto) siguiente.set('producto', producto.id);
    else siguiente.delete('producto');
    navigate({ pathname: location.pathname, search: siguiente.toString(), hash: location.hash }, { replace: !producto });
  };
  const [fotoActual, setFotoActual] = useState(0);
  const [imagenAmpliada, setImagenAmpliada] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(() => productoActivo?.talles?.[0] || "M");
  const modalContentRef = useRef(null);

  const usaTalles = categoriaPredeterminada !== "accesorios";
  const tallesProductoActivo = productoActivo?.talles || tallesDisponibles;
  const productShareText = productoActivo
    ? `Mirá este producto de Juveelina: ${productoActivo.nombre} ${productoActivo.color}`
    : "";
  const productShareUrl = productoActivo
    ? new URL(enlaceProducto(productoActivo.id), window.location.origin).href
    : "https://www.juveelina.com";

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
              setFotoActual(0);
              setImagenAmpliada(false);
              setTalleSeleccionado((producto.talles || tallesDisponibles)[0]);
              setProductoActivo(producto);
            }}
          >
            {producto.nuevo && <span className="product-new-badge">NEW</span>}
            {producto.precios && <span className="product-sale-badge">-{DESCUENTO}%</span>}
            <img src={producto.imagenes[0]} alt={producto.nombre} />
            <p>{producto.nombre}</p>
            <span>
              {producto.color} · {producto.material}
            </span>
            <Precios precios={producto.precios} />
          </div>
        ))}
      </div>

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
                  {productoActivo.precios && <span className="product-sale-badge">-{DESCUENTO}%</span>}
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
                <Precios precios={productoActivo.precios} />
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
                      productoId: productoActivo.id,
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
            {["Campera-Jean", "Cardigans UruWhy", "Materas criollas"].includes(categoria.nombre) && (
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
