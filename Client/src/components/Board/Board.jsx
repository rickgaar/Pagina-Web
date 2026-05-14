import { useEffect, useState } from 'react';
import Lesson from './Lesson/Lesson';
import { getLessons } from '../../services/user.service';
import { WhoAmI } from '../../services/user.service';
import Header from '../Header/Header';


const Board = () => {
    const [userData, setUserData] = useState([]);
    const [lessons, setLessons] = useState(null);
    const [numLessons, setNumLessons] = useState();

    const getAllLessons = async () => {
        const _lessons = await getLessons();
        setLessons(_lessons);
    }

    const getNumLessons = async () => {
        const numLessons = await getLessons();
        setNumLessons(numLessons.length);
    };

    const getData = async () => {
        const userData = await WhoAmI();
        setUserData(userData);
    }

    const porcentajeLecciones = () => {
        let porcentaje = 0;
        if (
            userData &&
            userData.lecciones &&
            Array.isArray(userData.lecciones)
        ) {
            const leccionesTerminadas = userData.lecciones.filter((lecciones) => lecciones.fecha_hora_fin !== null);

            if (leccionesTerminadas.length > 0) {
                porcentaje = leccionesTerminadas.length / numLessons;
            }
            return porcentaje * 100;
        }

    }

    useEffect(() => { getAllLessons(); getNumLessons(); getData(); }, [])

    return (
        <section>
            <Header />
            <section className='flex justify-center mb-16'>
                <section className='w-3/5'>
                    <h2 className='text-center font-bold text-5xl text-main-2 my-9'>Lecciones</h2>

                    <div className="w-full bg-gray-200 rounded-full">
                        <div className="bg-main-4 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-full" style={{ width: `${porcentajeLecciones()}%` }}>{porcentajeLecciones()}%</div>
                    </div>

                    <section className='text-white grid grid-cols-1 justify-center gap-6 mt-8'>
                        {lessons != null &&

                            lessons.map((e) => { if (e.visibilidad) return (<Lesson key={e._id} lessonID={e._id} lessonName={e.nombre} areaStudio={e.area_estudio} image={e.imagen} />) })

                        }
                    </section>
                </section>
            </section>
        </section>
    );
}

export default Board;