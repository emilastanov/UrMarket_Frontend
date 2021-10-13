import React from "react";

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
                <span>Льготный период</span>
                <span>{props.card.grace_period} дней</span>
            </div>
            <div className="condition">
                <span>Кредитный лимит</span>
                <span>до {props.card.credit_limit} {props.card.amount_symbol}</span>
            </div>
            <div className="condition">
                <span>Обслуживание</span>
                <span>{props.card.service_payment === 0 ? "Беслпатно" : `${props.card.service_payment} ${props.card.amount_symbol}/год`}</span>
            </div>
            <div className="condition">
                <span>Ставка</span>
                <span>от {props.card.rate}%</span>
                <span>* После льготного периода</span>
            </div>
            <div className="condition">
                <span>Мин. заработная плата</span>
                <span>{props.card.salary.minimum_salary} {props.card.amount_symbol}</span>
            </div>
            <div className="condition">
                <span>Коммиссия на снятие</span>
                <span>{props.card.cash_withdrawal}</span>
            </div>
        </div>
        <div className="buttons">
            <div className="button">Получить решение</div>
            <div className="button inner">Подробнее</div>
        </div>
    </div>
);

export default CardOffer;