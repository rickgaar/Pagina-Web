import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { startExam, startLesson, startTopic } from "../../../services/user.service";

function Navbar({ SidebarData = [], lessonID = '', setTopicIndex = () => {}}) {
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();

    const startNewLesson = async () => {
        await startLesson(lessonID);
    }

    const startNewExam = async (examID) => {
        await startExam(examID);
    }

    const handdleStartLesson = (route) =>{
        startNewLesson();
        navigate(route);
    } 

    const handdleStartExam = (route, examID) =>{
        startNewExam(examID);
        navigate(route);
    } 

    const handleStartTopic = async(topicID, index) => {
        await startTopic(topicID);
        setTopicIndex(index);
    }

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="navbar text-white">
                <Link to="#" className="menu-bars">
                    <div onClick={showSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
                    </div>
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items text-white" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" /></svg>
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className="my-3">
                                <div className="nav-text text-left">
                                    <button onClick={() => {handdleStartLesson(`/lesson/${item._id}`)}}>
                                        <span className="text-lg font-semibold">{item.nombre}</span>
                                    </button>
                                </div>
                                <ul className="list-disc ml-20 mt-1 navbar-topics-content">
                                    {item._id == lessonID && item.temas.map((e, index) => { return <li className="cursor-pointer py-1" key={e._id}><button onClick={() => { handleStartTopic(e._id, index) }}>{e.nombre}</button></li> })}
                                    {item._id == lessonID && item.examenes.map((e, index) => { return <li className="cursor-pointer py-1" key={e._id}><button onClick={()=>{handdleStartExam(`/exam/${e}`, e)}}>Examen {index + 1}</button></li>})}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;