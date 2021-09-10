import axios from "axios";

const API_URL = 'https://api.urmarket.online/';


export const login = (key) => {
    const data = JSON.stringify({
        "query": `query{login(key:"${key}"){success,errors,user{id,name,permission,key}}}`
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
};