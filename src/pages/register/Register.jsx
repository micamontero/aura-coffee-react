import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import Swal from "sweetalert2"
import { createUser } from "../../services/users.service"
import "./Register.css"

export default function Register() {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const today = new Date().toISOString().split("T")[0]

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid }
    } = useForm({ mode: "onBlur" })

    const password = watch("password")

    async function onSubmit(data) {
        try {
            delete data.confirmPassword
            await createUser(data)
            Swal.fire({
                icon: "success",
                title: "¡Cuenta creada!",
                text: "Tu cuenta fue creada correctamente.",
            })
            reset()
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al crear la cuenta. Intentá de nuevo.",
            })
        }
    }

    return (
        <>
            {/* HERO */}
            <section className="register-hero">
                <div className="container-custom">
                    <span className="register-hero__subtitle">Mi cuenta</span>
                    <h1 className="register-hero__title">Crear cuenta</h1>
                </div>
            </section>

            {/* FORMULARIO */}
            <section className="register">
                <div className="container-custom">
                    <div className="register-form">

                        <h2>Registrate en Aura</h2>

                        <form onSubmit={handleSubmit(onSubmit, () => {
                            Swal.fire({
                                icon: "error",
                                title: "Formulario incompleto",
                                text: "Por favor completá todos los campos correctamente.",
                            })
                        })}>

                            <div className="form-group">
                                <label htmlFor="reg-name">Nombre completo</label>
                                <input
                                    type="text"
                                    id="reg-name"
                                    {...register("name", {
                                        required: "El nombre es obligatorio.",
                                        minLength: { value: 3, message: "Mínimo 3 caracteres." },
                                        maxLength: { value: 60, message: "Máximo 60 caracteres." },
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿÑñ\s]+$/,
                                            message: "El nombre solo puede contener letras y espacios."
                                        },
                                        validate: value =>
                                            value.trim().length >= 3 || "Ingresá tu nombre completo."
                                    })}
                                    placeholder="Tu nombre completo"
                                />
                                {errors.name && <p className="errors">{errors.name.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="reg-email"
                                    {...register("email", {
                                        required: "El email es obligatorio.",
                                        maxLength: { value: 100, message: "Máximo 100 caracteres." },
                                        setValueAs: value => value.trim().toLowerCase(),
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                                            message: "El email no tiene un formato válido."
                                        }
                                    })}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && <p className="errors">{errors.email.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-password">Contraseña</label>
                                <div className="password-field">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="reg-password"
                                        {...register("password", {
                                            required: "La contraseña es obligatoria.",
                                            minLength: { value: 8, message: "Mínimo 8 caracteres." },
                                            maxLength: { value: 30, message: "Máximo 30 caracteres." },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/,
                                                message: "Debe incluir una mayúscula, una minúscula y un número, sin espacios."
                                            }
                                        })}
                                        placeholder="Mínimo 8 caracteres"
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

                            <div className="form-group">
                                <label htmlFor="reg-confirm">Repetir contraseña</label>
                                <div className="password-field">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="reg-confirm"
                                        {...register("confirmPassword", {
                                            required: "Repetí tu contraseña.",
                                            validate: value =>
                                                value === password || "Las contraseñas no coinciden."
                                        })}
                                        placeholder="Repetí tu contraseña"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`} />
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="errors">{errors.confirmPassword.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-birth">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    id="reg-birth"
                                    max={today}
                                    {...register("birthDate", {
                                        required: "La fecha de nacimiento es obligatoria.",
                                        validate: value => {
                                            const birth = new Date(value)
                                            if (Number.isNaN(birth.getTime())) return "Ingresá una fecha válida."
                                            const now = new Date()
                                            if (birth > now) return "La fecha no puede ser futura."
                                            let age = now.getFullYear() - birth.getFullYear()
                                            const m = now.getMonth() - birth.getMonth()
                                            if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
                                            if (age < 13) return "Debés tener al menos 13 años para registrarte."
                                            if (age > 120) return "Ingresá una fecha de nacimiento válida."
                                            return true
                                        }
                                    })}
                                />
                                {errors.birthDate && <p className="errors">{errors.birthDate.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-province">Provincia</label>
                                <select
                                    id="reg-province"
                                    {...register("province", {
                                        required: "Seleccioná una provincia."
                                    })}
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

                            <div className="form-group">
                                <label htmlFor="reg-obs">Observaciones (opcional)</label>
                                <textarea
                                    id="reg-obs"
                                    {...register("observations", {
                                        maxLength: { value: 500, message: "Máximo 500 caracteres." }
                                    })}
                                    placeholder="Algo que quieras contarnos..."
                                />
                                {errors.observations && <p className="errors">{errors.observations.message}</p>}
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={!isValid}
                                >
                                    Crear cuenta
                                </button>
                            </div>

                            <p className="register-login">
                                ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
                            </p>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}