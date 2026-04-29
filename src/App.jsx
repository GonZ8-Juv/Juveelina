import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";


import hero1 from "./assets/fondo1.jpeg";
import hero2 from "./assets/fondo2.jpg";
import hero3 from "./assets/fondo3.AVIF";

import visa from "./assets/visa.png";
import master from "./assets/master.png";
import oca from "./assets/oca.png";

import ing from "./assets/ing.png";
import whatsapp from "./assets/whatsapp.png";
import mail from "./assets/mail.png";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Home from "./pages/Home1.jsx";
import Categoria from "./pages/Categoria2.jsx";

import "./index.css";

const heroes = [hero1, hero2, hero3];


const topbarMessages = [
  "ENVÍOS A TODO EL PAÍS",
  "RETIRO EN PUNTA CARRETAS",
  "PRODUCTOS DE COLECCIÓN",
];

function App() {
  const [currentHero, setCurrentHero] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

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
      <Link to="/colecciones/buzos">Buzos</Link>
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
    <button>🔍</button>
    <a href="mailto:contacto@juveelina.com">✉</a>
    <button>🛍</button>

  
  </div>
</nav>

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

            <Route path="/colecciones/remeras" element={<Categoria titulo="Remeras" />} />
            <Route path="/colecciones/buzos" element={<Categoria titulo="Buzos" />} />
            <Route path="/colecciones/sweaters" element={<Categoria titulo="Sweaters" />} />

  <Route path="/vestimenta/peques" element={<Categoria titulo="Peques" />} />
  <Route path="/vestimenta/mujeres" element={<Categoria titulo="Mujeres" />} />
  <Route path="/vestimenta/hombres" element={<Categoria titulo="Hombres" />} />

  <Route path="/accesorios/carteras" element={<Categoria titulo="Carteras" />} />
  <Route path="/accesorios/bags" element={<Categoria titulo="Bags" />} />
  <Route path="/accesorios/neceser" element={<Categoria titulo="Neceser" />} />
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
    <p>Nosotros</p>
    <p>Contacto</p>
    <p>Showroom</p>
  </div>

  <div>
    <h4>COMPRA</h4>
    <p>Cómo comprar</p>
    <p>Envíos y devoluciones</p>
    <p>Términos y condiciones</p>
  </div>

  <div className="right-block">

    <div>
      <h4>CONTACTO</h4>
      <div className="contacto-icons">
  <a href="https://www.instagram.com/juveelina/?hl=es" target="_blank">
    <FaInstagram />
  </a>

  <a href="https://wa.me/598XXXXXXXX" target="_blank">
    <FaWhatsapp />
  </a>

  <a href="contacto@juveelina.com">
    <MdEmail />
  </a>
</div>
    </div>

    <div>
      <h4></h4>
      <div className="payment-icons">
      <p> <img src={visa} /></p>
      <p>  <img src={master} /></p>
      <p>  <img src={oca} /></p>
      </div>
    </div>

  </div>

</div>
</footer>

    </div>
  );
}

export default App;