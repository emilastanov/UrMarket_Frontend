import React, {useEffect, useState} from "react";

import {getOffer_reducer} from "./reducer";
import {useParams} from "react-router-dom";

import './style.css';

const OfferDetails = props => {

    const [offerData, setOfferData] = useState(null);

    let {offer} = useParams();

    const getOffer = () => {
        getOffer_reducer(offer).then(response=>{
            setOfferData(response.data.data.getOffer.offer);
            props.loader(false)
        })
    }

    useEffect(()=>{
        if (!offerData) {getOffer();}
        console.log(props.content)
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
    </div>: ""
}

export default OfferDetails;