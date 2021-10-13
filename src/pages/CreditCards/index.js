import React, {useEffect, useState} from "react";

import CardSelector from "../../components/CardSelector";
import CardOfferList from "../../components/CardOfferList";
import TopTable from "../../components/TopTable";
import FAQ from "../../components/FAQ";
import Reviews from "../../components/Reviews";

import './style.css';

import {creditCardOffersList} from "./reducer";

const CreditCards = props => {

    const [creditCards, setCreditCards] = useState(null);
    const [badCreditCards, setBadCreditCards] = useState(null);

    const getCreditCardList = () => {
        creditCardOffersList(props.market, true).then(response=>{
            const creditCardsData = response.data.data.listCreditCardOffers.credit_cards;
            setCreditCards(creditCardsData.sort((a,b)=>(a.rating.min - b.rating.min)));
            setBadCreditCards(creditCardsData.sort((a,b)=>(a.rating.min - b.rating.min)))
        })
    }

    useEffect(()=>{
        getCreditCardList();
        console.log(badCreditCards);
    }, setCreditCards)

    return <React.Fragment>
        <CardSelector />
        <CardOfferList creditCards={creditCards}/>
        <TopTable
            header=""
            columns={{}}
            offers={[]}
        />
        <FAQ
            questions={null}
            header={""}
        />
        <Reviews
            updateReviews={()=>{}}
            market={null}
            data={null}
            offers={[]}
            reviews={[]}
        />
    </React.Fragment>
}

export default CreditCards;