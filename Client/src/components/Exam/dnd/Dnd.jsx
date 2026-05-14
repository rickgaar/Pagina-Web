import { useEffect, useState } from "react";
import StaticItems from "./StaticItems/StaticItems";

const Dnd = ({ dndData = {}, getPoint=()=>{} }) => {

  const [respuestas, setRespuestas] = useState([]);

  const [staticItem, setStaticItem] = useState([]);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => { handleData(); setDisabled(false) }, [dndData]);

  const handleData = () => {
    if (Object.keys(dndData) != 0) {
      const _items = dndData.respuesta.filter((item) => item.descripcion.charAt(0) === '¿');
      const _draggableItems = dndData.respuesta.filter((item) => item.descripcion.charAt(0) != '¿');
      const draggableItems = _draggableItems.map((e) => {
        return ({
          id: e._id,
          descripcion: e.descripcion,
          tipo: e.tipo,
          selectedColumn: 0
        });
      });
      const items = _items.map((e) => {
        return ({
          id: e._id,
          descripcion: e.descripcion,
          tipo: e.tipo
        });
      });
      setRespuestas(draggableItems);
      setStaticItem(items);
    }
  }

  const _getPoint = ()=>{
    if(respuestas.filter((e)=> e.tipo != e.selectedColumn).length == 0){
      getPoint();
    }
    console.log(respuestas.filter((e)=> e.tipo != e.selectedColumn).length);
    setDisabled(true);
  }

  const getList = (Column) => {
    return respuestas.filter(item => item.selectedColumn === Column)
  }

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item.id)
    //console.log(item);
  }

  const draggingOver = (evt) => {
    evt.preventDefault();
  }

  const onDrop = (evt, list, answerContainer = true) => {
    if (answerContainer) {
      let hasItem = respuestas.find(item => item.selectedColumn == list);
      if (hasItem == undefined) {

        const itemID = evt.dataTransfer.getData('itemID');
        const item = respuestas.find(item => item.id == itemID);
        item.selectedColumn = list;

        const newState = respuestas.map(obj => {
          if (obj.id == itemID) return item;
          return obj
        });
        setRespuestas(newState)
      } else {

        const itemID = evt.dataTransfer.getData('itemID');
        const item = respuestas.find(item => item.id == itemID);
        hasItem.selectedColumn = item.selectedColumn;
        item.selectedColumn = list;

        const newState = respuestas.map(obj => {
          if (obj.id == itemID) return item;
          if (obj.id == hasItem.id) return hasItem;
          return obj
        });
        setRespuestas(newState)
      }
    }
    else {

      const itemID = evt.dataTransfer.getData('itemID');
      const item = respuestas.find(item => item.id == itemID);
      item.selectedColumn = list;

      const newState = respuestas.map(obj => {
        if (obj.id == itemID) return item;
        return obj
      });

      setRespuestas(newState)

    }
  }

  return (
    <section className="text-center py-4">
      <div>
        <div className="flex flex-col gap-4">
          <h3>Arrastra la respuesta que corresponda a la pregunta</h3>
          <br />
          <div className="flex gap-3 justify-center">

            {staticItem.map((e) => { return (<StaticItems getList={getList} itemType={e.tipo} onDrop={onDrop} draggingOver={draggingOver} startDrag={startDrag} item={e.descripcion} />) })}

          </div>
          <div className="bg-main-5 flex gap-2 justify-center py-2 px-2 h-16" droppable="true" onDragOver={(evt) => { draggingOver(evt) }} onDrop={(evt) => { onDrop(evt, 0, false) }}>
            {getList(0).map(obj => (
              <div key={obj.id} className="bg-main-3 rounded p-1 flex items-center" draggable onDragStart={(evt) => { startDrag(evt, obj) }}>
                <p>{obj.descripcion}</p>
              </div>
            ))
            }
          </div>
        </div>
      </div>

      <br />

      <button className="button-9 bg-main-3" onClick={()=>{_getPoint()}} disabled={disabled}>Resolver match</button>

    </section>
  );
}

export default Dnd;