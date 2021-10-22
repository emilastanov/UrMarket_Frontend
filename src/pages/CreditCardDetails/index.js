import React from 'react';
import {useParams} from "react-router-dom";

const CreditCardDetails = props => {

    let {card} = useParams();

    return <div>
        {card}
    </div>
};

export default CreditCardDetails;