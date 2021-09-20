import React from "react";

import './style.css';

const Offer = props => (
    <div className="offer">
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
            <a className="button" href={props.link} target="_black" onClick={()=>{window.gtag_report_conversion()}}>{props.data? props.data.button : ""}</a>
        </div>
    </div>
);

export default Offer;