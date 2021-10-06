import React from "react";

import CardSelector from "../../components/CardSelector";
import CardOfferList from "../../components/CardOfferList";
import TopTable from "../../components/TopTable";
import FAQ from "../../components/FAQ";
import Reviews from "../../components/Reviews";

import './style.css';

const CreditCards = props => {

    return <React.Fragment>
        <CardSelector />
        <CardOfferList />
        <TopTable
            header=""
            columns={{}}
            offers={[]}
        />
        <FAQ
            questions={null}
            header={""}
        />
        <Reviews
            updateReviews={()=>{}}
            market={null}
            data={null}
            offers={[]}
            reviews={[]}
        />
    </React.Fragment>
}

export default CreditCards;