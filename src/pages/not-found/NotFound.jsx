import { Link } from "react-router"
import "./NotFound.css"

export default function NotFound() {
    return (
        <>
            <section className="not-found">
                <div className="container-custom">
                    <div className="not-found__content">
                        <span className="not-found__code">404</span>
                        <span className="not-found__eyebrow">Página no encontrada</span>
                        <h1 className="not-found__title">Ups, esta taza se perdió</h1>
                        <p className="not-found__text">
                            La página que buscás no existe o fue movida.
                            Te invitamos a volver al inicio y seguir explorando.
                        </p>
                        <div className="not-found__actions">
                            <Link to="/" className="btn-primary">
                                Volver al inicio
                            </Link>
                            <Link to="/products" className="not-found__link">
                                Ver el shop
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}