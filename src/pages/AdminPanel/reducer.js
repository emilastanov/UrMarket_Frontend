import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const getMarkets = async () => {
    const data = JSON.stringify({
        "query": "query{listMarkets{markets{value,description,id,active}}}"
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