import React, {useEffect, useState} from "react";

import Calculator from "../../Calculator";
import OffersList from "../../OffersList";
import TopTable from "../../TopTable";
import FAQ from "../../FAQ";
import Reviews from "../../Reviews";
import Footer from "../../Footer";

import {getContent, getFAQ, getOffers, getReviews} from "./reducer.js"


const Main = props => {

    const [content, setContent] = useState(null);
    const [offers, setOffers] = useState(null);
    const [faq, setFaq] = useState(null);
    const [reviews, setReviews] = useState(null);

    useEffect(()=>{
        getContent(props.market, props.language).then((response)=>{
            const data = response.data.data.getContent;
            setContent(data.content)

            console.log(data);

            document.title = data.content.title;
            document.createElement('meta')

        });
        getOffers(props.market).then((response)=>{
            const offers = response.data.data.listOffers.offers;

            console.log(offers);

            setOffers(offers);
        });
        getFAQ(props.market, props.language).then((response)=>{
            const FAQ = response.data.data.listFAQ.list_faq;

            console.log(FAQ);

            setFaq(FAQ);
        });
        getReviews(props.market).then((response)=>{
            const reviews = response.data.data.listReviews.reviews

            console.log(reviews)

            setReviews(reviews)
        })
    }, [setContent])



    return <React.Fragment>
        <Calculator
            header={content ? content.header : ""}
            description={content ? content.description: ""}
            amount = {content ? content.calc.amount: ""}
            term = {content ? content.calc.term : ""}
            button = {content ? content.calc.button : ""}
            ads = {content ? content.ads : ""}
        />
        <OffersList
            offers={offers? offers : []} filter={content? content.filter: null}
            card={content ? content.offer : null}
        />
        <TopTable
            header={content ? content.top.title : ""}
            columns={content ? content.top.table_columns : ""}
            offers={offers? offers.sort((a,b)=>(b.rating - a.rating)).slice(0,5) : []}
        />
        <FAQ
            questions={faq ? faq : null}
            header={content ? content.faq_header : ""}
        />
        <Reviews
            data={content ? content.review : null}
            offers={offers? offers: []}
            reviews={reviews? reviews: []}
        />
        <Footer data={content ? content.footer : null} partners={offers ? offers.map((item)=> (item.title)) : []}/>
    </React.Fragment>
};

export default Main;