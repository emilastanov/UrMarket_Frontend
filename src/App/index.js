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
import FAQ from "../FAQ";
import Reviews from "../Reviews";
import Footer from "../Footer";

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
                <FAQ questions={[
                    {question: "Что такое микрозаймы?", answer: "Микрозаймы-это кредиты на небольшие суммы и короткие сроки.\n" +
                            "                    Однако некоторые микрофинансовые организации выдают займы в размере до 1 миллиона и сроком до 1\n" +
                            "                    года. Их в основном берут индивидуальные предприниматели. Как правило, здесь идет речь о\n" +
                            "                    микрокредитам под залог авто, жилье в залог оформить нельзя."},
                    {question: "Что такое микрозd12dаймы?", answer: "Мsdfsdfикрозаймы-это кредиты на небольшие суммы и короткие сроки.\n" +
                            "                    Однако некоторые микрофинансовые организации выдают займы в размере до 1 миллиона и сроком до 1\n" +
                            "                    года. Их в основном берут индивидуальные предприниматели. Как правило, здесь идет речь о\n" +
                            "                    микрокредитам под залог авто, жилье в залог оформить нельзя."},
                    {question: "Что такое микр123озаймы?", answer: "Микрasdfvsadозаймы-это кредиты на небольшие суммы и короткие сроки.\n" +
                            "                    Однако некоторые микрофинансовые организации выдают займы в размере до 1 миллиона и сроком до 1\n" +
                            "                    года. Их в основном берут индивидуальные предприниматели. Как правило, здесь идет речь о\n" +
                            "                    микрокредитам под залог авто, жилье в залог оформить нельзя."},
                    {question: "Что такое микрозаasdймы?", answer: "Микрasdvasdvозаймы-это кредиты на небольшие суммы и короткие сроки.\n" +
                            "                    Однако некоторые микрофинансовые организации выдают займы в размере до 1 миллиона и сроком до 1\n" +
                            "                    года. Их в основном берут индивидуальные предприниматели. Как правило, здесь идет речь о\n" +
                            "                    микрокредитам под залог авто, жилье в залог оформить нельзя."}

                ]}/>
                <Reviews/>
                <Footer/>
            </Route>
        </Switch>
    </Router>
}

export default App