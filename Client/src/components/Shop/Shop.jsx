import { useState } from "react";
import ShopItem from "./ShopItem/ShopItem";
import Header from "../Header/Header";

const Shop = () => {
    const [avatars, setAvatars] = useState([
        {
            name: "Obamium",
            image: "https://i.ytimg.com/vi/UuKwLlevL6Y/maxresdefault.jpg",
            price: "50"
        },
        {
            name: "Baljeet",
            image: "https://i.ytimg.com/vi/sntGta76v6Y/hqdefault.jpg",
            price: "75"
        },
        {
            name: "Supreme Victory",
            image: "https://ih1.redbubble.net/image.927011542.5911/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            price: "100"
        },
        {
            name: "Isaac",
            image: "https://i.redd.it/8e983932ajs61.png",
            price: "50"
        }
    ])
    return (
        <section>
            <Header />
            <section className="text-center text-white flex justify-center flex-col gap-16 items-center">
                <h2 className="pt-9 text-5xl text-main-2 font-medium">Avatares</h2>
                <div className="flex justify-center px-4 gap-6 flex-wrap max-w-7xl">
                    {avatars.map((e) => <ShopItem key={e.name} item={e} />)}
                </div>
            </section>
        </section>
    );
}

export default Shop;