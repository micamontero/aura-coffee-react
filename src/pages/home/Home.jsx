import { Link } from "react-router"
import ProductContainer from "../../components/product-container/ProductContainer"
import heroImg from "../../assets/images/hero.png"
import "./Home.css"

export default function Home() {
    return (
        <>
            {/* BANNER */}
            <section className="banner">
                <div className="banner__overlay">
                    <div className="banner__content container-custom">
                        <span className="banner__subtitle">Specialty Coffee Experience</span>
                        <h1 className="banner__title">
                            Café que <br />
                            despierta experiencias
                        </h1>
                        <p className="banner__text">
                            Descubrí cafés de especialidad seleccionados cuidadosamente para
                            transformar cada taza en un ritual.
                        </p>
                        <div className="banner__buttons">
                            <Link to="/products" className="btn-primary">
                                Explorar tienda
                            </Link>
                            <Link to="/about" className="btn-secondary">
                                Nuestra historia
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* HERO */}
            <section className="hero">
                <div className="hero__container container-custom">
                    <div className="hero__content">
                        <span className="hero__subtitle">
                            Hecho a mano para las amantes del café.
                        </span>
                        <h2 className="hero__title">
                            Más que café, <br />
                            Un ritual diario
                        </h2>
                        <p className="hero__text">
                            En AURA seleccionamos cafés de especialidad provenientes de fincas
                            cuidadosamente elegidas alrededor del mundo. Diseñamos experiencias
                            simples, elegantes y auténticas para quienes disfrutan cada detalle de
                            su taza diaria.
                        </p>
                    </div>
                    <div className="hero__image">
                        <img
                            src={heroImg}
                            alt="Granos de café siendo tostados artesanalmente"
                        />
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS — viene de MockAPI */}
            <ProductContainer />

            {/* FEATURES */}
            <section className="features">
                <div className="container-custom">
                    <div className="features__container">
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <i className="bi bi-truck" />
                            </div>
                            <h3 className="feature-card__title">Envíos rápidos</h3>
                            <p className="feature-card__text">
                                Recibí tu pedido en cualquier parte del país.
                            </p>
                        </article>
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <i className="bi bi-cup-hot" />
                            </div>
                            <h3 className="feature-card__title">Café recién tostado</h3>
                            <p className="feature-card__text">
                                Seleccionamos granos premium tostados artesanalmente.
                            </p>
                        </article>
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <i className="bi bi-heart" />
                            </div>
                            <h3 className="feature-card__title">Experiencia premium</h3>
                            <p className="feature-card__text">
                                Diseñado para quienes disfrutan cada detalle.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </>
    )
}