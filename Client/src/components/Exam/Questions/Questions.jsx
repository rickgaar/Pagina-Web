import { useEffect, useState } from "react";

const Questions = ({ _q = '', _a = {}, sortedAnswers = [], getPoint=()=>{}}) => {

    const [selectedItem, setSelectedItem] = useState({ Selected: null });

    useEffect(()=>{selectedItem.Selected = null},[_a])

    const algo = (item) => {
        if(selectedItem.Selected != null && selectedItem.Selected != _a && item == _a){
            return 'limegreen';
        }
        if (item != selectedItem.Selected) {
            return 'transparent';
        }
        if (item === selectedItem.Selected && selectedItem.Selected != _a) {
            return 'red';
        }
        if (item === selectedItem.Selected && selectedItem.Selected === _a) {
            return 'limegreen';
        }
    }

    const handleClick = (e) => () =>{ 
            setSelectedItem({ Selected: e })
            if(e == _a){
                getPoint();
            }
        }
    
    return (
        <section className="flex flex-col items-center">
            <h2>{_q}</h2>
            <section className="grid-cols-2 grid gap-6 w-80 p-6">

                {sortedAnswers.map((e) => 
                    
                    <button disabled={selectedItem.Selected != null} key={e._id} onClick={handleClick(e)} 
                    className={`p-1 rounded`} 
                    style={{ backgroundColor: algo(e) }}>
                    {e.descripcion}</button>

                )}

            </section>
        </section>

    );
}

export default Questions;