import React from "react";

import "./style.css";
import Filter from "../Filter";
import CardOffer from "../CardOffer";

const CardOfferList = props => {

    return <div className="card_offer_list">
        <Filter header={"Сортировать:"} filters={[
            {"name": "Тыц", "filter": ()=>{
                    console.log('CLICK')
                }}
        ]}/>
        <div className="list">
            <CardOffer/>
            <CardOffer/>
            <CardOffer/>
            <CardOffer/>
            <CardOffer/>
            <CardOffer/>
            <CardOffer/>
        </div>
    </div>
}

export default CardOfferList;