import { buyAvatar } from "../../../services/user.service";
import { WhoAmI } from "../../../services/user.service";
import { useState, useEffect } from "react";

const ShopItem = ({ item = {} }) => {
    const [userData, setUserData] = useState([]);

    const getData = async () => {
        const userData = await WhoAmI();
        setUserData(userData);
    }

    const buyItem = async (avatar, puntos) => {
            try {
                await buyAvatar(avatar, puntos);
                alert("Avatar comprado exitosamente.")
            } catch (error) {
                console.log(error);
                alert("Error al comprar el avatar");
            }
        
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col gap-2 border-2 rounded-md border-main-5 p-3 border-opacity-90 shopItem">
            <img className="w-52 h-52 bg-neutral-700 rounded-full object-cover" src={item.image} alt={item.name + "-image"} />
            <h3 className="text-lg text-gray-300">{item.name}<span className="font-normal ml-0"> - ${item.price}</span></h3>
            <button className="button-9 bg-main-2" role="button" onClick={() => buyItem(item.image, item.price)} >Comprar</button>
        </div>
    );
}

export default ShopItem;