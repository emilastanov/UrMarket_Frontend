import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const listContent = async (market) => {
    const data = JSON.stringify({
        "query": `query ListContent($market: String!){listContent(market:$market){errors,contents{id,faq_header,offer{amount,time{title,units},term{title,units},rate{title,units},button},language,market,logotype,title,header,description,meta{title,description,keywords},calc{amount{label,placeholder},term{label,placeholder},button},ads{paragraph,image},filter{header,amount,term,rate,popular},footer{paragraph,partners_header,legal_address},top{title,table_columns{amount,term,rate,company}},review{header,form{name,select_organization,input_placeholder,rating,button},success_message,list{header,loader}}}}}`,
        "variables": {
            market: market
        }
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

export const addOrUpdateContent = async (key, values, edit=false) => {
    const data = JSON.stringify({
        query: `mutation addOrUpdateContent(
            ${edit ? '$id: ID!' : ''}
            $logotype: String!
            $language: String!
            $market: String!
            $title: String!
            $metaTitle: String!
            $metaDescription: String!
            $metaKeywords: String!
            $header: String!
            $faqHeader: String!
            $description: String!
            $calcButton: String!
            $calcAmountLabel: String!
            $calcAmountPlaceholder: String!
            $calcTermLabel: String!
            $calcTermPlaceholder: String!
            $adsParagraph: String!
            $adsImage: String!
            $offerAmount: String!
            $offerTime: String!
            $offerTimeUnits: String!
            $offerTermUnits: String!
            $offerRateUnits: String!
            $offerTerm: String!
            $offerRate: String!
            $offerButton: String!
            $filterHeader: String!
            $filterAmount: String!
            $filterTerm: String!
            $filterRate: String!
            $filterPopular: String!
            $footerParagraph: String!
            $footerPartnersHeader: String!
            $topTitle: String!
            $footerLegalAddress: String!
            $topTableColumnAmount: String!
            $topTableColumnTerm: String!
            $topTableColumnRate: String!
            $topTableColumnCompany: String!
            $reviewHeader: String!
            $reviewFormName: String!
            $reviewFormSelectOrganization: String!
            $reviewFormInputPlaceholder: String!
            $reviewFormRating: String!
            $reviewFormButton: String!
            $reviewSuccessMessage: String!
            $reviewListHeader: String!
            $reviewListLoader: String!
        ){
            ${edit ? "updateContent" : "addContent"}(
                ${edit ? 'id: $id' : ''}
                logotype: $logotype,
                language: $language,
                market: $market,
                title: $title,
                metaTitle: $metaTitle,
                metaDescription: $metaDescription,
                metaKeywords: $metaKeywords,
                header: $header,
                faqHeader: $faqHeader,
                description: $description,
                calcButton: $calcButton,
                calcAmountLabel: $calcAmountLabel,
                calcAmountPlaceholder: $calcAmountPlaceholder,
                calcTermLabel: $calcTermLabel,
                calcTermPlaceholder: $calcTermPlaceholder,
                adsParagraph: $adsParagraph,
                adsImage: $adsImage,
                offerAmount: $offerAmount,
                offerTime: $offerTime,
                offerTimeUnits: $offerTimeUnits,
                offerTermUnits: $offerTermUnits,
                offerRateUnits: $offerRateUnits,
                offerTerm: $offerTerm,
                offerRate: $offerRate,
                offerButton: $offerButton,
                filterHeader: $filterHeader,
                filterAmount: $filterAmount,
                filterTerm: $filterTerm,
                filterRate: $filterRate,
                filterPopular: $filterPopular,
                footerParagraph: $footerParagraph,
                footerPartnersHeader: $footerPartnersHeader,
                topTitle: $topTitle,
                footerLegalAddress: $footerLegalAddress,
                topTableColumnAmount: $topTableColumnAmount,
                topTableColumnTerm: $topTableColumnTerm,
                topTableColumnRate: $topTableColumnRate,
                topTableColumnCompany: $topTableColumnCompany,
                reviewHeader: $reviewHeader,
                reviewFormName: $reviewFormName,
                reviewFormSelectOrganization: $reviewFormSelectOrganization,
                reviewFormInputPlaceholder: $reviewFormInputPlaceholder,
                reviewFormRating: $reviewFormRating,
                reviewFormButton: $reviewFormButton,
                reviewSuccessMessage: $reviewSuccessMessage,
                reviewListHeader: $reviewListHeader,
                reviewListLoader: $reviewListLoader
            ){success}
        }`,
        variables: {
            id: values.id,
            logotype: values.logotype,
            language: values.language,
            market: values.market,
            title: values.title,
            metaTitle: values.metaTitle,
            metaDescription: values.metaDescription,
            metaKeywords: values.metaKeywords,
            header: values.header,
            faqHeader: values.faqHeader,
            description: values.description,
            calcButton: values.calcButton,
            calcAmountLabel: values.calcAmountLabel,
            calcAmountPlaceholder: values.calcAmountPlaceholder,
            calcTermLabel: values.calcTermLabel,
            calcTermPlaceholder: values.calcTermPlaceholder,
            adsParagraph: values.adsParagraph,
            adsImage: values.adsImage,
            offerAmount: values.offerAmount,
            offerTime: values.offerTime,
            offerTimeUnits: values.offerTimeUnits,
            offerTermUnits: values.offerTermUnits,
            offerRateUnits: values.offerRateUnits,
            offerTerm: values.offerTerm,
            offerRate: values.offerRate,
            offerButton: values.offerButton,
            filterHeader: values.filterHeader,
            filterAmount: values.filterAmount,
            filterTerm: values.filterTerm,
            filterRate: values.filterRate,
            filterPopular: values.filterPopular,
            footerParagraph: values.footerParagraph,
            footerPartnersHeader: values.footerPartnersHeader,
            topTitle: values.topTitle,
            footerLegalAddress: values.footerLegalAddress,
            topTableColumnAmount: values.topTableColumnAmount,
            topTableColumnTerm: values.topTableColumnTerm,
            topTableColumnRate: values.topTableColumnRate,
            topTableColumnCompany: values.topTableColumnCompany,
            reviewHeader: values.reviewHeader,
            reviewFormName: values.reviewFormName,
            reviewFormSelectOrganization: values.reviewFormSelectOrganization,
            reviewFormInputPlaceholder: values.reviewFormInputPlaceholder,
            reviewFormRating: values.reviewFormRating,
            reviewFormButton: values.reviewFormButton,
            reviewSuccessMessage: values.reviewSuccessMessage,
            reviewListHeader: values.reviewListHeader,
            reviewListLoader: values.reviewListLoader
        }
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        },
        data : data
    };

    return axios(config)
}

export const removeContent = (key, id) => {
    const data = JSON.stringify({
        "query": `mutation RemoveContent($id:ID!){
                      removeContent(id: $id){
                        success
                      }
                    }`,
        "variables": {
            id: parseInt(id,10)
        }
    });

    const config = {
        method: 'post',
        url: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key
        },
        data : data
    };

    return axios(config)
}