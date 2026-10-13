import { useEffect, useRef, useState } from "react"
import ProductCard from "../product-card/ProductCard"
import { getProducts } from "../../services/product.service"
import "./ProductContainer.css"

function ProductContainer() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const sliderRef = useRef(null)

    function updateScrollButtons() {
        const slider = sliderRef.current
        if (!slider) return
        setCanScrollLeft(slider.scrollLeft > 0)
        setCanScrollRight(
            slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1
        )
    }

    function scrollSlider(direction) {
        const slider = sliderRef.current
        if (!slider) return
        const card = slider.querySelector(".product-card")
        const step = card ? card.offsetWidth + 24 : slider.clientWidth
        slider.scrollBy({ left: step * direction, behavior: "smooth" })
    }

    useEffect(() => {
        async function fetchProducts() {
            const data = await getProducts()
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        updateScrollButtons()
        window.addEventListener("resize", updateScrollButtons)
        return () => window.removeEventListener("resize", updateScrollButtons)
    }, [loading, products])

    return (
        <section className="featured-products">
            <div className="container-custom">
                <div className="section-heading section-heading--nav">
                    <div>
                        <span className="section-heading__subtitle">Best Sellers</span>
                        <h2 className="section-heading__title">Productos destacados</h2>
                    </div>

                    {!loading && (
                        <div className="slider-nav">
                            <button
                                type="button"
                                className="slider-nav__btn"
                                onClick={() => scrollSlider(-1)}
                                disabled={!canScrollLeft}
                                aria-label="Ver productos anteriores"
                            >
                                <i className="bi bi-chevron-left" />
                            </button>
                            <button
                                type="button"
                                className="slider-nav__btn"
                                onClick={() => scrollSlider(1)}
                                disabled={!canScrollRight}
                                aria-label="Ver más productos"
                            >
                                <i className="bi bi-chevron-right" />
                            </button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <p className="loading-text">Cargando productos...</p>
                ) : (
                    <div
                        className="products-slider"
                        ref={sliderRef}
                        onScroll={updateScrollButtons}
                    >
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductContainer