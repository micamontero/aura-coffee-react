import "./Footer.css"
import { Link, NavLink } from "react-router"


function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container container-custom">
                <div className="footer__brand">
                    <Link to="/" className="navbar__logo">
                        <span className="navbar__brand">AURA</span>
                        <span className="navbar__tagline">COFFEE ROASTERS</span>
                    </Link>
                    <p className="footer__description">
                        Cafés de especialidad seleccionados para transformar cada taza en un
                        ritual.
                    </p>
                    <div className="footer__social">
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i className="bi bi-instagram" />
                        </a>
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i className="bi bi-facebook" />
                        </a>
                        <a
                            href="https://www.tiktok.com/es-419/"
                            target="_blank"
                            aria-label="TikTok"
                        >
                            <i className="bi bi-tiktok" />
                        </a>
                    </div>
                </div>
                <div className="footer__col">
                    <h4 className="footer__col-title">Tienda</h4>
                    <ul className="footer__links">
                        <li>
                            <NavLink to="/products" className="footer__link">
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="footer__link">
                                Nosotros
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="footer__link">
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4 className="footer__col-title">Contacto</h4>
                    <ul className="footer__links">
                        <li>
                            <a href="mailto:hola@auracoffee.com" target="_blank">
                                hola@auracoffee.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+54351333333" target="_blank">
                                +54 351 333-333
                            </a>
                        </li>
                        <li>
                            <a href="https://maps.app.goo.gl/DkyVUzQoQJcXx6NS8" target="_blank" rel="noreferrer">
                                Córdoba, Argentina
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom container-custom">
                <p>&copy; 2025 Aura Coffee Roasters. Todos los derechos reservados.</p>
                <div className="footer__admin-links">
                    <NavLink to="/admin" className="footer__admin-link">
                        Panel de productos
                    </NavLink>
                    <span className="footer__admin-sep">·</span>
                    <NavLink to="/admin/users" className="footer__admin-link">
                        Panel de usuarios
                    </NavLink>
                </div>
            </div>
        </footer>

    )
}

export default Footer
