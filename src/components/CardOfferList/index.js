import React from "react";

import "./style.css";
import Filter from "../Filter";
import CardOffer from "../CardOffer";

const CardOfferList = props => {

    return <div className="card_offer_list">
        <Filter header={"Сортировать:"} filters={[
            {"name": "По популярности", "filter": ()=>{
                    console.log('CLICK')
                }},
            {"name": "По сумме", "filter": ()=>{
                    console.log('CLICK')
                }},
            {"name": "По грейс периоду", "filter": ()=>{
                    console.log('CLICK')
                }},
            {"name": "По ставке", "filter": ()=>{
                    console.log('CLICK')
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