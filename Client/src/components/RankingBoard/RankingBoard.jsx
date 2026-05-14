import { getRanking } from "../../services/user.service";
import RankingCard from "./RankingCard/RankingCard";
import { rankingPosition } from "../../services/user.service";
import { useEffect, useState } from "react";
import Header from "../Header/Header";

const RankingBoard = () => {
    const [data, setRankingArray] = useState([]);
    const [position, setPosition] = useState([]);

    const fetch = async () => {
        let data = await getRanking();
        setRankingArray(data.ranking);
    };

    const getRankingPosition = async () => {
        const position = await rankingPosition();
        setPosition(position);
    }

    useEffect(() => {
        fetch();
        getRankingPosition();
    }, []);

    return (
        <section>
            <Header />
            <section className="flex flex-col gap-4 items-center pt-10">
                {
                    data.map((_d, index) => (
                        <RankingCard key={_d.nombre} position={index + 1} avatar={_d.avatar_actual} name={_d.nombre} points={_d.puntos_totales} />
                    ))
                }
                <p className="font-link text-white text-xl">Tu posición: {position.rankingPosition + 1}</p>
            </section>
        </section>
    );
};

export default RankingBoard;