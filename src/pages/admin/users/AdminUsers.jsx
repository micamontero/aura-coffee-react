import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { getUsers, createUser, updateUser, deleteUser } from "../../../services/users.service"
import "./AdminUsers.css"

export default function AdminUsers() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingUserId, setEditingUserId] = useState(null)

    const { register, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm({ mode: "onBlur" })

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        const data = await getUsers()
        setUsers(data)
        setLoading(false)
    }

    async function onSubmit(data) {
        try {
            delete data.confirmPassword

            if (editingUserId) {
                await updateUser(editingUserId, data)
                Swal.fire({
                    icon: "success",
                    title: "Usuario actualizado",
                    text: `El usuario ${data.name} fue actualizado correctamente.`,
                })
            } else {
                await createUser(data)
                Swal.fire({
                    icon: "success",
                    title: "Usuario creado",
                    text: `El usuario ${data.name} fue creado correctamente.`,
                })
            }

            reset()
            setEditingUserId(null)
            fetchUsers()

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error. Intentá de nuevo.",
            })
        }
    }

    function handleEdit(id) {
        const user = users.find(u => u.id === id)
        if (user) {
            setValue("name", user.name)
            setValue("email", user.email)
            setValue("birthDate", user.birthDate)
            setValue("province", user.province)
            setEditingUserId(id)
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        }
    }

    async function handleDelete(id) {
        const result = await Swal.fire({
            icon: "warning",
            title: "¿Eliminar usuario?",
            text: "Esta acción no se puede deshacer.",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })

        if (!result.isConfirmed) return

        try {
            await deleteUser(id)
            Swal.fire({
                icon: "success",
                title: "Usuario eliminado",
                text: "El usuario fue eliminado correctamente.",
            })
            fetchUsers()
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al eliminar. Intentá de nuevo.",
            })
        }
    }

    return (
        <>
            {/* HERO */}
            <section className="admin-hero">
                <div className="container-custom">
                    <span className="admin-hero__subtitle">Panel de control</span>
                    <h1 className="admin-hero__title">Administrador de usuarios</h1>
                </div>
            </section>

            {/* TABLA */}
            <section className="admin-users">
                <div className="container-custom">
                    <div className="table-responsive">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Provincia</th>
                                    <th>Nacimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="loading-text">
                                            Cargando usuarios...
                                        </td>
                                    </tr>
                                ) : users.map(user => (
                                    <tr key={user.id}>
                                        <td><span className="product-name">{user.name}</span></td>
                                        <td>{user.email}</td>
                                        <td>{user.province}</td>
                                        <td className="product-date">
                                            {user.birthDate
                                                ? new Date(user.birthDate).toLocaleDateString('es-AR')
                                                : '-'}
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Borrar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
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
                            {editingUserId ? "Editando usuario" : "Nuevo usuario"}
                        </span>
                        <h2 className="admin-form__title">
                            {editingUserId ? "Editar usuario" : "Agregar usuario"}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit, () => {
                        Swal.fire({
                            icon: "error",
                            title: "Formulario incompleto",
                            text: "Por favor completá todos los campos correctamente.",
                        })
                    })}>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="user-name">Nombre completo</label>
                                <input
                                    type="text"
                                    id="user-name"
                                    {...register("name", {
                                        required: "El nombre es obligatorio.",
                                        minLength: { value: 3, message: "Mínimo 3 caracteres." }
                                    })}
                                    placeholder="Nombre completo"
                                />
                                {errors.name && <p className="errors">{errors.name.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-email">Email</label>
                                <input
                                    type="email"
                                    id="user-email"
                                    {...register("email", {
                                        required: "El email es obligatorio.",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email no válido."
                                        }
                                    })}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && <p className="errors">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="user-password">Contraseña</label>
                                <input
                                    type="password"
                                    id="user-password"
                                    {...register("password", {
                                        required: !editingUserId ? "La contraseña es obligatoria." : false,
                                        minLength: { value: 6, message: "Mínimo 6 caracteres." }
                                    })}
                                    placeholder="Mínimo 6 caracteres"
                                />
                                {errors.password && <p className="errors">{errors.password.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-province">Provincia</label>
                                <select
                                    id="user-province"
                                    {...register("province", { required: "Seleccioná una provincia." })}
                                >
                                    <option value="">Seleccioná una provincia</option>
                                    <option value="Córdoba">Córdoba</option>
                                    <option value="Buenos Aires">Buenos Aires</option>
                                    <option value="Santa Fe">Santa Fe</option>
                                    <option value="Mendoza">Mendoza</option>
                                    <option value="Entre Ríos">Entre Ríos</option>
                                </select>
                                {errors.province && <p className="errors">{errors.province.message}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="user-birth">Fecha de nacimiento</label>
                            <input
                                type="date"
                                id="user-birth"
                                {...register("birthDate", {
                                    required: "La fecha de nacimiento es obligatoria."
                                })}
                            />
                            {errors.birthDate && <p className="errors">{errors.birthDate.message}</p>}
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={!editingUserId && !isValid}
                            >
                                {editingUserId ? "Actualizar usuario" : "Guardar usuario"}
                            </button>
                            {editingUserId && (
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => { reset(); setEditingUserId(null) }}
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