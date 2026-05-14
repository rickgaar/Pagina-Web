import { Link } from "react-router-dom";

const Lesson = ({lessonID='', lessonName = '', areaStudio = '', image = '' }) => {

    return (
        <section className='text-white flex gap-8 bg-main-3 rounded-md lesson p-4 relative'>
            <img src={image} className="w-40 h-40 rounded-full" />
            <div className="flex flex-col justify-center">
                <h2 className="font-bold text-3xl">{lessonName}</h2>
                <p className="text-lg">{areaStudio}</p>
            </div>
            <Link to={`/lesson/${lessonID}`} className="absolute inset-0 z-30">
                <span className="sr-only">Start lesson: {lessonName}</span>
            </Link>
        </section>
    );
}

export default Lesson;