
const StaticItems = ({getList = ()=>{}, itemType = "", draggingOver=()=>{}, onDrop=()=>{}, startDrag=()=>{}, item=""}) => {
    return (
        <div className="flex flex-col gap-1 bg-main-3 rounded p-4 items-center">

            <h2 className="font-bold text-lg">{item}</h2>
            <div className="bg-main-5 flex gap-2 justify-center py-2 px-2 min-w-min-box max-w-xs h-10" droppable="true" onDragOver={(evt) => { draggingOver(evt) }} onDrop={(evt) => { onDrop(evt, itemType) }}>
                {getList(itemType).map(obj => (
                    <div key={obj.id} className="bg-main-3 rounded p-1 font-bold" draggable onDragStart={(evt) => { startDrag(evt, obj) }}>
                        <p>{obj.descripcion}</p>
                    </div>
                ))
                }
            </div>

        </div>
    );
}

export default StaticItems;