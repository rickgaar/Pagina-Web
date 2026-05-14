import { useState } from "react";

export function useQuestions() {
    const [questionsArray, setQuestionsArray] = useState([]);

    const setQuestions = (_questions) => {
        setQuestionsArray(_questions);
    }

    return { questionsArray, setQuestions };
}
