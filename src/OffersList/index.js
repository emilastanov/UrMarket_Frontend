import React, {useEffect, useState} from "react";

import './style.css';

import Filter from "../components/Filter";
import Offer from "../components/Offer";


const OffersList = props => {

    const [offers, setOffers] = useState(null)

    useEffect(()=>{
        setOffers(props.offers)
    }, [setOffers, props.offers])

    return <div className="offersList">
        <Filter header={props.filter ? props.filter.header : ""} filters={[
            {"name": props.filter ? props.filter.amount : "", "filter": ()=>{
                    let sortedOffers = [...offers]
                    sortedOffers = sortedOffers.sort((a,b)=>(b.amount.min - a.amount.min))
                    setOffers(sortedOffers)
                }},
            {"name": props.filter ? props.filter.term : "", "filter": ()=>{
                    let sortedOffers = [...offers]
                    sortedOffers = sortedOffers.sort((a,b)=>(b.term.max - a.term.max))
                    setOffers(sortedOffers)
                }},
            {"name": props.filter ? props.filter.rate : "", "filter": ()=>{
                    let sortedOffers = [...offers]
                    sortedOffers = sortedOffers.sort((a,b)=>(a.rate - b.rate))
                    setOffers(sortedOffers)
                }},
            {"name": props.filter ? props.filter.popular : "", "filter": ()=>{
                    let sortedOffers = [...offers]
                    sortedOffers = sortedOffers.sort((a,b)=>(b.rating - a.rating))
                    setOffers(sortedOffers)
                }}
        ]}/>
        <div className="list">
            {offers ? offers.filter((a)=>(a.is_show)).map((item,key)=>(
                <Offer
                    data={props.card}
                    key={key}
                    image={item.logotype}
                    link={item.link}
                    amount={item.amount}
                    term={item.term}
                    time={item.processing_time}
                    rate={item.rate}
                />
            )) : ""}
        </div>
    </div>
};

export default OffersList;