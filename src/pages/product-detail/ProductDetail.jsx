import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import { getProductById } from "../../services/product.service"
import "./ProductDetail.css"

export default function ProductDetail() {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProduct() {
            const data = await getProductById(id)
            setProduct(data)
            setLoading(false)
        }
        fetchProduct()
    }, [id])

    if (loading) {
        return <p className="loading-text">Cargando producto...</p>
    }

    if (!product) {
        return <p className="loading-text">Producto no encontrado.</p>
    }

    return (
        <>
            {/* BREADCRUMB */}
            <div className="breadcrumb">
                <div className="container-custom">
                    <Link to="/">Inicio</Link>
                    <span> › </span>
                    <Link to="/products">Shop</Link>
                    <span> › </span>
                    <span>{product.name}</span>
                </div>
            </div>

            {/* DETALLE */}
            <section className="product-detail">
                <div className="container-custom product-detail__container">

                    {/* IMAGEN */}
                    <div className="product-detail__image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    {/* INFO */}
                    <div className="product-detail__content">
                        <span className="product-detail__category">{product.category}</span>
                        <h1 className="product-detail__title">{product.name}</h1>
                        <p className="product-detail__price">
                            ${Number(product.price).toLocaleString('es-AR')}
                        </p>
                        <p className="product-detail__description">{product.description}</p>

                        <ul className="product-detail__features">
                            {product.createdAt && (
                                <li>Fecha de ingreso: {new Date(product.createdAt).toLocaleDateString('es-AR')}</li>
                            )}
                            {product.category && (
                                <li>Categoría: {product.category}</li>
                            )}
                        </ul>

                        <div className="product-detail__actions">
                            <button className="btn-primary">Agregar al carrito</button>
                            <Link to="/products" className="btn-secondary">← Volver al shop</Link>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}