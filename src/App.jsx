import React, {useState} from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import AboutPage from './About';
import Contact from './Contact';
import ContactDetail from './ContactDetail';
import './App.css';
import logo from '/images/logo.jpeg';
import AppRoutes from './AppRoutes';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="BIONUR logo" className="logo-img" />
        </Link>


        {/* Иконка гамбургера */}
        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          aria-label="Toggle menu"
          onKeyDown={e => e.key === 'Enter' && toggleMenu()}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Ссылки */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-btn" onClick={closeMenu}>Главная</Link>
          <Link to="/products" className="nav-btn" onClick={closeMenu}>Продукты</Link>
          <Link to="/about" className="nav-btn" onClick={closeMenu}>О Нас</Link>
          <Link to="/contact" className="nav-btn" onClick={closeMenu}>Контакты</Link>
          <Link to="/admin" className="nav-btn" onClick={closeMenu}>Админ</Link>
        </div>
      </nav>

      <AppRoutes />
    </div>
  );
}

export default App;
