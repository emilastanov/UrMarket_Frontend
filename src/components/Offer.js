import React from "react";

import './style.css';

const Offer = props => (
    <div className="offer">
        <a href={props.link} target="_blank">
            <div className="logotype" style={{backgroundImage: `url("${props.image}")`}}/>
        </a>
        <div className="wrapper">
            <div className="amount">
                <span>Сумма</span>
                <span>{props.amount.min} - {props.amount.max} {props.amount.symbol}</span>
            </div>
            <div className="time">
                <span>Время</span>
                <span>{props.time.min} - {props.time.max} мин</span>
            </div>
            <div className="term" >
                <span>Срок</span>
                <span>{props.term.min} - {props.term.max} дней</span>
            </div>
            <div className="rate" >
                <span>Ставка</span>
                <span>от {props.rate}%</span>
            </div>
            <a className="button" href={props.link} target="_black">получить
                решение</a>
        </div>
    </div>
);

export default Offer;