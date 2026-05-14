import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_API_URL}`;
let userToken = '';

const getConfig = () => {
    return {
        headers: { Authorization: `Bearer ${userToken}` }
    };
};


export const createUser = async (nombre, correo, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, { nombre, correo, password });
        return response.data;
    } catch (error) {
        console.error('Error al realzar la petición: ', error);
        throw new Error("Error while creating the user. Please try again.")
    }
};

export const LoginUser = async (identifier, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { identifier, password });
        userToken = response.data.token;
        console.log(userToken);
        return response.data;
    } catch (error) {
        console.error('Error al realzar la petición: ', error);
        throw new Error("Error while the login. Please try again.")
    }
};


export const WhoAmI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/whoami`, getConfig());
        /* console.log(response.data); */
        return response.data;
    } catch (error) {
        console.error('Error al realzar la petición: ', error);
        throw new Error("Error while getting the data. Please try again.")
    }
};

export const rankingPosition = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/rankingPosition`, getConfig());
        /* console.log(response.data); */
        return response.data;
    } catch (error) {
        console.error('Error al realzar la petición: ', error);
        throw new Error("Error while getting the data. Please try again.")
    }
};

export const getRanking = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/ranking`);
        /* console.log(response.data); */
        return response.data;
    } catch (error) {
        console.error('Error al realzar la petición: ', error);
        throw new Error("Error while getting the data. Please try again.")
    }
};

export const startLesson = async (lessonID) => {
    const lessonAxios = axios.create({
        baseURL: `${BASE_URL}`,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    try {
        const response = await lessonAxios.patch(`/lesson/begin/${lessonID}`)
        /* console.log(response.data); */
        if (response.status === 200) return true;
        else return undefined;
    } catch (error) {
        console.log('La leccion ya ha sido iniciada');
    }
}

export const startTopic = async (topicID) => {
    const topicAxios = axios.create({
        baseURL: `${BASE_URL}`,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    try {
        const response = await topicAxios.patch(`/tema/begin/${topicID}`)
        /* console.log(response.data); */
        if (response.status === 200) return true;
        else return undefined;
    } catch (error) {
        console.log('El tema ya ha sido iniciada');
    }
}

export const endTopic = async (topicID) => {
    const topicAxios = axios.create({
        baseURL: `${BASE_URL}`,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    try {
        const response = await topicAxios.patch(`/tema/end/${topicID}`)
        /* console.log(response.data); */
        if (response.status === 200) return true;
        else return undefined;
    } catch (error) {
        console.log('El tema ya ha sido iniciada');
    }
}

export const startExam = async (examID) => {
    const examAxios = axios.create({
        baseURL: `${BASE_URL}`,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    try {
        const response = await examAxios.patch(`/exam/begin/${examID}`)
        /* console.log(response.data); */
        if (response.status === 200) return true;
        else return undefined;
    } catch (error) {
        console.log('El examen ya ha sido iniciada');
    }
}

export const endExam = async (examID, fecha_hora_inicio, calificacion) => {
    try {
        const response = await axios.patch(`${BASE_URL}/exam/end/${examID}`, { fecha_hora_inicio, calificacion }, getConfig())
        /* console.log(response.data); */
        if (response.status === 200) return true;
        else return undefined;
    } catch (error) {
        console.log('El examen ya ha sido finalizado');
    }
}

export const endLesson = async (lessonID) => {


    const topicAxios = axios.create({
        baseURL: `${BASE_URL}`,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    try {
        const responseTopics = await axios.get(`${BASE_URL}/lesson/topics/${lessonID}`)
        const responseExams = await axios.get(`${BASE_URL}/lesson/exams/${lessonID}`)
        const userData = await WhoAmI();

        let allLessonsCompleted = 0;
        let allExamsCompleted = 0;

        responseExams.data.examenes.map((e) => {
            userData.examenes.map((i) => {
                if (i._id == e._id && i.fecha_hora_fin != null) {
                    allExamsCompleted = allExamsCompleted + 1;
                }
            })
        });
        responseTopics.data.temas.map((e) => {
            userData.temas.map((i) => {
                if (i._id == e._id && i.fecha_hora_fin != null) {
                    allLessonsCompleted = allLessonsCompleted + 1;
                }
            })
        });

        if (allExamsCompleted == responseExams.data.examenes.length && allLessonsCompleted == responseTopics.data.temas.length) {
            const response = await topicAxios.patch(`/lesson/end/${lessonID}`)
            /* console.log(response.data); */
            if (response.status === 200) return true;
            else return undefined;
        }

    } catch (error) {
        console.log('Ocurrio un error');
    }
}

export const buyAvatar = async(avatar, puntos) => {
    try {
        const response = await axios.patch(`${BASE_URL}/buyAvatar`,{avatar, puntos}, getConfig())
        if (response.status === 200) {
            return true;
        }else{return undefined;}
    } catch (error) {
        console.error('Error al realzar la petición: ', error);
        throw new Error("Error while getting the data. Please try again.")
    }
};

export const changeAvatar = async () => {
    try {
        const response = await axios.patch(`${BASE_URL}/changeAvatar`,{avatar}, getConfig())
        if (response.status === 200) {
            return true;
        }else{return undefined;}
    } catch (error) {
        console.error('Error al realzar la petición: ', error);
        throw new Error("Error while getting the data. Please try again.")
    }
};

const sortRandom = (Answers) => {
    return [...Answers].sort(() => Math.random() < 0.5 ? 1 : -1);
}

export const getExam = async (examID) =>{
    const response = await axios.get(`${BASE_URL}/exam/${examID}`, getConfig());
    const examData = response.data.exam;
    const preguntasMultiple = examData.Pregunta_opcion_multiple.map((e)=>{return({
        tipo: "multiple",
        pregunta: e
    })})
    const preguntasMatch = examData.Pregunta_match.map((e)=>{return({
        tipo: "match",
        pregunta: e
    })})
    const examTemplate = {
        id: examData._id,
        preguntas: sortRandom([...preguntasMultiple, ...preguntasMatch])
    }
    return (examTemplate);
}

export const getLessons = async () =>{
    const response = await axios.get(`${BASE_URL}/lesson`, getConfig());
    return (response.data.leccion);
}
