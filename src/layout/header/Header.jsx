import { useState } from "react"
import "./Header.css"
import { NavLink, Link } from "react-router"

function Header() {

    const [menuOpen, setMenuOpen] = useState(false)

    function closeMenu() {
        setMenuOpen(false)
    }

    return (
        <header className="header">
            <nav
                className="navbar container-custom"
                aria-label="Menú principal"
            >
                {/* LOGO + TOGGLER */}
                <div className="navbar__top">
                    <Link to="/" className="navbar__logo" onClick={closeMenu}>
                        <span className="navbar__brand">AURA</span>
                        <span className="navbar__tagline">COFFEE ROASTERS</span>
                    </Link>

                    {/* BOTON HAMBURGUESA — manejado con useState */}
                    <button
                        className={`navbar-toggler ${menuOpen ? "navbar-toggler--open" : ""}`}
                        type="button"
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-expanded={menuOpen}
                        aria-controls="menuPrincipal"
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} />
                    </button>
                </div>

                {/* MENU */}
                <div
                    className={`navbar-collapse ${menuOpen ? "navbar-collapse--open" : ""}`}
                    id="menuPrincipal"
                >
                    <ul className="navbar__links">
                        <li>
                            <NavLink to="/" className="nav-link" onClick={closeMenu}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" className="nav-link" onClick={closeMenu}>
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="nav-link" onClick={closeMenu}>
                                Nosotros
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
                                Contacto
                            </NavLink>
                        </li>
                    </ul>

                    <div className="navbar__actions">
                        <NavLink to="/products" className="navbar__icon" aria-label="Buscar" onClick={closeMenu}>
                            <i className="bi bi-search" />
                        </NavLink>
                        <NavLink to="/register" className="navbar__icon" aria-label="Mi cuenta" onClick={closeMenu}>
                            <i className="bi bi-person" />
                        </NavLink>
                        <a href="#" className="navbar__icon navbar__cart" aria-label="Carrito">
                            <i className="bi bi-bag" />
                            <span className="navbar__cart-count">0</span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header