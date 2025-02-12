import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../assets/Context/UserDataContext";
import '../assets/CSS/Home.css'

export const Home = () => {
  const mensaje = useContext(UserContext);
  
  return (
    <section className="home-section">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">Devon</Link>
        </div>
        
        <div className="nav-links">
          <Link to="/catalogo" className="nav-link">Catálogo</Link>
          <Link to="/podcast" className="nav-link">Podcast</Link>
          <Link to="/audio-series" className="nav-link">Audio-Series</Link>
        </div>
      </nav>

      <div className="main-content">
        <div className="session-links">
          <Link to="/sesion" className="plans-link">INICIAR SESIÓN</Link>
          <Link to="/sesion" className="plans-link">Ver planes</Link>
        </div>
      </div>
    </section>
  )
}
