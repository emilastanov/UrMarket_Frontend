import React, {useState} from 'react';

import './style.css';

const Dialog = (props) => {

    const [market, setMarket] = useState(props.selectedMarket);
    const [dialogShowed, setDialogShowed] = useState(true);
    const [selectorShowed, setSelectorShowed] = useState(false);

    return <div className="dialog_msg" style={{display: dialogShowed ? "block" : "none", height: selectorShowed ? 155 : 110}} >
        {selectorShowed ?
            <React.Fragment>
                <h1 className="title">Выберите страну:</h1>
                <select onChange={(item)=>{
                    setMarket(item.target.value)
                }} defaultValue={props.selectedMarket}>
                    {props.markets.map((item,key)=>(
                        <option key={key} value={item.value}>{item.description}</option>
                    ))}
                </select>
            </React.Fragment>
             :
            <h1 className="title">Ваша страна <b>{props.markets.filter(item=>(item.value === props.selectedMarket))[0].description}</b>?</h1>
        }
        <div className="button_wrapper">
            <a onClick={()=>{
                localStorage.setItem('market', market);
                if (selectorShowed){
                    window.location = `/${market}`
                }
                else {setDialogShowed(false);}
            }} className="button">{selectorShowed ? "Выбрать" : "Да"}</a>
            <a style={{display: selectorShowed ? "none": "auto"}} onClick={()=>{
                setSelectorShowed(true)

            }} className="button">Выбрать</a>
        </div>
    </div>
};

export default Dialog;