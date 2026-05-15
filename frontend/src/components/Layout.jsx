import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/nutriai-logo.jpg';

function Layout({ children, authUser, onLogout }) {
  const location = useLocation();
  const isWorkspace = location.pathname === '/dashboard' || location.pathname === '/rekomendasi';
  const authTarget = location.pathname === '/login' ? '/register' : '/login';
  const authLabel = location.pathname === '/login' ? 'Register' : 'Login';

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to={authUser ? '/dashboard' : '/'} className="brand" aria-label="NutriAI">
          <img className="brand__logo" src={logo} alt="Logo NutriAI Menu" />
          <span>SISTEM OPTIMASI MENU MAKANAN BERGIZI BERBASIS AI</span>
        </NavLink>

        <nav className="nav" aria-label="Navigasi utama">
          {isWorkspace ? null : (
            <>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')} end>
                Beranda
              </NavLink>
              <NavLink to="/" className="nav__link">Tentang</NavLink>
              <NavLink to="/" className="nav__link">Fitur</NavLink>
              <NavLink to="/" className="nav__link">Manfaat</NavLink>
              <NavLink to="/" className="nav__link">Kontak</NavLink>
            </>
          )}

          {authUser || isWorkspace ? (
            <button className="nav__button" type="button" onClick={onLogout}>
              Profil
            </button>
          ) : (
            <NavLink to={authTarget} className="nav__button">
              {authLabel}
            </NavLink>
          )}
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
