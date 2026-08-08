import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";


import hero1 from "./assets/Fondo1.webp";
import hero2 from "./assets/fondo2.webp";
import hero3 from "./assets/fondo3.webp";
import hero4 from "./assets/fondo4.webp";
import heroBanner from "./assets/Banner.webp";

import visa from "./assets/visa.png";
import master from "./assets/master.png";
import oca from "./assets/oca.png";
import jmarr from "./assets/jmarr-2x.png";

import cardigansApilados from "./assets/Cardigans apilados.webp";
import cardiganBeigeDetalle from "./assets/CardigansUruWhy/cardigan-beige-detalle.webp";
import cardiganGrisDetalle from "./assets/CardigansUruWhy/cardigan-gris-detalle.webp";
import materasGrupo from "./assets/3 materas.webp";

import { FaInstagram, FaSearch, FaShoppingBag, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Home from "./pages/Home1.jsx";
import Categoria from "./pages/Categoria2.jsx";
import Contacto from "./pages/Contacto.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import ComoComprar from "./pages/ComoComprar.jsx";
import Terminos from "./pages/Terminos.jsx";

import "./index.css";

const heroes = [
  { image: hero1, duration: 18000 },
  { image: hero4, duration: 12000 },
  { image: hero2, duration: 12000 },
  { image: hero3, duration: 12000 },
  { image: heroBanner, duration: 12000 },
];
const newArrivals = [
  {
    image: materasGrupo,
    title: "Materas Criollas",
    url: "/accesorios/materas-criollas",
  },
  {
    image: cardigansApilados,
    title: "Cardigans UruWhy",
    url: "/colecciones/cardigans-uruwhy",
  },
  {
    image: cardiganBeigeDetalle,
    title: "Cardigans UruWhy",
    url: "/colecciones/cardigans-uruwhy",
  },
  {
    image: cardiganGrisDetalle,
    title: "Cardigans UruWhy",
    url: "/colecciones/cardigans-uruwhy",
  },
];

const searchItems = [
  { nombre: "Remeras", detalle: "Colecciones", url: "/colecciones/remeras" },
  { nombre: "Básica Sol negra", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Básica Sol blanca", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Básica Sol gris", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Básica Sol marrón", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Básica Escudo negra", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Básica Escudo blanca", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Básica Escudo gris", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Básica Escudo marrón", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Sensación Uy blanca", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Sensación Uy negra", detalle: "Colecciones · Remeras", url: "/colecciones/remeras" },
  { nombre: "Buzos Uy", detalle: "Colecciones", url: "/colecciones/buzos-uy" },
  { nombre: "Buzo Uy medio sol", detalle: "Colecciones · Buzos Uy", url: "/colecciones/buzos-uy" },
  { nombre: "Cardigans UruWhy", detalle: "Colecciones", url: "/colecciones/cardigans-uruwhy" },
  { nombre: "Cardigan UruWhy beige", detalle: "Colecciones · Cardigans UruWhy", url: "/colecciones/cardigans-uruwhy" },
  { nombre: "Cardigan UruWhy gris", detalle: "Colecciones · Cardigans UruWhy", url: "/colecciones/cardigans-uruwhy" },
  { nombre: "Cardigan UruWhy rosa", detalle: "Colecciones · Cardigans UruWhy", url: "/colecciones/cardigans-uruwhy" },
  { nombre: "Cardigan UruWhy azul", detalle: "Colecciones · Cardigans UruWhy", url: "/colecciones/cardigans-uruwhy" },
  { nombre: "Sweaters", detalle: "Colecciones", url: "/colecciones/sweaters" },
  { nombre: "Buzo Oriental uy", detalle: "Colecciones · Sweaters", url: "/colecciones/sweaters" },
  { nombre: "Buzo Golden.uy", detalle: "Colecciones · Sweaters", url: "/colecciones/sweaters" },
  { nombre: "Carteras", detalle: "Accesorios", url: "/accesorios/carteras" },
  { nombre: "Print.R.O.U", detalle: "Accesorios · Carteras", url: "/accesorios/carteras" },
  { nombre: "Print.Uy", detalle: "Accesorios · Carteras", url: "/accesorios/carteras" },
  { nombre: "TOTES", detalle: "Accesorios", url: "/accesorios/bags" },
  { nombre: "Tote bag", detalle: "Accesorios · TOTES", url: "/accesorios/bags" },
  { nombre: "Materas Criollas", detalle: "Accesorios", url: "/accesorios/materas-criollas" },
  { nombre: "Matera Criolla Marrón", detalle: "Accesorios · Materas Criollas", url: "/accesorios/materas-criollas" },
  { nombre: "Matera Criolla Beige", detalle: "Accesorios · Materas Criollas", url: "/accesorios/materas-criollas" },
  { nombre: "Matera Criolla Negra", detalle: "Accesorios · Materas Criollas", url: "/accesorios/materas-criollas" },
  { nombre: "Neceser", detalle: "Accesorios", url: "/accesorios/neceser" },
  { nombre: "Neceser Soy Celeste", detalle: "Accesorios · Neceser", url: "/accesorios/neceser" },
  { nombre: "Guríses", detalle: "Vestimenta", url: "/vestimenta/gurises" },
  { nombre: "Buzo Vilaró guríses blanco", detalle: "Vestimenta · Guríses", url: "/vestimenta/gurises" },
  { nombre: "Buzo Vilaró guríses negro", detalle: "Vestimenta · Guríses", url: "/vestimenta/gurises" },
  { nombre: "Camiseta Escudo guríses celeste", detalle: "Vestimenta · Guríses", url: "/vestimenta/gurises" },
  { nombre: "Camiseta Escudo guríses negra", detalle: "Vestimenta · Guríses", url: "/vestimenta/gurises" },
  { nombre: "Mujeres", detalle: "Vestimenta", url: "/vestimenta/mujeres" },
  { nombre: "Buzo patriota mujer", detalle: "Vestimenta · Mujeres", url: "/vestimenta/mujeres" },
  { nombre: "Buzo Vilaró mujer", detalle: "Vestimenta · Mujeres", url: "/vestimenta/mujeres" },
  { nombre: "Cardigan UruWhy mujer", detalle: "Vestimenta · Mujeres", url: "/vestimenta/mujeres" },
  { nombre: "Sensación Uy mujer", detalle: "Vestimenta · Mujeres", url: "/vestimenta/mujeres" },
  { nombre: "Hombres", detalle: "Vestimenta", url: "/vestimenta/hombres" },
  { nombre: "Buzo Vilaró hombre", detalle: "Vestimenta · Hombres", url: "/vestimenta/hombres" },
  { nombre: "Buzo patriota hombre", detalle: "Vestimenta · Hombres", url: "/vestimenta/hombres" },
  { nombre: "Buzo Oriental uy hombre", detalle: "Vestimenta · Hombres", url: "/vestimenta/hombres" },
  { nombre: "Buzo Horse hombre", detalle: "Vestimenta · Hombres", url: "/vestimenta/hombres" },
];

const topbarMessages = [
  "ENVÍOS A TODO EL PAÍS",
  "RETIRO EN PUNTA CARRETAS",
  "PRODUCTOS DE COLECCIÓN",
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isProductPage =
      pathname.startsWith("/colecciones/") ||
      pathname.startsWith("/vestimenta/") ||
      pathname.startsWith("/accesorios/");

    if (isProductPage) {
      window.requestAnimationFrame(() => {
        document
          .querySelector(".category-page")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const [currentHero, setCurrentHero] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPromptOpen, setCartPromptOpen] = useState(false);
  const [newArrivalsOpen, setNewArrivalsOpen] = useState(true);
  const [currentNewArrival, setCurrentNewArrival] = useState(0);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("juveelina-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const searchResults = normalizedSearch
    ? searchItems.filter((item) =>
        `${item.nombre} ${item.detalle}`.toLowerCase().includes(normalizedSearch)
      )
    : searchItems.slice(0, 5);
  const activeNewArrival = newArrivals[currentNewArrival];

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm("");
  };

  const addToCart = (item) => {
    setCartItems((actual) => [
      ...actual,
      {
        ...item,
        id: `${item.nombre}-${item.color}-${item.talle}-${Date.now()}`,
      },
    ]);
    setCartPromptOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((actual) => actual.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("juveelina-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const isProductPage =
      location.pathname.startsWith("/colecciones/") ||
      location.pathname.startsWith("/vestimenta/") ||
      location.pathname.startsWith("/accesorios/");

    const startTimer = setTimeout(() => {
      setPageLoading(isProductPage);
    }, 0);

    if (!isProductPage) return () => clearTimeout(startTimer);

    const loadingTimer = setTimeout(() => setPageLoading(false), 680);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(loadingTimer);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!newArrivalsOpen) return undefined;

    const imageInterval = setInterval(() => {
      setCurrentNewArrival((prev) => (prev + 1) % newArrivals.length);
    }, 3000);

    return () => clearInterval(imageInterval);
  }, [newArrivalsOpen]);

  useEffect(() => {
    const heroTimer = setTimeout(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length);
    }, heroes[currentHero].duration);

    const textInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % topbarMessages.length);
    }, 12000);

    return () => {
      clearTimeout(heroTimer);
      clearInterval(textInterval);
    };
  }, [currentHero]);

  const prevHero = () => {
    setCurrentHero((prev) => (prev === 0 ? heroes.length - 1 : prev - 1));
  };

  const nextHero = () => {
    setCurrentHero((prev) => (prev + 1) % heroes.length);
  };

  return (
    <div>
      <ScrollToTop />

      {pageLoading && (
        <div className="page-loading-cloud" aria-live="polite" aria-label="Cargando productos">
          <span className="page-loading-spinner" />
          <p>Cargando</p>
        </div>
      )}

      {newArrivalsOpen && (
        <div className="new-arrivals-backdrop" onClick={() => setNewArrivalsOpen(false)}>
          <section className="new-arrivals-popup" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="new-arrivals-close"
              aria-label="Cerrar novedades"
              onClick={() => setNewArrivalsOpen(false)}
            >
              ×
            </button>
            <div className="new-arrivals-banner">NUEVOS INGRESOS!</div>
            <Link
              to={activeNewArrival.url}
              className="new-arrivals-image-link"
              onClick={() => setNewArrivalsOpen(false)}
            >
              <img
                key={currentNewArrival}
                src={activeNewArrival.image}
                alt={activeNewArrival.title}
              />
            </Link>
            <div className="new-arrivals-content">
              <h2>{activeNewArrival.title}</h2>
              <Link
                to={activeNewArrival.url}
                className="new-arrivals-button"
                onClick={() => setNewArrivalsOpen(false)}
              >
                Ver más
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* TOP BAR */}
      <div className="topbar">
        <p key={currentMessage} className="fade-text">
          {topbarMessages[currentMessage]}
        </p>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
  <div className="navbar-left">
  <Link to="/" className="logo">JUVEELINA</Link>

  <div className="nav-links">
    <div className="dropdown">
      <span>Colecciones</span>
      <div className="dropdown-menu">
      <Link to="/colecciones/remeras">Remeras</Link>
      <Link to="/colecciones/buzos-uy">Buzos Uy</Link>
      <Link to="/colecciones/cardigans-uruwhy" className="dropdown-new-link">
        <span>Cardigans UruWhy</span>
        <span className="dropdown-new-badge">NEW</span>
      </Link>
      <Link to="/colecciones/sweaters">Sweaters</Link>
      </div>
    </div>

    <div className="dropdown">
      <span>Vestimenta</span>
      <div className="dropdown-menu">
          <Link to="/vestimenta/gurises">Guríses</Link>
        <Link to="/vestimenta/mujeres">Mujeres</Link>
        <Link to="/vestimenta/hombres">Hombres</Link>
      </div>
    </div>

    <div className="dropdown">
      <span>Accesorios</span>
      <div className="dropdown-menu">
        <Link to="/accesorios/carteras">Carteras</Link>
        <Link to="/accesorios/bags">TOTES</Link>
        <Link to="/accesorios/materas-criollas" className="dropdown-new-link">
          <span>Materas Criollas</span>
          <span className="dropdown-new-badge">NEW</span>
        </Link>
        <Link to="/accesorios/neceser">Neceser</Link>
      </div>
    </div>
    </div>
    </div>
    <div className="navbar-icons">
    <button type="button" aria-label="Buscar" onClick={() => setSearchOpen(true)}>
      <FaSearch />
    </button>
    <a href="mailto:juveelinauy2@gmail.com" aria-label="Enviar mail">
      <MdEmail />
    </a>
    <button type="button" aria-label="Carrito" className="cart-icon-button" onClick={() => setCartOpen(true)}>
      <FaShoppingBag />
      {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
    </button>

  
  </div>
</nav>

{searchOpen && (
  <div className="search-backdrop" onClick={closeSearch}>
    <div className="search-panel" onClick={(e) => e.stopPropagation()}>
      <div className="search-header">
        <FaSearch />
        <input
          autoFocus
          type="search"
          value={searchTerm}
          placeholder="Buscar productos o categorías"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={closeSearch}>
          ×
        </button>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <Link to={item.url} key={`${item.nombre}-${item.url}`} onClick={closeSearch}>
              <span>{item.nombre}</span>
              <small>{item.detalle}</small>
            </Link>
          ))
        ) : (
          <p>No encontramos resultados para "{searchTerm}".</p>
        )}
      </div>
    </div>
  </div>
)}

{cartOpen && (
  <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
    <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
      <div className="cart-header">
        <h2>Carrito</h2>
        <button type="button" onClick={() => setCartOpen(false)}>
          ×
        </button>
      </div>

      <p className="cart-note">Guardá acá las prendas que te gustan para tenerlas a mano.</p>

      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <div>
                  <h3>{item.nombre}</h3>
                  <p>{item.talle ? `${item.color} · Talle ${item.talle}` : item.color}</p>
                  <small>{item.categoria}</small>
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    Quitar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button type="button" className="clear-cart-button" onClick={clearCart}>
            Vaciar carrito
          </button>
        </>
      ) : (
        <p className="empty-cart">Todavía no agregaste productos.</p>
      )}
    </aside>
  </div>
)}

{cartPromptOpen && (
  <div className="cart-prompt-backdrop" onClick={() => setCartPromptOpen(false)}>
    <div className="cart-prompt" onClick={(e) => e.stopPropagation()}>
      <h2>Producto agregado</h2>
      <p>¿Querés ver tu carrito o seguir mirando productos?</p>
      <div>
        <button
          type="button"
          onClick={() => {
            setCartPromptOpen(false);
            setCartOpen(true);
          }}
        >
          Ver carrito
        </button>
        <button type="button" onClick={() => setCartPromptOpen(false)}>
          Seguir mirando
        </button>
      </div>
    </div>
  </div>
)}

     {/* HERO */}
{/* HERO */}
<div className="hero">
  {heroes.map((img, index) => (
    <div
      key={index}
      className={`hero-fade ${index === currentHero ? "active" : ""}`}
      style={{ backgroundImage: `url(${img.image})` }}
    />
  ))}

  <div className="hero-content">
    <h1>JUVEELINA</h1>
    <p>Family Project</p>
  </div>

  <button className="prev" onClick={prevHero}>◀</button>
  <button className="next" onClick={nextHero}>▶</button>
</div>


            {/* Mostrar pag */}
            <main className="page-shell" key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home onAddToCart={addToCart} />} />

                <Route path="/colecciones/remeras" element={<Categoria titulo="Remeras" onAddToCart={addToCart} />} />
                <Route path="/colecciones/buzos-uy" element={<Categoria titulo="Buzos Uy" onAddToCart={addToCart} />} />
                <Route path="/colecciones/cardigans-uruwhy" element={<Categoria titulo="Cardigans UruWhy" onAddToCart={addToCart} />} />
                <Route path="/colecciones/buzos" element={<Navigate to="/colecciones/sweaters" replace />} />
                <Route path="/colecciones/sweaters" element={<Categoria titulo="Sweaters" onAddToCart={addToCart} />} />

                <Route path="/vestimenta/peques" element={<Navigate to="/vestimenta/gurises" replace />} />
                <Route path="/vestimenta/gurises" element={<Categoria titulo="Guríses" onAddToCart={addToCart} />} />
                <Route path="/vestimenta/mujeres" element={<Categoria titulo="Mujeres" onAddToCart={addToCart} />} />
                <Route path="/vestimenta/hombres" element={<Categoria titulo="Hombres" onAddToCart={addToCart} />} />

                <Route path="/accesorios/carteras" element={<Categoria titulo="Carteras" onAddToCart={addToCart} />} />
                <Route path="/accesorios/bags" element={<Categoria titulo="TOTES" onAddToCart={addToCart} />} />
                <Route path="/accesorios/materas-uy" element={<Navigate to="/accesorios/materas-criollas" replace />} />
                <Route path="/accesorios/materas-criollas" element={<Categoria titulo="Materas Criollas" onAddToCart={addToCart} />} />
                <Route path="/accesorios/neceser" element={<Categoria titulo="Neceser" onAddToCart={addToCart} />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/como-comprar" element={<ComoComprar />} />
                <Route path="/terminos-y-condiciones" element={<Terminos />} />
              </Routes>
            </main>

 {/* Pie de pag */} 

 <footer className="footer">

{/* COLUMNAS */}
<div className="footer-columns">

  <div>
    <h4>EMPRESA</h4>
    <p><Link to="/nosotros">Nosotros</Link></p>
    <p><Link to="/contacto">Contacto</Link></p>
  </div>

  <div>
    <h4>COMPRA</h4>
    <p><Link to="/como-comprar">Cómo comprar</Link></p>
    <p><Link to="/terminos-y-condiciones">Términos y condiciones</Link></p>
  </div>

  <div className="right-block">

    <div>
      <h4>CONTACTO</h4>
      <div className="contacto-icons">
  <a href="https://www.instagram.com/juveelina/?hl=es" target="_blank">
    <FaInstagram />
  </a>

  <a href="https://wa.me/59899489924" target="_blank" rel="noreferrer">
    <FaWhatsapp />
  </a>

  <a href="mailto:juveelinauy2@gmail.com" aria-label="Enviar mail">
    <MdEmail />
  </a>
</div>
    </div>

    <div>
      <h4>Métodos de pago</h4>
      <div className="payment-icons">
      <p> <img src={visa} /></p>
      <p>  <img src={master} /></p>
      <p>  <img src={oca} /></p>
      </div>
    </div>

  </div>

</div>
</footer>

<section className="footer-brand">
  <div className="footer-brand-mark">
    <img src={jmarr} alt="" />
    <strong>JUVEELINA</strong>
    <img src={jmarr} alt="" className="footer-brand-mark-reverse" />
  </div>
  <span>JUVEELINA 2026</span>
</section>

    </div>
  );
}

export default App;
