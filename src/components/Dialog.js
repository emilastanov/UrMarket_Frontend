import React, {useState} from 'react';

import './style.css';

const Dialog = (props) => {

    const [market, setMarket] = useState(props.selectedMarket);

    return <div className="dialog_msg">
        <h1 className="title">Выберете страну.</h1>
        <select onChange={(item)=>{
            setMarket(item.target.value)
        }} defaultValue={props.selectedMarket}>
            {props.markets.map((item,key)=>(
                <option key={key} value={item.value}>{item.description}</option>
            ))}
        </select>
        <div className="button_wrapper">
            <a onClick={()=>{
                localStorage.setItem('market', market);
                window.location = `/${market}`
            }} className="button">Выбрать</a>
        </div>
    </div>
};

export default Dialog;