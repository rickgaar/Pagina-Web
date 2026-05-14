import { NavLink } from "react-router-dom";
import { WhoAmI } from "../../services/user.service";
import { useState, useEffect } from "react";

const Header = () => {
    const [userData, setUserData] = useState([]);

    const getData = async () => {
        const userData = await WhoAmI();
        setUserData(userData);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <header className="w-full bg-main-2 flex flex-row justify-around">
            <NavLink to="/board">
                <figure className="w-60 h-40 overflow-hidden">
                    <img src="https://i.ibb.co/jTTB2yd/logo-rojo.png" alt="Logo" className="w-full h-full object-cover" />
                </figure>
            </NavLink>

            <div className="flex flex-row gap-28">
                <div className="flex flex-row gap-2 items-center">
                    <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg>
                    <NavLink to="/board">
                        <p className="text-xl text-white font-link">Tablero</p>
                    </NavLink>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z" /></svg>
                    <NavLink to="/ranking">
                        <p className="text-xl text-white font-link">Ranking</p>
                    </NavLink>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                    <NavLink to="/shop">
                        <p className="text-xl text-white font-link">Tienda</p>
                    </NavLink>
                </div>
            </div>

            <div className="flex flex-row items-center gap-10">
                <p className="text-xl text-white font-link">Tus puntos: {userData.puntos_canjeables}</p>
                <NavLink to="/profile">
                    <figure className="w-28 h-28 rounded-full overflow-hidden">
                        <img src={userData.avatar_actual} alt="Profile Picture" className="w-full h-full object-cover" />
                    </figure>
                </NavLink>
                <NavLink to="/">
                    <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                </NavLink>
            </div>
        </header>
    );
}

export default Header;