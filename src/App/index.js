import React, {useState} from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Main from "../pages/Main";
import PageLoader from "../components/PageLoader";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";

import './style.css'


const App = props => {
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem("token");

    return <Router>
        <PageLoader state={isLoading}/>
        <Switch>
            <Route path="/admin">
                {token ? <AdminPanel loader={setIsLoading}/> : <Login loader={setIsLoading}/>}
            </Route>
            <Route path="/:market">
                <Main language="ru" loader={setIsLoading}/>
            </Route>
            <Route path="/">
                <Redirect to="/ua?language=ru"/>
            </Route>
        </Switch>
    </Router>
}

export default App