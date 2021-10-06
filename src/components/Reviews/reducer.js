import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const addReview_reducer = (market, name, text, rating, company) => {
    const data = JSON.stringify({
        "query": `mutation AddReview($name: String!, $text: String!, $company: Int!, $rating: Int!, $market: String!){addReview(name:$name,text:$text,company:$company,rating:$rating,market:$market){success}}`,
        'variables': {
            name: name,
            text: text,
            company: parseInt(company, 10),
            rating: parseInt(rating, 10),
            market: market
        }
    })

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