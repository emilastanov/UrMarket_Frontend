import axios from "axios";

const API_URL = 'https://api.urmarket.online/';

export const getOffer_reducer = async (id) => {
    const data = JSON.stringify({
        query: `query GetOffer(
            $id: ID!
        ){
            getOffer(
                id: $id
            ){
                offer{
                  id
                  title
                  description
                  logotype
                  link
                  term {
                    min
                    max
                  }
                  amount {
                    min
                    max
                    symbol
                  }
                  rate
                  rating
                  processing_time{
                    min
                    max
                  }
                  processing_methods
                  requirements{
                    documents
                    age{
                      min
                      max
                    }
                    income
                    income_proof
                    ukrain_nationality
                    special
                  }
                }
            }
        }`,
        variables: {
            id: id
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
}