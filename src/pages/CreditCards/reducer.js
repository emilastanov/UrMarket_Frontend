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
}