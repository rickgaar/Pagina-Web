import { NavLink } from "react-router-dom";

const MainPage = () => {
    return (
        <section>
            <header className="bg-main-2 w-full flex flex-row justify-around">
                <figure className="w-60 h-40 overflow-hidden">
                    <img src="https://i.ibb.co/jTTB2yd/logo-rojo.png" alt="Logo" className="w-full h-full object-cover" />
                </figure>

                <div className="flex flex-row gap-8 items-center">
                    <NavLink to="/register">
                        <button className="bg-main rounded p-4 font-link text-white text-center w-36 font-bold hover:bg-main-4"> Registrarse </button>
                    </NavLink>
                    <NavLink to="/login">
                        <button className="bg-main rounded p-4 font-link text-white text-center w-36 font-bold hover:bg-main-4"> Iniciar sesión </button>
                    </NavLink>
                </div>
            </header>

            <main className="flex flex-col gap-8 items-center">

                <div className="grid grid-cols-2 px-20 py-8 justify-items-center items-center">
                    <figure className="w-80 h-60 overflow-hidden">
                        <img src="https://i.ibb.co/BwN02cX/logo-morado.png" alt="Math image" className="w-full h-full object-cover" />
                    </figure>
                    <p className="text-white font-link text-center">
                        FUNUM es una aplicación web dedicada a la enseñanza del mundo de las matemáticas. La web ha sido desarrollada por alumnos de segundo año de la carrera Ingeniería Informática en la Universidad Centroamericana José Simeón Cañas (UCA).
                    </p>
                </div>

                <div className="grid grid-cols-2 px-20 py-8 justify-items-center items-center">
                    <p className="text-white font-link text-center">
                        La página consta de varias lecciones de la materia de matemáticas, junto a estas, se presenta un examen con el cual el estudiante podrá poner a prueba su conocimiento de acuerdo a la laección que acaba de leer. Para incentivar al usuario a mantenerse activo en la página, se ha diseñado un sistema de puntos, por el cual los usuarios pueden competir en un ranking para ver quien tiene más puntos, además de tener una tienda de avatares donde se pueden canjear estos puntos.
                    </p>
                    <figure className="w-80 h-60 overflow-hidden">
                        <img src="https://i.ibb.co/qW4LzCW/math2.jpg" alt="Math image" className="w-full h-full object-cover" />
                    </figure>
                </div>

                <NavLink to="/register">
                    <button className="bg-main-2 rounded p-4 font-link text-white text-center w-44 font-bold hover:bg-main-5"> Empezar ahora </button>
                </NavLink>
            </main>
        </section>
    );
}

export default MainPage;