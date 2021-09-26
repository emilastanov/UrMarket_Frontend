import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {getOffer_reducer} from "./reducer";

import {Done} from "../../icons";

import './style.css';

const OfferDetails = props => {

    const [offerData, setOfferData] = useState(null);

    let {offer} = useParams();

    const getOffer = () => {
        getOffer_reducer(offer).then(response=>{
            setOfferData(response.data.data.getOffer.offer);
            props.loader(false);
            console.log(response.data.data.getOffer.offer)
        })
    }

    useEffect(()=>{
        if (!offerData) {getOffer();}
    },[setOfferData])

    return offerData ? <div className="offerDetails">
        <h1 className="header">{offerData.title}</h1>
        <div className="image">
            <img src={offerData.logotype} alt=""/>
        </div>
        <div className="conditions">
            <div className="condition">
                <span>
                    {props.content.amount}
                </span>
                <span>
                    {offerData.amount.min} {offerData.amount.symbol} - {offerData.amount.max} {offerData.amount.symbol}
                </span>
            </div>
            <div className="condition">
                <span>
                    {props.content.term.title}
                </span>
                <span>
                    {offerData.term.min} - {offerData.term.max} {props.content.term.units}
                </span>
            </div>
            <div className="condition">
                <span>
                    {props.content.rate.title}
                </span>
                <span>
                    {props.content.rate.units} {offerData.rate}%
                </span>
            </div>
        </div>
        <p className="description">{offerData.description}</p>
        <ul className="requirements">
            <li><Done/>Получение: <span>{offerData.processing_methods.join(', ')}</span></li>
            <li><Done/>Рассмотрение: <span>до {offerData.processing_time.max} {props.content.time.units}</span></li>
            <li><Done/>Документы: <span> {offerData.requirements.documents.join(', ')}</span></li>
            <li><Done/>Возраст: <span>от {offerData.requirements.age.min} до {offerData.requirements.age.max} лет</span></li>
        </ul>
        <hr/>
        <a href={offerData.link} className="button">получить деньги</a>
    </div>: ""
}

export default OfferDetails;