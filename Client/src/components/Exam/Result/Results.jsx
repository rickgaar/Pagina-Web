import { useEffect, useState } from "react";
import { WhoAmI, endExam } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";


const Results =({points=0, questionSize=1, examID=''})=>{

    const navigate = useNavigate();

    const [horaInicio, setHoraInicio] = useState("")
    const getHoraInicio = async()=>{
        const response = await WhoAmI();
        const exam = response.examenes.find((e)=> e.examen == examID);
        setHoraInicio(exam.fecha_hora_inicio);
    }

    useEffect(()=>{getHoraInicio()},[]);

    const handleEnd = async()=>{
        const grade = (points * 10)/questionSize;
        await endExam(examID, horaInicio, grade);
        navigate('/board');
    }

    return(
        <section className="flex flex-col gap-3 items-center mt-5">
            <h2>Calificacion</h2>
            <p>{points} de { questionSize}</p>

            <br/>
            <button onClick={()=>{handleEnd()}} className="button-9 bg-main-3">Finalizar examen</button>
        </section>
    )
}

export default Results;