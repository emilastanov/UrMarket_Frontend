import React from "react";

import "./style.css";
import Filter from "../Filter";

const CardOfferList = props => {

    return <div className="card_offer_list">
        <Filter header={"Сортировать:"} filters={[
            {"name": "Тыц", "filter": ()=>{
                    console.log('CLICK')
                }}
        ]}/>
    </div>
}

export default CardOfferList;