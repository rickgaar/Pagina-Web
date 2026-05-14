import { useEffect, useState } from "react";
import { sortRandom } from "../services/exams.service";

export function useCurrentQuestions(){
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [position, setPosition] = useState(1);
    const [sortedAnswers, setSortedAnswers] = useState([]);
    const [questionsArray, setQuestions] = useState([]);

    useEffect(
        () => {
            if(questionsArray.length != 0){
                setPosition(1);
                setCurrentQuestion(questionsArray[0]);
                setSortedAnswers(sortRandom(questionsArray[0].pregunta.respuesta));
            }
        }
        , [questionsArray]
    );
    useEffect(
        () => {if(position<=questionsArray.length){
            updateCurrentQuestion(position - 1) }
        },
        [position]);

    useEffect(
        () => {

            if (currentQuestion.length != 0) {
                setSortedAnswers(sortRandom(currentQuestion.pregunta.respuesta));
            }

        }, [currentQuestion]
    );

    const updateCurrentQuestion = (pos) => {
        setCurrentQuestion(questionsArray[pos])
    }

    const onPageChange = (_page = 0) => {

        let _position = position + _page;

        if (_position <= 0) {
            _position = 1;
        }

        setPosition(_position);
    }

    return {currentQuestion, sortedAnswers, position , onPageChange, setQuestions};
}