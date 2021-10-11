import React, {useState} from "react";

import './style.css';

import Slider from "../Slider";
import DropDown from "../DropDown";
import Checkbox from "../Checkbox";
import Button from "../Button";

const CardSelector = props => {

    const [amount ,setAmount] = useState(1000);
    const [period ,setPeriod] = useState(55);
    const [cardType ,setCardType] = useState(null);
    const [freeService, setFreeService] = useState(false);
    const [forBusiness, setForBusiness] = useState(false);

    return <div className="cardSelector">
        <div className="header">
            <h1>Кредитные карты</h1>
            <p>Сравните условия, выберите самые выгодные на 2021 год предложения и отправьте заявку на кредитную карту в банк! На 10.10.2021 вам доступно 280 предложений cо ставкой от 6% и кэшбэком до 33%</p>
        </div>
        <div className="inputs">
            <Slider
                value={amount}
                onChange={setAmount}
                title="Сумма"
                min={1000}
                max={1000000}
                step={1000}
                symbol=" р"
            />
            <Slider
                value={period}
                onChange={setPeriod}
                title="Грейс период"
                min={10}
                max={120}
                step={1}
                symbol=" д"
            />
            <DropDown
                value={cardType}
                onChange={setCardType}
                title="Платежная система"
                selections={['Visa', 'MasterCard', 'МИР']}
            />
            <Checkbox
                value={freeService}
                onChange={setFreeService}
                title="Бесплатное обслуживание"
                id={1}
            />
            <Checkbox
                value={forBusiness}
                onChange={setForBusiness}
                title="Для бизнеса"
                id={2}
            />
            <Button width={250} height={50} margin={"0"}>Показать</Button>
        </div>

    </div>
}

export default CardSelector;