const RankingCard = ( {position={}, avatar={}, name={}, points={}}) => {
        return (
            <article className="flex flex-row gap-20 items-center font-link text-white text-2xl bg-main-2 w-2/5 px-8 py-4 rounded-md">
                <p>{position}°</p>
                <figure className="w-24 h-24 overflow-hidden rounded-full">
                    <img src={avatar} alt="Profile Photo" className="w-full h-full object-cover" />
                </figure>
                <p>{name}</p>
                <p>Puntos: {points}</p>
            </article>
        );
    
};

export default RankingCard