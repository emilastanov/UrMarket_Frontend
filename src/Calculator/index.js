import React, {useState} from 'react';

import './style.css';

import InputGroup from "../components/InputGroup";
import Input from "../components/Input";
import Button from "../components/Button";
import Ads from "../components/Ads";

const Calculator = props => {
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    return <div className="calculator">
        <h1 className={`calculator_header ${!props.header ? "textLoading" : "" }`} >
            {props.header ? props.header : "Текст загружается"}
        </h1>
        <p className={`calculator_description`} >
            <span className={!props.description ? "textLoading" : "" }>{props.description ? props.description : "Описание еще не загрузилось. Описание еще не загрузилось. Описание еще не загрузилось. Описание еще не загрузилось. Описание еще не загрузилось"}</span>
        </p>
        <InputGroup height={50}>
            <Input label={props.amount ? props.amount.label : ""} placeholder={props.amount ? props.amount.placeholder : ""} value={amount} changeValue={setAmount}/>
            <Input label={props.term ? props.term.label: ""} placeholder={props.term ? props.term.placeholder : ""} value={term} changeValue={setTerm}/>
        </InputGroup>
        <Button height={50}>{props.button} (N)</Button>
        <Ads
            text={props.ads ? props.ads.paragraph : ""}
            img={props.ads ? props.ads.image: ""}
            style={{width: 370,clear: 'both', paddingTop: 40}}
        />
    </div>
}

export default Calculator;