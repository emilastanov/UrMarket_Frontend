import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Calculator from "../../Calculator";
import OffersList from "../../OffersList";
import TopTable from "../../TopTable";
import FAQ from "../../FAQ";
import Reviews from "../../Reviews";
import Footer from "../../Footer";
import Header from "../../Header";

import {getContent, getFAQ, getLanguages, getOffers, getReviews} from "./reducer.js"
import {useLocation, useParams} from "react-router-dom";
import {getMarkets} from "../AdminPanel/reducer";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Main = props => {

    const [content, setContent] = useState(null);
    const [offers, setOffers] = useState(null);
    const [offersData, setOffersData] = useState(null);
    const [faq, setFaq] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [filters, setFilters] = useState({amount: null, term: null})
    const [languages, setLanguages] = useState([]);

    const history = useHistory();
    let {market} = useParams();
    let query = useQuery();


    const language = query.get("language")? query.get("language") : "ru"

    const updateReviews = () => {
        getReviews(market).then((response)=>{
            const reviews = response.data.data.listReviews.reviews

            setReviews(reviews)

        })
    }

    useEffect(()=>{
        getMarkets().then((response)=>{
            const existMarket = response.data.data.listMarkets.markets.map((item)=>(item.value));
            if (existMarket.indexOf(market) !== -1) {
                getContent(market, language).then((response)=>{
                    const data = response.data.data.getContent;
                    setContent(data.content)

                    document.title = data.content.title;
                });
                getLanguages(market).then(response=>{
                    const data = response.data.data.listContent.contents.map(item=>(item.language));

                    setLanguages(data)
                });
                getOffers(market, true).then((response)=>{
                    const offers = response.data.data.listOffers.offers;

                    setOffers(offers.sort((a,b)=>(a.rating.min - b.rating.min)));
                    setOffersData(offers.sort((a,b)=>(a.rating.min - b.rating.min)))

                    props.loader(false)
                });
                getFAQ(market, language).then((response)=>{
                    const FAQ = response.data.data.listFAQ.list_faq;

                    setFaq(FAQ);

                });
                updateReviews()
            } else {
                history.push({
                    pathname: "/404",
                    search: `?markets=${existMarket}`
                })
            }
        })
    }, [setContent, language])

    useEffect(()=>{
        if (offers) {
            let filteredOffers = offersData;
            if (filters.amount) {
                filteredOffers = filteredOffers.filter(item=>(item.amount.min <= filters.amount && item.amount.max >= filters.amount))
            }
            if (filters.term){
                filteredOffers = filteredOffers.filter(item=>(item.term.min <= filters.term && item.term.max >= filters.term))
            }
            setOffers(filteredOffers)
        }

    }, [filters])


    return content ? <React.Fragment>
        <Header
            changeLanguage={market !== 'ru'}
            language={{selected: language, languages: languages}} change={()=>{
                props.loader(true)
                history.push({
                    search: `?language=${languages.filter(item=>item!==language)[0]}`
                })
        }} />
        <Calculator
            header={content ? content.header : ""}
            description={content ? content.description: ""}
            amount = {content ? content.calc.amount: ""}
            term = {content ? content.calc.term : ""}
            button = {content ? content.calc.button : ""}
            ads = {content ? content.ads : ""}
            count_offers = {offers ? offers.length : 0}
            setFilters = {setFilters}
            offers={offersData}
        />
        <OffersList
            offers={offers? offers : []}
            filter={content? content.filter: null}
            offersData={offersData ? offersData : []}
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
            updateReviews={updateReviews}
            market={content ? content.market : null}
            data={content ? content.review : null}
            offers={offers? offers: []}
            reviews={reviews? reviews: []}
        />
        <Footer data={content ? content.footer : null} partners={offers ? offers.map((item)=> (item.title)) : []}/>
    </React.Fragment> : ''
};

export default Main;