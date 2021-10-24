import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import './style.css';

import {getCreditCardOffer} from "./reducer";

const CreditCardDetails = props => {

    const [creditCard, setCreditCard] = useState(null);
    let {card} = useParams();

    useEffect(()=>{
        getCreditCardOffer(card).then(response=>{
            setCreditCard(response.data.data.getCreditCardOffer.credit_card);
        })
    }, [setCreditCard]);

    return <div className="credit_card_offer">
        <div className="header">
            <div className="credit_card">
                <h5 className="card_type">{creditCard && creditCard.card_type}</h5>
                <h1 className="title">{creditCard && creditCard.title}</h1>
                <div className="logotype">
                    <img src={creditCard && creditCard.logotype} alt="logo"/>
                </div>
                <p className="description">{creditCard && creditCard.description}</p>
                <a className="button" target="_blank" href={creditCard && creditCard.link}>Получить карту</a>
            </div>
        </div>
        <div className="requirements_wrapper">
            <div className="requirements_card">
                <h1 className="title">Условия кредитования</h1>
                <div className="requirements">
                    <div className="requirement">
                        <h2 className="title">Тип карты</h2>
                        <ul className="condition">
                            <li>{creditCard && creditCard.card_type}</li>
                        </ul>
                    </div>
                    <div className="requirement">
                        <h2 className="title">Кредитный лимит</h2>
                        <ul className="condition">
                            <li>До {creditCard && creditCard.credit_limit} {creditCard && creditCard.amount_symbol}</li>
                        </ul>
                    </div>
                    <div className="requirement">
                        <h2 className="title">Годовое обслуживание</h2>
                        <ul className="condition">
                            <li>
                                {creditCard && creditCard.service_payment} {creditCard && creditCard.amount_symbol}/мес
                                <span>Обслуживание бесплатно при сумме покупок от 10 000 р/мес.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="requirement">
                        <h2 className="title">Кешбэк</h2>
                        <ul className="condition">
                            <li>
                                До 10%
                                <span>Кешбек начисляется бонусами, которые можно тратить в магазинах партнеров.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="requirement">
                        <h2 className="title">Льготный период</h2>
                        <ul className="condition">
                            <li>
                                До {creditCard && creditCard.grace_period} дней
                                <span>Льготный период начинается с расчетного дня, который можно выбрать при оформлении карты.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="requirement">
                        <h2 className="title">Ставка по истечению льготного периода</h2>
                        <ul className="condition">
                            <li>
                                От {creditCard && creditCard.rate}% в год
                            </li>
                        </ul>
                    </div>
                    <div className="requirement">
                        <h2 className="title">Требования</h2>
                        <ul className="condition">
                            <li>
                                <span>Возраст</span>
                                от {creditCard && creditCard.age.min} до {creditCard && creditCard.age.max} лет
                            </li>
                            <li>
                                <span>Стаж работы на последнем месте</span>
                                от {creditCard && creditCard.minimum_current_work_experience} лет
                            </li>
                            <li>
                                <span>Общий трудовой стаж</span>
                                от {creditCard && creditCard.minimum_work_experience} лет
                            </li>
                            <li>
                                <span>Документы</span>
                                {creditCard && JSON.parse(creditCard.credit_docs).join(', ')}
                            </li>
                            <li>
                                <span>Минимальный доход</span>
                                {creditCard && creditCard.salary.minimum_salary}* р/мес
                                <span>*Минимальный доход для регионов {creditCard && creditCard.salary.main_regions}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default CreditCardDetails;