import React, {useEffect, useState} from "react";

import './style.css';

import Filter from "../components/Filter";
import Offer from "../components/Offer";


const OffersList = props => {

    const [offers, setOffers] = useState(null)
    const [badOffers, setBadOffers] = useState(null)

    useEffect(()=>{
        setOffers(props.offers)
        if (props.offers.length !== props.offersData.length) {
            setBadOffers(props.offersData.filter((item)=>(props.offers.indexOf(item) < 0)))
        } else {
            setBadOffers(null)
        }
    }, [setOffers, props.offers])

    return <div className="offersList" >
        <Filter header={props.filter ? props.filter.header : ""} filters={[
            {"name": props.filter ? props.filter.amount : "", "filter": ()=>{
                    let sortedOffers = [...offers]
                    sortedOffers = sortedOffers.sort((a,b)=>(b.amount.min - a.amount.min))
                    setOffers(sortedOffers)
                }},
            // {"name": props.filter ? props.filter.term : "", "filter": ()=>{
            //         let sortedOffers = [...offers]
            //         sortedOffers = sortedOffers.sort((a,b)=>(b.term.max - a.term.max))
            //         setOffers(sortedOffers)
            //     }},
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
        <div className="list" id="offersList">
            {offers ? offers.filter((a)=>(a.is_show)).map((item,key)=>(
                <Offer
                    id={item.id}
                    data={props.card}
                    key={key}
                    image={item.logotype}
                    link={item.link}
                    amount={item.amount}
                    term={item.term}
                    time={item.processing_time}
                    rate={item.rate}
                    market={item.market}
                    loader={props.loader}
                />
            )) : ""}
        </div>
        {badOffers && badOffers.length > 0 ? <h1 className="badOffersTitle">Эти предложения не подходят под ваши условия</h1> : ""}
        <div className="list">
            {badOffers ? badOffers.filter((a)=>(a.is_show)).map((item,key)=>(
                <Offer
                    id={item.id}
                    isBad={true}
                    data={props.card}
                    key={key}
                    image={item.logotype}
                    link={item.link}
                    amount={item.amount}
                    term={item.term}
                    time={item.processing_time}
                    rate={item.rate}
                    market={item.market}
                    loader={props.loader}
                />
            )) : ""}
        </div>
    </div>
};

export default OffersList;