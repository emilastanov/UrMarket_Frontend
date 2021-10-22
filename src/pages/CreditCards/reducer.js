import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const creditCardOffersList = (market, main=false) => {

    const data = JSON.stringify({
        "query": `query CreditCardOffersList(
            $market: String!
            $main: Boolean!
        ){
            listCreditCardOffers(
                market: $market
                main: $main
            ){
                credit_cards{
                    id
                    title
                    cash_withdrawal
                    card_type
                    logotype
                    link
                    is_show
                    amount_symbol
                    rating
                    market
                    description
                    grace_period
                    rate
                    service_payment
                    credit_limit
                    credit_docs
                    age{
                      min
                      max
                    }
                    only_individual
                    minimum_work_experience
                    minimum_current_work_experience
                    salary {
                      minimum_salary
                      minimum_salary_main_regions
                      main_regions
                    }
                }
            }
        }`,
        variables: {
            market: market,
            main: main
        }
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config);
};


export const getCreditCardFilters = (market) => {
    const data = JSON.stringify({
        query: `query GetCreditCardFilters(
            $market: String!
        ){
            getCreditCardFilters(market: $market){
                filters {
                    amount {
                        min
                        max
                    }
                    grace_period {
                        min
                        max
                    }
                    card_types
                }
            }
        }`,
        variables: {
            market: market
        }
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config);
};

export const getCreditCardReviews = async (market) => {
    const data = JSON.stringify({
        "query": `query GetCreditCardReviews(
            $market: String!
        ){
            listCreditCardReviews(
                market: $market
            ){
                reviews {
                    id
                    name
                    text
                    rating
                    card {
                        title
                    }
                }
            }
        }`,
        variables: {
            market: market
        }
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config);
};

export const addCreditCardReview = (market, name, text, rating, card) => {
    const data = JSON.stringify({
        query: `mutation AddCreditCardReview(
                    $name: String!
                    $market: String!
                    $text: String!
                    $rating: Int!
                    $card: Int!
                  ){
                      addCreditCardReview(
                        name: $name
                        market: $market
                        text: $text
                        rating: $rating
                        card: $card
                      ){
                        success
                      }
                    }`,
        variables: {
            market: market,
            name: name,
            text: text,
            rating: rating,
            card: parseInt(card,10)
        }
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config);
};