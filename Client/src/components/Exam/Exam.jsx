import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getExam } from "../../services/user.service";
import { useCurrentQuestions } from "../../hooks/useCurrentQuestions";
import Questions from "./Questions/Questions";
import Controls from "./Controls/Controls";
import Dnd from "./dnd/Dnd";
import Results from "./Result/Results";
import Header from "../Header/Header";

const Exam = () => {
    const { examID } = useParams();
    const [exam, setExam] = useState({})
    const { currentQuestion, sortedAnswers, position, onPageChange, setQuestions } = useCurrentQuestions();
    const grade = useRef(0)

    const getPoint = ()=>{
        grade.current = grade.current + 1;
    }

    useEffect(() => { _getExam() }, [])
    useEffect(() => {
        if (Object.keys(exam) != 0) {
            setQuestions(exam.preguntas)
        }
    }, [exam])

    const _getExam = async () => {
        const _exam = await getExam(examID);
        setExam(_exam);
    }

    return (
        <section>
            <Header/>
            {Object.keys(exam) != 0 &&

                <section className="flex flex-col pt-5 gap-3 items-center text-white py-8 h-screen">
                    {position <= exam.preguntas.length &&
                        <section className="flex flex-col pt-5 gap-3 items-center">

                            <Controls onNext={() => { onPageChange(1) }} position={position} />
                            {(currentQuestion.length != 0 && currentQuestion.tipo === "multiple") ? <Questions _q={currentQuestion.pregunta.enunciado} _a={currentQuestion.pregunta.respuesta.find((e) => e.correcta == true)} sortedAnswers={sortedAnswers} key={currentQuestion._id} getPoint={getPoint}/> : <Dnd dndData={currentQuestion.pregunta} getPoint={getPoint}/>}

                        </section>
                    }
                    {position > exam.preguntas.length && <Results examID={examID} points={grade.current} questionSize={exam.preguntas.length}/>}
                </section>}

        </section>
    );
}

export default Exam;