import React, {useEffect, useState} from 'react';

import './style.css';

import InputGroup from "../components/InputGroup";
import Input from "../components/Input";
import Button from "../components/Button";
import Ads from "../components/Ads";

const Calculator = props => {
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    const [count, setCount] = useState(null);

    useEffect(()=>{
        setCount(props.count_offers)
    },[props.count_offers])

    const getCountOfFilteredOffers = (a,t) =>{
        let filteredOffers = props.offers
        if (a) {
            filteredOffers = filteredOffers.filter(item=>(item.amount.min <= a && item.amount.max >= a))
        }
        if (t){
            filteredOffers = filteredOffers.filter(item=>(item.term.min <= t && item.term.max >= t))
        }
        return filteredOffers.length
    }

    return <div className="calculator">
        <h1 className={`calculator_header`} >
            {props.header}
        </h1>
        <p className={`calculator_description`} >
            <span>{props.description}</span>
        </p>
        <InputGroup height={50}>
            <Input label={props.amount ? props.amount.label : ""} placeholder={props.amount ? props.amount.placeholder : ""} value={amount} changeValue={(e)=>{
                setAmount(e);
                setCount(getCountOfFilteredOffers(e,term));
            }}/>
            <Input label={props.term ? props.term.label: ""} placeholder={props.term ? props.term.placeholder : ""} value={term} changeValue={(e)=>{
                setTerm(e);
                setCount(getCountOfFilteredOffers(amount, e));
            }}/>
        </InputGroup>
        <Button width={window.innerWidth <= 900 ? 175 : null} height={50} onClick={()=>{
            props.setFilters({amount: parseInt(amount, 10), term: parseInt(term, 10)});
            document.getElementById('offersList').scrollIntoView({block: "center", behavior: "smooth"});
        }}>{props.button} ({count})</Button>
        <Ads
            text={props.ads ? props.ads.paragraph : ""}
            img={props.ads ? props.ads.image: ""}
            style={window.innerWidth <= 900 ? {} : {width: 370, clear: 'both', paddingTop: 40}}
        />
    </div>
}

export default Calculator;