
const Controls = ({ onNext = () => { }, position = 1 }) => {
    return (

        <section className="flex justify-center items-center gap-10 pb-6">

            <button className="cursor-pointer next">  <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" /></svg> </button>

            <h3 className="font-bold text-2xl"> Pregunta {position} </h3>

            <button className="cursor-pointer prev" onClick={() => { onNext(); }}> <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg> </button>

        </section>

    );
}

export default Controls;