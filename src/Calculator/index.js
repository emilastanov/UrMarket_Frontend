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
        <h1 className="calculator_header">
            {props.header}
        </h1>
        <p className="calculator_description">
            {props.description}
        </p>
        <InputGroup height={50}>
            <Input label="Сумма" value={amount} changeValue={setAmount}/>
            <Input label="Срок, дней" value={term} changeValue={setTerm}/>
        </InputGroup>
        <Button height={50}>Показать (N)</Button>
        <Ads
            text="Деньги на карту онлайн От 0%* до 10 000 ₴."
            img="https://urmarket.online/static/credit7Adv.png"
            style={{width: 400,clear: 'both', paddingTop: 40}}
        />
    </div>
}

export default Calculator;