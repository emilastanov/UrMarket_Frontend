import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const addReview_reducer = (market, name, text, rating, company) => {
    const data = JSON.stringify({
        "query": `mutation{addReview(name:"${name}",text:"${text}",company:${company},rating:${rating},market:"${market}"){success}}`
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