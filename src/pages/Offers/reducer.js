import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const offerSwitcher = async (key, id, state) => {
    const data = JSON.stringify({
        "query": `mutation{updateOffer(id: ${id}, isShow: ${state}){offer{id,is_show}}}`
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": key
        },
        data : data
    };

    return axios(config);
}

export const addOffer = async (key, title,description,logotype,link,rate,isShow,amountMin,amountMax,amountSymbol,
                         termMin,termMax,rating,processingTimeMin,processingTimeMax,processingMethods,requirementsAgeMin,
                         requirementsAgeMax,requirementsIncome,requirementsIncomeProof,requirementsDocuments,
                         requirementsUkrainNationality,requirementsSpecial,market) => {
    const data = JSON.stringify({
        "query": `mutation{addOffer(title: "${title}",description: "${description}",logotype: "${logotype}",link: "${link}",rate: ${rate},isShow: ${isShow},amountMin: ${amountMin},amountMax: ${amountMax},amountSymbol: "${amountSymbol}",termMin: ${termMin},termMax: ${termMax},rating: ${rating},processingTimeMin: ${processingTimeMin},processingTimeMax: ${processingTimeMax},processingMethods: "${processingMethods}",requirementsAgeMin: ${requirementsAgeMin},requirementsAgeMax: ${requirementsAgeMax},requirementsIncome: ${requirementsIncome},requirementsIncomeProof: ${requirementsIncomeProof},requirementsDocuments: "${requirementsDocuments}",requirementsUkrainNationality: ${requirementsUkrainNationality},requirementsSpecial: "${requirementsSpecial}", market: "${market}"){offer{id,is_show}}}`
    })

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": key
        },
        data : data
    };

    return axios(config);

}

export const uploadImg = async (img) => {
    const formData = new FormData();

    formData.append(
        "image",
        img
    );

    return axios.post(`${API_URL}image`, formData);
}

export const removeOffer = async (key, id) => {
    const data = JSON.stringify({
        "query": `mutation{removeOffer(id: ${id}){success}}`
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": key
        },
        data : data
    };

    return axios(config);
}

