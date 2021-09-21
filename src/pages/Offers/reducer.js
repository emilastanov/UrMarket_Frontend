import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const offerSwitcher = async (key, id, state) => {
    const data = JSON.stringify({
        "query": `mutation SetOfferState(
            $id: ID!,
            $isShow: Boolean!
        ){updateOffer(id: $id, isShow: $isShow){offer{id,is_show}}}`,
        variables: {
            id: id,
            isShow: state
        }
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

export const addOrUpdateOffer = async (key, values, edit) => {
    const data = JSON.stringify({
        "query": `mutation AddOffer(
            ${edit ? "$id: ID!" : ""}
            $title: String!,
            $description: String!,
            $logotype: String,
            $link: String!,
            $rate: Float!,
            $isShow: Boolean!,
            $amountMin: Int!,
            $amountMax: Int!,
            $amountSymbol: String!,
            $termMin: Int!,
            $termMax: Int!,
            $rating: Int!,
            $processingTimeMin: Int!,
            $processingTimeMax: Int!,
            $processingMethods: String!,
            $requirementsAgeMin: Int!,
            $requirementsAgeMax: Int!,
            $requirementsIncome: Int!,
            $requirementsIncomeProof: Boolean!,
            $requirementsDocuments: String!,
            $requirementsUkrainNationality: Boolean!,
            $requirementsSpecial: String!, 
            $market: String!
        ){
            ${edit ? "updateOffer" : "addOffer"}(
                ${edit ? "id: $id" : ""}
                title: $title
                description: $description
                logotype: $logotype
                link: $link
                rate: $rate
                isShow: $isShow
                amountMin: $amountMin
                amountMax: $amountMax
                amountSymbol: $amountSymbol
                termMin: $termMin
                termMax: $termMax
                rating: $rating
                processingTimeMin: $processingTimeMin
                processingTimeMax: $processingTimeMax
                processingMethods: $processingMethods
                requirementsAgeMin: $requirementsAgeMin
                requirementsAgeMax: $requirementsAgeMax
                requirementsIncome: $requirementsIncome
                requirementsIncomeProof: $requirementsIncomeProof
                requirementsDocuments: $requirementsDocuments
                requirementsUkrainNationality: $requirementsUkrainNationality
                requirementsSpecial: $requirementsSpecial
                market: $market
            ){
                offer{id,is_show}
            }
        }`,
        variables: {
            id: parseInt(values.id, 10),
            title: values.title,
            description: values.description,
            logotype: values.logotype,
            link: values.link,
            rate: parseFloat(values.rate),
            isShow: values.isShow,
            amountMin: parseInt(values.amountMin,10),
            amountMax: parseInt(values.amountMax, 10),
            amountSymbol: values.amountSymbol,
            termMin: parseInt(values.termMin, 10),
            termMax: parseInt(values.termMax, 10),
            rating: parseInt(values.rating,10),
            processingTimeMin: parseInt(values.processingTimeMin,10),
            processingTimeMax: parseInt(values.processingTimeMax,10),
            processingMethods: values.processingMethods,
            requirementsAgeMin: parseInt(values.requirementsAgeMin, 10),
            requirementsAgeMax: parseInt(values.requirementsAgeMax,10),
            requirementsIncome: values.requirementsIncome,
            requirementsIncomeProof: values.requirementsIncomeProof,
            requirementsDocuments: values.requirementsDocuments,
            requirementsUkrainNationality: values.requirementsUkrainNationality,
            requirementsSpecial: values.requirementsSpecial,
            market: values.market
        }
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

