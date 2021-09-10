import axios from "axios";

const API_URL = 'https://api.urmarket.online/';


export const userList = (key) => {
    const data = JSON.stringify({
        "query": `query{listUsers{users{id,name,key,permission}}}`
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

export const addNewUser = (key, name, role) => {
    const data = JSON.stringify({
        "query": `mutation{addUser(name:"${name}",permission:"${role}"){success}}`
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

export const deleteUser = (key, id) => {
    const data = JSON.stringify({
        "query": `mutation{removeUser(id:"${id}"){success}}`
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