import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const cardOfferSwitcher = async (key, id, state) => {
    const data = JSON.stringify({
        "query": `mutation SetCardOfferState(
            $id: ID!,
            $isShow: Boolean!
        ){updateCreditCardOffer(id: $id, isShow: $isShow){credit_card{id,is_show}}}`,
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

export const addOrUpdateCreditCardOffer = async (key, values, edit) => {
    const data = JSON.stringify({
        "query": `mutation AddCreditCardOffer(
            ${edit ? "$id: ID!" : ""}
            $title: String!
            $logotype: ${edit ? 'String' : 'String!'}
            $isShow: Boolean!
            $cashWithdrawal: String!
            $cardType: String!
            $market: String!
            $rating: Int!
            $link: String!
            $description: String!
            $gracePeriod: Int!
            $rate: String!
            $servicePayment: Int!
            $creditLimit: Int!
            $creditDocs: String!
            $ageMin: Int!
            $ageMax: Int!
            $onlyIndividual: Boolean!
            $minimumWorkExperience: Int!
            $minimumCurrentWorkExperience: Int!
            $salaryMinimumSalary: Int!
            $salaryMinimumSalaryMainRegions: Int!
            $salaryMainRegions: String!
            $amountSymbol: String!
        ){
            ${edit ? "updateCreditCardOffer" : "addCreditCardOffer"}(
                ${edit ? "id: $id" : ""}
                title: $title
                logotype: $logotype
                isShow: $isShow
                cashWithdrawal: $cashWithdrawal
                cardType: $cardType
                market: $market
                rating: $rating
                amountSymbol: $amountSymbol
                link: $link
                description: $description
                gracePeriod: $gracePeriod
                rate: $rate
                servicePayment: $servicePayment
                creditLimit: $creditLimit
                creditDocs: $creditDocs
                ageMin: $ageMin
                ageMax: $ageMax
                onlyIndividual: $onlyIndividual
                minimumWorkExperience: $minimumWorkExperience
                minimumCurrentWorkExperience: $minimumCurrentWorkExperience
                salaryMinimumSalary: $salaryMinimumSalary
                salaryMinimumSalaryMainRegions: $salaryMinimumSalaryMainRegions
                salaryMainRegions: $salaryMainRegions
            ){
                credit_card{id,is_show}
            }
        }`,
        variables: {
            id: parseInt(values.id, 10),
            title: values.title,
            logotype: values.logotype,
            isShow: values.isShow,
            cashWithdrawal:values.cashWithdrawal,
            cardType: values.cardType,
            market: values.market,
            rating: parseInt(values.rating, 10),
            link: values.link,
            description: values.description,
            gracePeriod: parseInt(values.gracePeriod, 10),
            rate: values.rate,
            servicePayment: parseInt(values.servicePayment, 10),
            creditLimit: parseInt(values.creditLimit,10),
            creditDocs: values.creditDocs,
            ageMin: parseInt(values.ageMin,10),
            ageMax: parseInt(values.ageMax,10),
            onlyIndividual: values.onlyIndividual,
            minimumWorkExperience: parseInt(values.minimumWorkExperience,10),
            minimumCurrentWorkExperience: parseInt(values.minimumCurrentWorkExperience, 10),
            salaryMinimumSalary: parseInt(values.salaryMinimumSalary,10),
            salaryMinimumSalaryMainRegions: parseInt(values.salaryMinimumSalaryMainRegions,10),
            salaryMainRegions: values.salaryMainRegions,
            amountSymbol: values.amountSymbol
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

export const removeCreditCardOffer = async (key, id) => {
    const data = JSON.stringify({
        "query": `mutation{removeCreditCardOffer(id: ${id}){success}}`
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
