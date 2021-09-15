import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const addFaq = (key, question, answer, language, market) => {
    const data = JSON.stringify({
        "query": `mutation addNewFAQ($language:String!,$market:String!,$answer:String!,$question:String!){addFAQ(language:$language,market:$market,answer:$answer,question:$question){success}}`,
        "variables": {
            language: language,
            market: market,
            answer: answer,
            question:question
        }
    })

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        },
        data : data
    };

    return axios(config);
}

export const removeFaq = (key, id) => {
    const data = JSON.stringify({
        query: `mutation RemoveFAQById($id: ID!){
            removeFAQ(id: $id){
                success
            }
        }`,
        variables: {
            id: id
        }
    })

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        },
        data : data
    };

    return axios(config);
}