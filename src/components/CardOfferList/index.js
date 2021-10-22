import React from "react";

import "./style.css";
import Filter from "../Filter";
import CardOffer from "../CardOffer";

const CardOfferList = props => {

    return <div className="card_offer_list">
        <Filter header={"Сортировать:"} filters={[
            {"name": "По популярности", "filter": ()=>{
                    let offers = [...props.creditCards];
                    offers = offers.sort((a,b)=>(b.rating - a.rating));
                    props.setCreditCards(offers);
                }},
            {"name": "По сумме", "filter": ()=>{
                    let offers = [...props.creditCards];
                    offers = offers.sort((a,b)=>(b.credit_limit - a.credit_limit));
                    props.setCreditCards(offers);
                }},
            {"name": "По грейс периоду", "filter": ()=>{
                    let offers = [...props.creditCards];
                    offers = offers.sort((a,b)=>(b.grace_period - a.grace_period));
                    props.setCreditCards(offers);
                }},
            {"name": "По ставке", "filter": ()=>{
                    let offers = [...props.creditCards];
                    offers = offers.sort((a,b)=>(a.rate - b.rate));
                    props.setCreditCards(offers);
                }}
        ]}/>
        <div className="list">
            {props.creditCards && props.creditCards.map((item,key)=>(
                <CardOffer card={item} key={key}/>
            ))}
        </div>
        {props.badCreditCards && props.badCreditCards.length > 0 ?
            <React.Fragment>
                <h1 className="bad_cards_title">Эти карты не подходят под выбранные условия.</h1>
                <div className="list bad_cards">
                    {props.badCreditCards.map((item,key)=>(
                        <CardOffer card={item} key={key}/>
                    ))}
                </div>
            </React.Fragment>
            : ""}
    </div>
}

export default CardOfferList;