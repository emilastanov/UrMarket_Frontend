import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const getCreditCardOffer = (id) => {
    const data = JSON.stringify({
        query: `query GetCreditCardOffer(
                $id: ID!
        ){
            getCreditCardOffer(
                id: $id
            ){
                credit_card{
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
            id: id
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