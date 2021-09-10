import React from "react";

import './style.css';

import Filter from "../components/Filter";
import Offer from "../components/Offer";


const OffersList = props => {

    return <div className="offersList">
        <Filter header={props.filter ? props.filter.header : ""} filters={[
            {"name": props.filter ? props.filter.amount : ""},
            {"name": props.filter ? props.filter.term : ""},
            {"name": props.filter ? props.filter.rate : ""},
            {"name": props.filter ? props.filter.popular : ""}
        ]}/>
        <div className="list">
            {props.offers.filter((a)=>(a.is_show)).map((item,key)=>(
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
            ))}
        </div>
    </div>
};

export default OffersList;