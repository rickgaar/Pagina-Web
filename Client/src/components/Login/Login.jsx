import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginUser } from "../../services/user.service";

const Login = () => {
    const [userIdentifier, setUserIdentifier] = useState();
    const [userPassword, setUserPassword] = useState();
    const [showErrorConfirmation, setShowErrorConfirmation] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await LoginUser(userIdentifier, userPassword);
            setShowConfirmation(true);
        } catch (error) {
            console.log(error);
            setShowErrorConfirmation(true);
        }
    };
    
    const handleIdentifierChange = (e) => {
        setUserIdentifier(e.target.value);
    };
    
    const handleLoginPasswordChange = (e) => {
        setUserPassword(e.target.value);
    };
    
    const closeConfirmation = () => {
        setShowConfirmation(false);
        navigate("/board");
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
                <p className="text-3xl font-bold">Inicio de sesión</p>

                <form className="flex flex-col gap-8 w-96" onSubmit={handleSubmit}>
                    <p>Usuario o correo electrónico</p>
                    <input id="identifier" name="identifier" type="text" placeholder="Ingrese su usuario o su correo electrónico" onChange={handleIdentifierChange} className="text-black w-full h-8 p-2"></input>
                    <p>Contraseña</p>
                    <input id="password" name="password" type="password" placeholder="Ingrese su contraseña" onChange={handleLoginPasswordChange} className="text-black w-full h-8 p-2"></input>
                    <button type="submit" className="bg-main-2 p-4 rounded-full font-bold"> Iniciar sesión </button>

                    <p>¿No está registrado? Registrese <a href="/register">aquí</a>.</p>
                </form>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md" style={{ color: "black" }}>
                        <p className="text-lg font-semibold mb-4">
                            Inicio de sesión exitoso.
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

            {showErrorConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md text-black">
                        <p className="text-lg font-semibold mb-4">
                            No se pudo realizar el inicio de sesión. Por favor verifique sus credenciales.
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

export default Login;