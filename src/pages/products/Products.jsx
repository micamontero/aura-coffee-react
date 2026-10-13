import { useEffect, useState } from "react"
import { Link } from "react-router"
import { getProducts } from "../../services/product.service"
import ProductCard from "../../components/product-card/ProductCard"
import "./Products.css"

export default function Products() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoria, setCategoria] = useState("Todos")

    useEffect(() => {
        async function fetchProducts() {
            const data = await getProducts()
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
    }, [])

    const categorias = ["Todos", "Single Origin", "Blend", "Accesorio", "Kit"]

    const productosFiltrados = categoria === "Todos"
        ? products
        : products.filter(p => p.category === categoria)

    return (
        <>
            {/* HERO */}
            <section className="products-hero">
                <div className="container-custom">
                    <span className="products-hero__subtitle">Catálogo completo</span>
                    <h1 className="products-hero__title">Nuestros Cafés y Accesorios</h1>
                </div>
            </section>

            {/* LAYOUT */}
            <section className="products-page">
                <div className="container-custom products-layout">

                    {/* SIDEBAR */}
                    <aside className="filters">
                        <h3>Filtros</h3>
                        <div className="filter-group">
                            <h4>Categorías</h4>
                            {categorias.map(cat => (
                                <label key={cat} className={categoria === cat ? "filter-active" : ""}>
                                    <input
                                        type="radio"
                                        name="categoria"
                                        value={cat}
                                        checked={categoria === cat}
                                        onChange={() => setCategoria(cat)}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>

                        {/* ACCESO AL PANEL DE ADMINISTRACIÓN */}
                        <Link to="/admin" className="filters__add-btn">
                            <i className="bi bi-plus-lg" /> Agregar producto
                        </Link>
                    </aside>

                    {/* PRODUCTOS */}
                    <div className="products-container">
                        {loading ? (
                            <p className="loading-text">Cargando productos...</p>
                        ) : productosFiltrados.length === 0 ? (
                            <p className="loading-text">No hay productos en esta categoría.</p>
                        ) : (
                            productosFiltrados.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}