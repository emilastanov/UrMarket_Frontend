import React from 'react'

import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import Input from "../components/Input";

const Storybook = props => {
    return <div>
        <h1>Storybook</h1>

        <Button
            onClick={()=>console.log('Test')}
        >
            Click
        </Button>

        <InputGroup>
            <Input placeholder="Любая" label="Сумма"/>
            <Input placeholder="Любой" label="Срок"/>
            <Input placeholder="Любая" label="Ставка"/>
        </InputGroup>

    </div>
}

export default Storybook;