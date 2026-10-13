import { useForm } from "react-hook-form"
import "./AdminProducts.css"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import ProductRow from "../../../components/product-row/ProductRow"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../../services/product.service"

function AdminProducts() {

    const [products, setProducts] = useState([])
    const [editingProductId, setEditingProductId] = useState(null)
    const [loading, setLoading] = useState(true)

    // Hook de formularios
    const { register, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm({ mode: "onBlur" })

    useEffect(() => {
        obtenerProductos()
    }, [])

    async function obtenerProductos() {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setLoading(false)
    }

    async function onSubmitForm(data) {
        try {
            if (editingProductId) {
                // MODO EDICIÓN — PUT
                const original = products.find(product => product.id === editingProductId)
                await updateProduct(editingProductId, { ...data, createdAt: original?.createdAt })
                Swal.fire({
                    icon: "success",
                    title: "Producto actualizado",
                    text: `El producto ${data.name} fue actualizado correctamente.`,
                })
            } else {
                // MODO CREACIÓN — POST
                data.createdAt = new Date().toISOString()
                await createProduct(data)
                Swal.fire({
                    icon: "success",
                    title: "Producto agregado",
                    text: `El producto ${data.name} fue agregado correctamente.`,
                })
            }

            reset()                  // limpia el formulario
            setEditingProductId(null) // vuelve a modo creación
            obtenerProductos()        // actualiza la tabla

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error. Por favor intentá de nuevo.",
            })
        }
    }

    function handleEdit(id) {
        const productToEdit = products.find(product => product.id === id)
        if (productToEdit) {
            setValue("name", productToEdit.name)
            setValue("price", productToEdit.price)
            setValue("description", productToEdit.description)
            setValue("category", productToEdit.category)
            setValue("image", productToEdit.image)
            setEditingProductId(id)
        }
    }

    async function handleDelete(id) {
        const result = await Swal.fire({
            icon: "warning",
            title: "¿Desea eliminarlo?",
            text: "Esta acción no se puede deshacer.",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })

        if (!result.isConfirmed) return

        try {
            await deleteProduct(id)
            Swal.fire({
                icon: "success",
                title: "Producto eliminado",
                text: "El producto fue eliminado correctamente.",
            })
            obtenerProductos()
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error al eliminar",
                text: "Ocurrió un error. Por favor intentá de nuevo.",
            })
        }
    }

    return (
        <>
            {/* HERO */}
            <section className="admin-hero">
                <div className="container-custom">
                    <span className="admin-hero__subtitle">Panel de control</span>
                    <h1 className="admin-hero__title">Administrador de productos</h1>
                </div>
            </section>

            {/* TABLA */}
            <section className="admin-products">
                <div className="container-custom">
                    <div className="table-responsive">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Foto</th>
                                    <th>Nombre</th>
                                    <th>Fecha</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="loading-text">
                                            Cargando productos...
                                        </td>
                                    </tr>
                                ) : products.map((product) => (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FORMULARIO */}
            <section className="admin-form">
                <div className="admin-form__inner">

                    <div className="admin-form__header">
                        <span className="admin-form__eyebrow">
                            {editingProductId ? "Editando producto" : "Nuevo producto"}
                        </span>
                        <h2 className="admin-form__title">
                            {editingProductId ? "Editar producto" : "Agregar producto"}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitForm, () => {
                        Swal.fire({
                            icon: "error",
                            title: "Formulario incompleto",
                            text: "Por favor completá todos los campos antes de guardar.",
                        })
                    })}>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="prod-name">Nombre del producto</label>
                                <input
                                    type="text"
                                    id="prod-name"
                                    {...register("name", { 
                                        required: "El nombre es obligatorio." , 
                                        minLength: {value:3, message: "El nombre del producto debe tener al menos 3 caracteres."},
                                        maxLength: {value:50, message: "El nombre del producto no puede tener mas de 50 caracteres."}})}
                                    placeholder="Ej: Sierra Negra"
                                />
                                
                                {errors.name && <p className="errors">{errors.name.message}</p>}

                            </div>
                            <div className="form-group">
                                <label htmlFor="prod-price">Precio</label>
                                <input
                                    type="number"
                                    id="prod-price"
                                    {...register("price", { required: true, valueAsNumber: true })}
                                    placeholder="Ej: 18500"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="prod-description">Descripción</label>
                            <textarea
                                id="prod-description"
                                {...register("description", { required: true })}
                                placeholder="Describí el producto..."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="prod-category">Categoría</label>
                                <select id="prod-category" {...register("category", { required: true })}>
                                    <option value="Single Origin">Single Origin</option>
                                    <option value="Blend">Blend</option>
                                    <option value="Accesorio">Accesorio</option>
                                    <option value="Kit">Kit</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="prod-image">URL Imagen</label>
                                <input
                                    type="url"
                                    id="prod-image"
                                    {...register("image", { required: true })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="form-divider" />

                        <div className="checkbox-group">
                            <label>
                                <input type="checkbox" {...register("premium")} /> Café Premium
                            </label>
                            <label>
                                <input type="checkbox" {...register("envioGratis")} /> Envío Gratis
                            </label>
                            <label>
                                <input type="checkbox" {...register("edicionLimitada")} /> Edición Limitada
                            </label>
                        </div>

                        <div className="form-actions">
                            <button disabled={!editingProductId && !isValid}
                                type="submit" className="btn-primary">
                                {editingProductId ? "Actualizar producto" : "Guardar producto"}
                            </button>
                            {editingProductId && (
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => { reset(); setEditingProductId(null) }}

                                >
                                    Cancelar edición
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </section>
        </>
    )
}

export default AdminProducts