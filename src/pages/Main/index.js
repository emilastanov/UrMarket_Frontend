import React, {useEffect, useState} from "react";

import Calculator from "../../Calculator";
import OffersList from "../../OffersList";
import TopTable from "../../TopTable";
import FAQ from "../../FAQ";
import Reviews from "../../Reviews";
import Footer from "../../Footer";
import Header from "../../Header";

import {getContent, getFAQ, getOffers, getReviews} from "./reducer.js"
import {useLocation, useParams} from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Main = props => {

    const [content, setContent] = useState(null);
    const [offers, setOffers] = useState(null);
    const [faq, setFaq] = useState(null);
    const [reviews, setReviews] = useState(null);
    let {market} = useParams();
    let query = useQuery();

    market = market ? market : "ua"

    const language = query.get("language")? query.get("language") : "ru"

    useEffect(()=>{
        getContent(market, language).then((response)=>{
            const data = response.data.data.getContent;
            setContent(data.content)

            document.title = data.content.title;
        });
        getOffers(market).then((response)=>{
            const offers = response.data.data.listOffers.offers;

            setOffers(offers);

            props.loader(false)
        });
        getFAQ(market, language).then((response)=>{
            const FAQ = response.data.data.listFAQ.list_faq;

            setFaq(FAQ);

        });
        getReviews(market).then((response)=>{
            const reviews = response.data.data.listReviews.reviews

            setReviews(reviews)

        })
    }, [setContent])



    return <React.Fragment>
        <Header language={{selected: "ru", languages: ["ru", "ua"]}} change={()=>{console.log("CLICK")}} />
        <Calculator
            header={content ? content.header : ""}
            description={content ? content.description: ""}
            amount = {content ? content.calc.amount: ""}
            term = {content ? content.calc.term : ""}
            button = {content ? content.calc.button : ""}
            ads = {content ? content.ads : ""}
            count_offers = {offers ? offers.length : 0}
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
            updateReviews={getReviews}
            market={content ? content.market : null}
            data={content ? content.review : null}
            offers={offers? offers: []}
            reviews={reviews? reviews: []}
        />
        <Footer data={content ? content.footer : null} partners={offers ? offers.map((item)=> (item.title)) : []}/>
    </React.Fragment>
};

export default Main;