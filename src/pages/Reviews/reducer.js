import axios from "axios";

const API_URL = 'https://api.urmarket.online/';


export const removeReview = (key, id) => {
    const data = JSON.stringify({
        "query": `mutation RemoveReview($id: ID!){removeReview(id:$id){success}}`,
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