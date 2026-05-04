import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";


import hero2 from "./assets/fondo2.jpg";
import hero3 from "./assets/fondo3.jpg";
import hero4 from "./assets/fondo4.jpg";

import visa from "./assets/visa.png";
import master from "./assets/master.png";
import oca from "./assets/oca.png";
import jmarr from "./assets/jmarr-2x.png";

import ing from "./assets/ing.png";
import whatsapp from "./assets/whatsapp.png";
import mail from "./assets/mail.png";

import { FaInstagram, FaSearch, FaShoppingBag, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Home from "./pages/Home1.jsx";
import Categoria from "./pages/Categoria2.jsx";
import Contacto from "./pages/Contacto.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import ComoComprar from "./pages/ComoComprar.jsx";
import Terminos from "./pages/Terminos.jsx";

import "./index.css";

const heroes = [hero4, hero2, hero3];

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
  { nombre: "Sweaters", detalle: "Colecciones", url: "/colecciones/sweaters" },
  { nombre: "Carteras", detalle: "Accesorios", url: "/accesorios/carteras" },
  { nombre: "Cartera print", detalle: "Accesorios · Carteras", url: "/accesorios/carteras" },
  { nombre: "Bags", detalle: "Accesorios", url: "/accesorios/bags" },
  { nombre: "Bag Juveelina", detalle: "Accesorios · Bags", url: "/accesorios/bags" },
  { nombre: "Bag Vilaró", detalle: "Accesorios · Bags", url: "/accesorios/bags" },
  { nombre: "Bag SolUY", detalle: "Accesorios · Bags", url: "/accesorios/bags" },
  { nombre: "Neceser", detalle: "Accesorios", url: "/accesorios/neceser" },
  { nombre: "Neceser Soy Celeste", detalle: "Accesorios · Neceser", url: "/accesorios/neceser" },
  { nombre: "Peques", detalle: "Vestimenta", url: "/vestimenta/peques" },
  { nombre: "Buzo Sol peques blanco", detalle: "Vestimenta · Peques", url: "/vestimenta/peques" },
  { nombre: "Buzo Sol peques negro", detalle: "Vestimenta · Peques", url: "/vestimenta/peques" },
  { nombre: "Camiseta Escudo peques celeste", detalle: "Vestimenta · Peques", url: "/vestimenta/peques" },
  { nombre: "Camiseta Escudo peques negra", detalle: "Vestimenta · Peques", url: "/vestimenta/peques" },
  { nombre: "Mujeres", detalle: "Vestimenta", url: "/vestimenta/mujeres" },
  { nombre: "Buzo Escudo mujer", detalle: "Vestimenta · Mujeres", url: "/vestimenta/mujeres" },
  { nombre: "Buzo Sol mujer", detalle: "Vestimenta · Mujeres", url: "/vestimenta/mujeres" },
  { nombre: "Hombres", detalle: "Vestimenta", url: "/vestimenta/hombres" },
  { nombre: "Buzo Sol hombre", detalle: "Vestimenta · Hombres", url: "/vestimenta/hombres" },
  { nombre: "Buzo Escudo hombre", detalle: "Vestimenta · Hombres", url: "/vestimenta/hombres" },
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
  const [currentHero, setCurrentHero] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPromptOpen, setCartPromptOpen] = useState(false);
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
    const heroInterval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length);
    }, 12000);

    const textInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % topbarMessages.length);
    }, 12000);

    return () => {
      clearInterval(heroInterval);
      clearInterval(textInterval);
    };
  }, []);

  const prevHero = () => {
    setCurrentHero((prev) => (prev === 0 ? heroes.length - 1 : prev - 1));
  };

  const nextHero = () => {
    setCurrentHero((prev) => (prev + 1) % heroes.length);
  };

  return (
    <div>
      <ScrollToTop />

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
      <Link to="/colecciones/sweaters">Sweaters</Link>
      </div>
    </div>

    <div className="dropdown">
      <span>Vestimenta</span>
      <div className="dropdown-menu">
        <Link to="/vestimenta/peques">Peques</Link>
        <Link to="/vestimenta/mujeres">Mujeres</Link>
        <Link to="/vestimenta/hombres">Hombres</Link>
      </div>
    </div>

    <div className="dropdown">
      <span>Accesorios</span>
      <div className="dropdown-menu">
        <Link to="/accesorios/carteras">Carteras</Link>
        <Link to="/accesorios/bags">Bags</Link>
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
      style={{ backgroundImage: `url(${img})` }}
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
            <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/colecciones/remeras" element={<Categoria titulo="Remeras" onAddToCart={addToCart} />} />
            <Route path="/colecciones/buzos" element={<Navigate to="/colecciones/sweaters" replace />} />
            <Route path="/colecciones/sweaters" element={<Categoria titulo="Sweaters" onAddToCart={addToCart} />} />

  <Route path="/vestimenta/peques" element={<Categoria titulo="Peques" onAddToCart={addToCart} />} />
  <Route path="/vestimenta/mujeres" element={<Categoria titulo="Mujeres" onAddToCart={addToCart} />} />
  <Route path="/vestimenta/hombres" element={<Categoria titulo="Hombres" onAddToCart={addToCart} />} />

  <Route path="/accesorios/carteras" element={<Categoria titulo="Carteras" onAddToCart={addToCart} />} />
  <Route path="/accesorios/bags" element={<Categoria titulo="Bags" onAddToCart={addToCart} />} />
  <Route path="/accesorios/neceser" element={<Categoria titulo="Neceser" onAddToCart={addToCart} />} />
  <Route path="/contacto" element={<Contacto />} />
  <Route path="/nosotros" element={<Nosotros />} />
  <Route path="/como-comprar" element={<ComoComprar />} />
  <Route path="/terminos-y-condiciones" element={<Terminos />} />
</Routes>

 {/* Pie de pag */} 

 <footer className="footer">

{/* NEWSLETTER */}
<div className="footer-newsletter">
  <h3>ɴᴏ ᴛᴇ ǫᴜᴇᴅᴇꜱ ᴄᴏɴ ʟᴀ ᴍᴀɴɪᴊᴀ, ᴠᴇꜱᴛɪʟᴀ!</h3>
  
</div>

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
