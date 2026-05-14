import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const sortRandom = (Answers) => {
    return [...Answers].sort(() => Math.random() < 0.5 ? 1 : -1);
}