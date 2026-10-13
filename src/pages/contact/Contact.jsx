import Swal from "sweetalert2"
import { useForm } from "react-hook-form"
import "./Contact.css"

export default function Contact() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    function onSubmit(data) {
        console.log(data)
        Swal.fire({
            icon: "success",
            title: "¡Mensaje enviado!",
            text: "Te responderemos a la brevedad.",
        })
        reset()
    }

    return (
        <>
            {/* HERO */}
            <section className="contact-hero">
                <div className="container-custom">
                    <span className="contact-hero__subtitle">Contacto</span>
                    <h1 className="contact-hero__title">Hablemos de café</h1>
                </div>
            </section>

            {/* CONTENIDO */}
            <section className="contact-content">
                <div className="container-custom contact-layout">

                    {/* FORMULARIO */}
                    <div className="contact-form">
                        <h2>Envíanos un mensaje</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group">
                                <label htmlFor="contact-name">Nombre completo</label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    {...register("name", { required: "El nombre es obligatorio." })}
                                    placeholder="Tu nombre"
                                />
                                {errors.name && <p className="errors">{errors.name.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="contact-email"
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

                            <div className="form-group">
                                <label htmlFor="contact-message">Mensaje</label>
                                <textarea
                                    id="contact-message"
                                    {...register("message", {
                                        required: "El mensaje es obligatorio.",
                                        minLength: { value: 20, message: "Mínimo 20 caracteres." },
                                        maxLength: { value: 1000, message: "Máximo 1000 caracteres." }
                                    })}
                                    placeholder="¿En qué podemos ayudarte?"
                                />
                                {errors.message && <p className="errors">{errors.message.message}</p>}
                            </div>

                            <button type="submit" className="btn-primary">
                                Enviar mensaje
                            </button>

                        </form>
                    </div>

                    {/* MAPA */}
                    <div className="contact-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103620.36386469044!2d-64.36415512369852!3d-31.367342484187922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943299b5a9782781%3A0x977d64294394e11b!2sCherry%20Season%20%7C%20Cerro!5e1!3m2!1ses!2sar!4v1781320375831!5m2!1ses!2sar"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                </div>
            </section>

            {/* INFO CARDS */}
            <section className="contact-info">
                <div className="container-custom contact-info__container">
                    <div className="info-card">
                        <i className="bi bi-geo-alt" />
                        <h3>Ubicación</h3>
                        <p>Córdoba, Argentina</p>
                    </div>
                    <div className="info-card">
                        <i className="bi bi-telephone" />
                        <h3>Teléfono</h3>
                        <p>+54 9 343 5045329</p>
                    </div>
                    <div className="info-card">
                        <i className="bi bi-envelope" />
                        <h3>Email</h3>
                        <p>hola@auracoffee.com</p>
                    </div>
                </div>
            </section>
        </>
    )
}
