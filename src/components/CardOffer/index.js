import React from "react";

import './style.css';

const CardOffer = props => (
    <div className="offerCard">
        <div className="logotype" style={{backgroundImage: "url('https://pngimg.com/uploads/credit_card/credit_card_PNG109.png')"}}/>
        <div className="header">
            <h1>Кредитная карта Тинькофф</h1>
            <span>MasterCard Standard</span>
        </div>
        <div className="conditions">
            <div className="condition">
                <span>Льготный период</span>
                <span>55 дней</span>
            </div>
            <div className="condition">
                <span>Кредитный лимит</span>
                <span>до 700 000 р</span>
            </div>
            <div className="condition">
                <span>Обслуживание</span>
                <span>Бесплатно</span>
                <span>* При тратах от 5000 р / мес</span>
            </div>
            <div className="condition">
                <span>Ставка</span>
                <span>от 4.5%</span>
                <span>* После льготного периода</span>
            </div>
            <div className="condition">
                <span>Мин. заработная плата</span>
                <span>12 000 р</span>
            </div>
            <div className="condition">
                <span>Коммиссия на снятие</span>
                <span>2.4%</span>
            </div>
        </div>
        <div className="buttons">
            <div className="button">Получить решение</div>
            <div className="button inner">Подробнее</div>
        </div>
    </div>
);

export default CardOffer;