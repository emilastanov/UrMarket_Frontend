import React from "react";

import './style.css';

import Filter from "../components/Filter";
import Offer from "../components/Offer";


const OffersList = props => {

    return <div className="offersList">
        <Filter filters={[
            {"name": "По сумме"},
            {"name": "По сроку"},
            {"name": "По ставке"},
            {"name": "По популярности"}
        ]}/>
        <div className="list">
            {props.offers.map((item,key)=>(
                <Offer
                    key={key}
                    image="https://urmarket.online/static/credit7Adv.png"
                    link="#"
                    amount={{min: 5, max: 10, symbol: 'p'}}
                    term={{min: 1, max: 5}}
                    time={{min:5, max:15}}
                    rate={0.1}
                />
            ))}
        </div>
    </div>
};

export default OffersList;