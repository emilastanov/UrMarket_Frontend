import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Storybook from "../Storybook";
import Header from "../Header";
import Main from "../pages/Main";
import './style.css'


const App = props => {
    let [lang, changeLang] = useState("ru")
    const changeLanguage = () => {
        if (lang === "ru") {
            changeLang('ua')
        } else {
            changeLang('ru')
        }
    }
    return <Router>
        <Header language={{selected: lang, languages: ["ru", "ua"]}} change={changeLanguage}/>
        <Switch>
            <Route path="/storybook">
                <Storybook />
            </Route>
            <Route path="/">
                <Main market="ua" language="ru" />
            </Route>
        </Switch>
    </Router>
}

export default App