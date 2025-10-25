import React, {useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import AboutPage from './About';
import Contact from './Contact';
import ContactDetail from './ContactDetail';
import './App.css';
import logo from '/images/logo.jpeg';
import AppRoutes from './AppRoutes';
import {getCart} from './cartService';
import {getUser, clearAuth} from './authService';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCart().reduce((s, i) => s + i.qty, 0));
  const [user, setUser] = useState(getUser());
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const onUpdate = () => setCartCount(getCart().reduce((s, i) => s + i.qty, 0));
    window.addEventListener('cartUpdated', onUpdate);
    const authUpdate = () => setUser(getUser());
    window.addEventListener('storage', authUpdate);
    return () => {window.removeEventListener('cartUpdated', onUpdate); window.removeEventListener('storage', authUpdate);};
  }, []);

  // Close profile dropdown on outside click or Escape
  useEffect(() => {
    if (!profileOpen) return;
    function onDocClick(e) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setProfileOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [profileOpen]);

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
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-btn" onClick={closeMenu}>Главная</Link>
            <Link to="/products" className="nav-btn" onClick={closeMenu}>Продукты</Link>
            <Link to="/about" className="nav-btn" onClick={closeMenu}>О Нас</Link>
            <Link to="/contact" className="nav-btn" onClick={closeMenu}>Контакты</Link>
          </div>
          <Link to="/cart" className="nav-btn" style={{position: 'relative'}}>
            🛒
            {cartCount > 0 && <span style={{position: 'absolute', top: -6, right: -6, background: '#b00020', color: '#fff', borderRadius: 999, padding: '2px 6px', fontSize: 12}}>{cartCount}</span>}
          </Link>
          {user ? (
            <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
              <div className="profile-wrapper" style={{position: 'relative'}} ref={profileRef}>
                <button
                  className="nav-btn profile-btn"
                  onClick={() => setProfileOpen(p => !p)}
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                  aria-controls="profile-menu"
                  onKeyDown={e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); setProfileOpen(p => !p);} }}
                >
                  <span className="avatar">{(user.name && user.name[0]) || (user.email && user.email[0]) || 'U'}</span>
                  <span className="profile-name">{user.name || user.email}</span>
                </button>
                {profileOpen && (
                  <div id="profile-menu" className="profile-dropdown" role="menu">
                    <Link to="/profile" className="dropdown-item" role="menuitem" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setProfileOpen(false)} onClick={() => setProfileOpen(false)}>Мой профиль</Link>
                    <Link to="/order-history" className="dropdown-item" role="menuitem" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setProfileOpen(false)} onClick={() => setProfileOpen(false)}>Мои заказы</Link>
                    <div className="dropdown-item" role="menuitem" tabIndex={0} onClick={() => {clearAuth(); setUser(null); setProfileOpen(false); window.location.href = '/';}} onKeyDown={e => e.key === 'Enter' && (clearAuth(), setUser(null), setProfileOpen(false), window.location.href = '/')}>Выйти</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{display: 'flex', gap: 8}}>
              <Link to="/login" className="nav-btn">Вход</Link>
              <Link to="/register" className="nav-btn">Регистрация</Link>
            </div>
          )}
        </div>
      </nav>

      <AppRoutes />
    </div>
  );
}

export default App;
