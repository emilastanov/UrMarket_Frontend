import React from "react";

import './style.css';
import {Info} from '../icons';
import {useHistory} from "react-router-dom";

const Offer = props => {
    const history = useHistory();
    return  <div className="offer">
        <a href={props.link} target="_blank">
            <div className="logotype" style={{backgroundImage: `url("${props.image}")`}}/>
        </a>
        <div className={`wrapper ${props.isBad ? "badOffer" : ""}`}>
            <div className="amount">
                <span>{props.data? props.data.amount : ""}</span>
                <span>{props.amount.min} - {props.amount.max} {props.amount.symbol}</span>
            </div>
            <div className="time">
                <span>{props.data? props.data.time.title : ""}</span>
                <span>{props.time.max > 60 ? `до 24 ч` : `${props.time.min} - ${props.time.max} ${props.data? props.data.time.units : ""}`}</span>
            </div>
            <div className="term">
                <span>{props.data? props.data.term.title : ""}</span>
                <span>{props.term.min} - {props.term.max} {props.data? props.data.term.units : ""}</span>
            </div>
            <div className="rate">
                <span>{props.data? props.data.rate.title : ""}</span>
                <span>{props.data? props.data.rate.units : ""} {props.rate}%</span>
            </div>
            <div className="buttons">
                <a className="button" href={props.link} target="_black" onClick={()=>{window.gtag_report_conversion()}}>{props.data? props.data.button : ""}</a>
                <a className="button" onClick={()=>{
                    props.loader(true);
                    setTimeout(()=>{
                        history.push({pathname: `${props.market}/offer/${props.id}`});
                    },200)
                }}><Info size={window.innerWidth < 900? "S" : "L"}/></a>
            </div>
        </div>
    </div>
};

export default Offer;