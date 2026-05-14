import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./SideBar/SideBar";
import Header from "../Header/Header";
import { endLesson, endTopic, getLessons } from "../../services/user.service";

const LessonDisplay = () => {
    const { lessonID } = useParams();
    const [lessons, setLessons] = useState();
    const [selectedTopics, setselectedTopics] = useState([]);
    const [topicIndex, setTopicIndex] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const getAllLessons = async () => {
        const _lessons = await getLessons();
        setLessons(_lessons);
    };

    const getSelectedLesson = () => {
        if (lessons != undefined) {
            const _selectedLesson = lessons.find(e => e._id == lessonID)
            setselectedTopics(_selectedLesson?.temas);
        }
        setTopicIndex(0);
    };

    const handleEndTopic = async(topicID) => {
        await endTopic(topicID);
        await endLesson(lessonID);
        setDisabled(true);
    }

    const setIndex = (index) => {
        setTopicIndex(index);
    }

    useEffect(() => {
        getAllLessons();
    }, []);

    useEffect(() => { getSelectedLesson()}, [lessons, lessonID]);

    useEffect(()=>{setDisabled(false)}, [topicIndex]);

    return (
        <section>
            <Header />
            <section className="grid h-screen">
                {lessons != undefined && <Navbar SidebarData={lessons} lessonID={lessonID} setTopicIndex={setIndex} />}
                <section className="text-white mt-11 flex justify-center">
                    {selectedTopics.length != 0 &&
                        <section className="text-center flex flex-col gap-4 items-center w-full mt-8">
                            <h2 className="text-3xl font-semibold">{selectedTopics[topicIndex]?.nombre}</h2>
                            <p className="w-2/4 text-base">{selectedTopics[topicIndex]?.contenido}</p>
                            <br/>
                            <button onClick={()=>{handleEndTopic(selectedTopics[topicIndex]._id)}} className="button-9 bg-main-3" id="btntopic" disabled={disabled}>Finalizar tema</button>
                        </section>
                    }
                </section>
            </section>
        </section>
    );

}

export default LessonDisplay;