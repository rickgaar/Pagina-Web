import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../services/user.service";

const Register = () => {

    const [userName, setUserNameData] = useState();
    const [userEmail, setUserEmailData] = useState();
    const [userPassword, setUserPasswordData] = useState();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showErrorConfirmation, setShowErrorConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(userName, userEmail, userPassword);
            setShowConfirmation(true);
        } catch (error) {
            console.log(error);
            setShowErrorConfirmation(true);
        }
    };
    
    const handleNameChange = (e) => {
        setUserNameData(e.target.value);
    };
    const handleEmailChange = (e) => {
        setUserEmailData(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setUserPasswordData(e.target.value);
    };
    
    const closeConfirmation = () => {
        setShowConfirmation(false);
        navigate("/login");
    };

    const closeErrorConfirmation = () => {
        setShowErrorConfirmation(false);
    };

    return (
        <main>
            <NavLink to="/">
                <button><svg fill="white" xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 -960 960 960" width="50"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg></button>
            </NavLink>
            <div className="text-white font-link flex flex-col justify-center items-center gap-8 p-10">

                <figure className="w-64 h-64 overflow-hidden rounded-full">
                    <img src="https://i.ibb.co/jTTB2yd/logo-rojo.png" alt="logo" className="w-full h-full object-cover" />
                </figure>
                <p className="text-3xl font-bold">Registro</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
                    <p className="text-xl">Usuario</p>
                    <input id="nombre" name="nombre" placeholder="Ingrese su usuario" onChange={handleNameChange} type="text" className="text-black h-8 w-full p-2"></input>

                    <p className="text-xl">Correo</p>
                    <input id="correo" name="correo" placeholder="Ingrese su correo" onChange={handleEmailChange} type="email" className="text-black h-8 w-full p-2"></input>

                    <p className="text-xl">Contraseña</p>
                    <input id="password" name="password" placeholder="Ingrese su contraseña" onChange={handlePasswordChange} type="password" className="text-black h-8 w-full p-2"></input>

                    <button type="submit" className="bg-main-2 p-4 rounded-full font-bold"> Registrarse </button>
                </form>

            </div>
            {/* Ventana de confirmación */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md" style={{ color: "black" }}>
                        <p className="text-lg font-semibold mb-4">
                            Usuario creado exitosamente
                        </p>
                        <button
                            onClick={closeConfirmation}
                            className="bg-main-2 text-white px-4 py-2 rounded-md"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            {/* Ventana de Error */}
            {showErrorConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md text-black">
                        <p className="text-lg font-semibold mb-4">
                            Ocurrio un error en la creacion del usuario. Intentelo nuevamente.
                        </p>
                        <button
                            onClick={() => {
                                closeErrorConfirmation();
                            }}
                            className="bg-main-2 text-white px-4 py-2 rounded-md"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Register;