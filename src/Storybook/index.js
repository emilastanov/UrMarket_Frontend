import React from 'react'

import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import Input from "../components/Input";
import Ads from "../components/Ads";

const Storybook = props => {
    return <div>
        <h1>Storybook</h1>

        <div style={{display: "block", width: "100%", height: 200}}>
            <Button
                onClick={()=>console.log('Test')}
            >
                Click
            </Button>
        </div>

        <div style={{display: "block", width: "100%", height: 200}}>
            <InputGroup>
                <Input placeholder="Любая" label="Сумма"/>
                <Input placeholder="Любой" label="Срок"/>
                <Input placeholder="Любая" label="Ставка"/>
            </InputGroup>
        </div>

        <div style={{display: "block", width: "100%", height: 200, background: "green"}}>
            <Ads
                text="Деньги на карту онлайн От 0%* до 10 000 ₴."
                img="https://urmarket.online/static/credit7Adv.png"
                style={{width: 400}}
            />
        </div>
    </div>
}

export default Storybook;