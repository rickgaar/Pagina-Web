import { useEffect, useState } from "react";
import { WhoAmI, getLessons } from "../../services/user.service";
import { rankingPosition } from "../../services/user.service";
import Header from "../Header/Header";
import AvatarsPurchased from "./AvatarsPurchased/AvatarsPurchased";

const Profile = () => {

    const [userData, setUserData] = useState([]);
    const [position, setPosition] = useState([]);
    const [numLessons, setNumLessons] = useState();

    const getData = async () => {
        const userData = await WhoAmI();
        setUserData(userData);
    }

    const getRankingPosition = async () => {
        const position = await rankingPosition();
        setPosition(position);
    }

    const getAllLessons = async () => {
        const numLessons = await getLessons();
        setNumLessons(numLessons.length);
    };

    const porcentajeLecciones = () => {
        let porcentaje = 0;
        if (
            userData &&
            userData.lecciones &&
            Array.isArray(userData.lecciones)
        ) {
            const leccionesTerminadas = userData.lecciones.filter((lecciones) => lecciones.fecha_hora_fin !== null);

            if (leccionesTerminadas.length > 0) {
                porcentaje = leccionesTerminadas.length / numLessons;
            }
            return porcentaje * 100;
        }

    }

    useEffect(() => {
        getData();
        getRankingPosition();
        getAllLessons();
    }, []);

    return (
        <section>
            <Header />
            <section className="flex flex-col gap-16 items-center">
                <div className="flex flex-row gap-8 justify-center p-8 items-center mt-8">
                    <figure className="w-64 h-64 rounded-full overflow-hidden">
                        <img src={userData.avatar_actual} alt="Profile Picture" className="w-full h-full object-cover" />
                    </figure>
                    <div className="font-link text-white text-3xl flex flex-col gap-4">
                        <p className="font-bold"> Usuario: {userData.nombre} </p>
                        <p> Email: {userData.correo} </p>
                        <p> Saldo: {userData.puntos_canjeables} puntos </p>
                        <p> Puntos totales: {userData.puntos_totales} puntos </p>
                        <p> Puesto en el ranking: {position.rankingPosition + 1} </p>
                    </div>
                </div>
                <div>
                    <p className="font-link text-white text-3xl mb-8"> Tu porcentaje en las lecciones es de: {porcentajeLecciones()}% </p>

                    <progress id="progress-bar" value={porcentajeLecciones()} max={100} className="w-full h-10"></progress>
                </div>
                <p className="text-link text-white text-xl">Avatares comprados:</p>
                <section className="flex gap-4">
                   {/*  {
                        userData.avatares_disponibles.map((_a) => ( <AvatarsPurchased avatar={_a} /> ))
                    } */}
                </section>
            </section>
        </section>
    );
}

export default Profile;