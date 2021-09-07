import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Storybook from "../Storybook";
import Header from "../Header";
import Calculator from "../Calculator";
import OffersList from "../OffersList";
import TopTable from "../TopTable";

import './style.css'


const App = props => {
    let [lang, changeLang] = useState("RuUa_Ua")
    const changeLanguage = () => {
        if (lang === "RuUa_Ua") {
            changeLang('RuUa_Ru')
        } else {
            changeLang('RuUa_Ua')
        }
    }
    return <Router>
        <Header language={lang} change={changeLanguage}/>
        <Switch>
            <Route path="/storybook">
                <Storybook />
            </Route>
            <Route path="/2">
                <h2>Hello</h2>
            </Route>
            <Route path="/">
                <Calculator
                    header="Микрозаймы онлайн"
                    description="Выберите подходящие микрокредиты от проверенных МФО. Вам доступно более 10 займов со ставкой от 0% в день. Увеличьте шансы на получение денег — отправьте заявку сразу в несколько МФО."
                />
                <OffersList offers={[1,2,3,4]}/>
                <TopTable offers={[
                    {
                        title: "Я календарь",
                        amount: {min: 1, max: 2},
                        rate: 12,
                        time: {min: 1, max: 2}
                    },
                    {
                        title: "Я календарь",
                        amount: {min: 1, max: 2},
                        rate: 12,
                        time: {min: 1, max: 2}
                    },
                    {
                        title: "Я календарь",
                        amount: {min: 1, max: 2},
                        rate: 12,
                        time: {min: 1, max: 2}
                    },
                    {
                        title: "Я календарь",
                        amount: {min: 1, max: 2},
                        rate: 12,
                        time: {min: 1, max: 2}
                    },
                    {
                        title: "Я календарь",
                        amount: {min: 1, max: 2},
                        rate: 12,
                        time: {min: 1, max: 2}
                    }
                ]}/>
            </Route>
        </Switch>
    </Router>
}

export default App