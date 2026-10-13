import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import "./Login.css"

export default function Login() {

    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: "onBlur" })

    function onSubmit(data) {
        console.log("Login data:", data)
        alert(`Bienvenida, ${data.email}`)
    }

    return (
        <>
            {/* HERO */}
            <section className="login-hero">
                <div className="container-custom">
                    <span className="login-hero__subtitle">Mi cuenta</span>
                    <h1 className="login-hero__title">Iniciar sesión</h1>
                </div>
            </section>

            {/* FORMULARIO */}
            <section className="login">
                <div className="container-custom">
                    <div className="login-form">

                        <h2>Bienvenida de vuelta</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group">
                                <label htmlFor="login-email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    {...register("email", {
                                        required: "El email es obligatorio.",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "El email no tiene un formato válido."
                                        }
                                    })}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && <p className="errors">{errors.email.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">Contraseña</label>
                                <div className="password-field">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="login-password"
                                        {...register("password", {
                                            required: "La contraseña es obligatoria.",
                                            minLength: { value: 6, message: "Mínimo 6 caracteres." }
                                        })}
                                        placeholder="Tu contraseña"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                                    </button>
                                </div>
                                {errors.password && <p className="errors">{errors.password.message}</p>}
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={!isValid}
                                >
                                    Iniciar sesión
                                </button>
                            </div>

                            <p className="login-register">
                                ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                            </p>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}