import "./ProductCard.css"
import { Link } from "react-router"

function ProductCard({ product }) {
    return (
        <article className="product-card">
            <div className="product-card__image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-card__content">
                <span className="product-card__category">{product.category}</span>
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__price">${Number(product.price).toLocaleString('es-AR')}</p>
                <div className="product-card__actions">
                    <a href="#" className="btn-primary">Comprar</a>
                    <Link to={`/products/${product.id}`} className="product-card__link">
                        Ver detalles
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default ProductCard