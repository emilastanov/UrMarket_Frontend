import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const getContent = async (market, language) => {
    const data = JSON.stringify({
        "query": `query{getContent(market:"${market}",language:"${language}"){errors,content{faq_header,offer{amount,time{title,units},term{title,units},rate{title,units},button},language,market,logotype,title,header,description,meta{title,description,keywords},calc{amount{label,placeholder},term{label,placeholder},button},ads{paragraph,image},filter{header,amount,term,rate,popular},footer{paragraph,partners_header,legal_address},top{title,table_columns{amount,term,rate,company}},review{header,form{name,select_organization,input_placeholder,rating,button},success_message,list{header,loader}}}}}`
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
};

export const getOffers = async (market) => {
    const data = JSON.stringify({
        "query": `query{listOffers(market:"${market}"){offers{id,title,logotype,market,description,is_show,link,rate,term{min,max},amount{min,max,symbol},rating,processing_time{min,max},processing_methods,requirements{age{min,max},income,income_proof,documents,ukrain_nationality,special}}}}`
    });

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

export const getFAQ = async (market, language) => {
    const data = JSON.stringify({
        "query": `query {listFAQ(language: "${language}", market: "${market}"){list_faq{id, answer,question, market, language}}}`
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

export const getReviews = async (market) => {
    const data = JSON.stringify({
        "query": `query{listReviews(market:"${market}"){reviews{id,name,text,rating,company{title}}}}`
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
