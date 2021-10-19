import React, {useEffect, useState} from "react";

import CardSelector from "../../components/CardSelector";
import CardOfferList from "../../components/CardOfferList";
import FAQ from "../../components/FAQ";
import Reviews from "../../components/Reviews";

import './style.css';

import {creditCardOffersList, getCreditCardFilters} from "./reducer";
import {getFAQ} from "../Main/reducer";

const CreditCards = props => {

    const [creditCards, setCreditCards] = useState(null);
    const [filteredCreditCards, setFilteredCreditCards] = useState(null);
    const [badCreditCards, setBadCreditCards] = useState(null);
    const [filters, setFilters] = useState(null);
    const [amount, setAmount] = useState(null);
    const [period, setPeriod] = useState(null);
    const [cardType, setCardType] = useState(null);
    const [freeService, setFreeService] = useState(false);
    const [forBusiness, setForBusiness] = useState(false);
    const [FAQData, setFAQData] = useState(null);

    const getCreditCardList = () => {
        creditCardOffersList(props.market, true).then(response=>{
            const creditCardsData = response.data.data.listCreditCardOffers.credit_cards;
            setCreditCards(creditCardsData.sort((a,b)=>(a.rating.min - b.rating.min)));
            setFilteredCreditCards(creditCardsData.sort((a,b)=>(a.rating.min - b.rating.min)))
        })
    }

    const filterCreditCardOffers = () => {
        let cc = creditCards;
        cc = cc.filter((item)=>(item.credit_limit >= amount));
        cc = cc.filter((item)=>(item.grace_period >= period));
        if (cardType && cardType !== "0"){
            cc = cc.filter((item)=>(item.card_type === cardType));
        }
        if (freeService){
            cc = cc.filter((item)=>(item.service_payment === 0));
        }
        if (forBusiness){
            cc = cc.filter((item)=>(item.only_individual === false));
        }
        setFilteredCreditCards(cc);
        setBadCreditCards(creditCards.filter(item=>(cc.indexOf(item) < 0)));
    }

    const setCreditCardFilters = () => {
        getCreditCardFilters(props.market).then(response=>{
            const filters = response.data.data.getCreditCardFilters.filters;
            setFilters(filters);
        })
    }

    const getFAQData = () => {
        getFAQ(props.market, 'cc').then(response=>{
            setFAQData(response.data.data.listFAQ.list_faq);
        })
    }

    useEffect(()=>{
        getFAQData()
        getCreditCardList();
        setCreditCardFilters();
    }, [setCreditCards,setFilters])

    return <React.Fragment>
        <CardSelector
            filters={filters}
            amount={amount}
            setAmount={setAmount}
            period={period}
            setPeriod={setPeriod}
            cardType={cardType}
            setCardType={setCardType}
            freeService={freeService}
            setFreeSevice={setFreeService}
            forBusiness={forBusiness}
            setForBusiness={setForBusiness}
            filter={filterCreditCardOffers}
        />
        <CardOfferList
            creditCards={filteredCreditCards}
            badCreditCards={badCreditCards}
        />
        <FAQ
            questions={FAQData}
            header="Часто задаваемые вопросы"
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