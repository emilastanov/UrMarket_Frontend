import React, {useEffect, useState} from "react";

import CardSelector from "../../components/CardSelector";
import CardOfferList from "../../components/CardOfferList";
import FAQ from "../../components/FAQ";
import Reviews from "../../components/Reviews";
import CreditCardDetails from "../CreditCardDetails";

import './style.css';

import {creditCardOffersList, getCreditCardFilters, getCreditCardReviews, addCreditCardReview} from "./reducer";
import {getFAQ} from "../Main/reducer";
import {Route, useRouteMatch} from "react-router-dom";

const CreditCards = props => {

    let { path } = useRouteMatch();

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
    const [reviews, setReviews] = useState(null);

    const getCreditCardList = () => {
        creditCardOffersList(props.market, true).then(response=>{
            const creditCardsData = response.data.data.listCreditCardOffers.credit_cards;
            setCreditCards(creditCardsData.sort((a,b)=>(b.rating - a.rating)));
            setFilteredCreditCards(creditCardsData.sort((a,b)=>(b.rating - a.rating)))
        })
    };

    const getReviews = () => {
        getCreditCardReviews(props.market).then((response)=>{
            const reviews = response.data.data.listCreditCardReviews.reviews
            setReviews(reviews)

        })
    };


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
    };

    const setCreditCardFilters = () => {
        getCreditCardFilters(props.market).then(response=>{
            const filters = response.data.data.getCreditCardFilters.filters;
            setFilters(filters);
        })
    };

    const getFAQData = () => {
        getFAQ(props.market, 'cc').then(response=>{
            setFAQData(response.data.data.listFAQ.list_faq);
        })
    };

    useEffect(()=>{
        getFAQData();
        getCreditCardList();
        setCreditCardFilters();
        getReviews();
    }, [setCreditCards,setFilters]);

    return <React.Fragment>
        <Route path={`${path}/:card`}>
            <CreditCardDetails
                market={props.market}
            />
        </Route>
        <Route exact path={path}>
            <CardSelector
                filters={filters}
                amount={amount}
                setAmount={setAmount}
                period={period}
                setPeriod={setPeriod}
                cardType={cardType}
                setCardType={setCardType}
                freeService={freeService}
                setFreeService={setFreeService}
                forBusiness={forBusiness}
                setForBusiness={setForBusiness}
                filter={filterCreditCardOffers}
            />
            <CardOfferList
                creditCards={filteredCreditCards}
                setCreditCards={setFilteredCreditCards}
                badCreditCards={badCreditCards}
            />
            <FAQ
                questions={FAQData}
                header="Часто задаваемые вопросы"
            />
        </Route>
        <Reviews
            updateReviews={getReviews}
            market={props.market}
            data={props.reviewsData}
            isCard={true}
            offers={creditCards ? creditCards : [] }
            reviews={reviews ? reviews: []}
            addReview={addCreditCardReview}
        />
    </React.Fragment>
}

export default CreditCards;