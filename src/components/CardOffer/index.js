import React from "react";
import {Link} from "react-router-dom";

import './style.css';

const CardOffer = props => (
    <div className="offerCard">
        <div className="logotype" style={{backgroundImage: `url('${props.card.logotype}')`}}/>
        <div className="header">
            <h1>{props.card.title}</h1>
            <span>{props.card.card_type}</span>
        </div>
        <div className="conditions">
            <div className="condition">
                <span>Грейс период</span>
                <span>{props.card.grace_period} дней</span>
            </div>
            <div className="condition">
                <span>Кредитный лимит</span>
                <span>до {props.card.credit_limit} {props.card.amount_symbol}</span>
            </div>
            <div className="condition">
                <span>Обслуживание</span>
                <span>{props.card.service_payment === 0 ? "Бесплатно" : `${props.card.service_payment} ${props.card.amount_symbol}/год`}</span>
            </div>
            <div className="condition">
                <span>Ставка</span>
                <span>{props.card.rate}</span>
                <span>* После окончания грейс периода</span>
            </div>
            {props.card.salary.minimum_salary?<div className="condition">
                <span>Мин. заработная плата</span>
                <span>{props.card.salary.minimum_salary} {props.card.amount_symbol}</span>
            </div>:""}
            <div className="condition">
                <span>Снятие наличных</span>
                <span>{props.card.cash_withdrawal}</span>
            </div>
        </div>
        <div className="buttons">
            <a className="button" target="_blank" href={props.card.link}>Получить карту</a>
            <Link className="button inner" to={`cards/${props.card.id}`}>Подробнее</Link>
        </div>
    </div>
);

export default CardOffer;