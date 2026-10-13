import "./About.css"
import heroImg from "../../assets/images/avatar.jpeg"

export default function About() {
    return (
        <>
            {/* HERO */}
            <section className="about-hero">
                <div className="container-custom">
                    <span className="about-hero__subtitle">Nuestra historia</span>
                    <h1 className="about-hero__title">
                        Pasión por el café de especialidad
                    </h1>
                    <p className="about-hero__text">
                        En AURA Coffee Roasters creemos que cada taza cuenta una historia.
                        Seleccionamos cafés de especialidad cuidadosamente para ofrecer
                        experiencias auténticas y memorables.
                    </p>
                </div>
            </section>

            {/* SOBRE EL PROYECTO */}
            <section className="about-project">
                <div className="container-custom about-project__container">

                    <div className="about-project__content">
                        <h2 className="about-project__title">Sobre el proyecto</h2>
                        <p className="about-project__text">
                            AURA Coffee Roasters es una tienda online ficticia desarrollada
                            como proyecto académico para la materia de Desarrollo Full Stack.
                            El objetivo es ofrecer una experiencia moderna para la compra de
                            cafés de especialidad, accesorios y kits para amantes del café.
                        </p>
                        <p className="about-project__quote">
                            "Cada taza es una experiencia."
                        </p>
                    </div>

                    <div className="developer-card">
                        <img src={heroImg} alt="Micaela Montero" />
                        <h3 className="developer-card__name">Micaela Montero</h3>
                        <p className="developer-card__text">
                            Estudiante de Desarrollo Full Stack.
                            Apasionada por el diseño web, la experiencia de usuario
                            y el desarrollo de interfaces modernas.
                        </p>
                        <p className="developer-card__contact">
                            mica.monteroo15@gmail.com
                        </p>
                    </div>

                </div>
            </section>
        </>
    )
}
