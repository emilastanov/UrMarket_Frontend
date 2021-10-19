import React, {useEffect} from "react";

import './style.css';

import Slider from "../Slider";
import DropDown from "../DropDown";
import Checkbox from "../Checkbox";
import Button from "../Button";

const CardSelector = props => {

    useEffect(()=>{
        props.setAmount(props.filters && props.filters.amount.min);
        props.setPeriod(props.filters && props.filters.grace_period.min);
    }, [props.filters])

    return <div className="cardSelector">
        <div className="header">
            <h1>Кредитные карты</h1>
            <p>Сравните условия, выберите самые выгодные на 2021 год предложения и отправьте заявку на кредитную карту в банк! На 10.10.2021 вам доступно 280 предложений cо ставкой от 6% и кэшбэком до 33%</p>
        </div>
        <div className="inputs">
            <Slider
                value={props.amount}
                onChange={props.setAmount}
                title="Сумма"
                min={props.filters && props.filters.amount.min}
                max={props.filters && props.filters.amount.max}
                step={5000}
                symbol=" р"
            />
            <Slider
                value={props.period}
                onChange={props.setPeriod}
                title="Грейс период"
                min={props.filters && props.filters.grace_period.min}
                max={props.filters && props.filters.grace_period.max}
                step={5}
                symbol=" д"
            />
            <DropDown
                value={props.cardType}
                onChange={props.setCardType}
                title="Платежная система"
                selections={props.filters ? props.filters.card_types : ['Загрузка...']}
            />
            <Checkbox
                value={props.freeService}
                onChange={props.setFreeService}
                title="Бесплатное обслуживание"
                id={1}
            />
            <Checkbox
                value={props.forBusiness}
                onChange={props.setForBusiness}
                title="Для бизнеса"
                id={2}
            />
            <Button width={250} height={50} margin={"0"} onClick={props.filter}>Показать</Button>
        </div>

    </div>
}

export default CardSelector;