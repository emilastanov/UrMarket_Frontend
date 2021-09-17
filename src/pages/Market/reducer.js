import axios from "axios";

const API_URL = 'https://api.urmarket.online/';


export const addMarket = (key, value, description) => {
    const data = JSON.stringify({
        "query": `mutation AddMarket(
            $value: String!,
            $description: String!
            ){
                addMarket(
                    value: $value,
                    description: $description
                ){
                    market {
                        value,
                        description,
                        id
                    }
                }
            }`,
        "variables": {
            value: value,
            description: description
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
};

export const removeMarket = (key, id) => {
    const data = JSON.stringify({
        "query": `mutation RemoveMarket(
            $id: Int!
            ){
                removeMarket(
                    id: $id
                ){
                    success
                }
            }`,
        "variables": {
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