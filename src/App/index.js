import React, {useState, lazy, Suspense, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './style.css'
import Main from "../pages/Main";
import PageLoader from "../components/PageLoader";
import Page404 from "../components/Page404";
const AdminPanel = lazy(() => import("../pages/AdminPanel"));
const Login = lazy(() => import("../pages/Login"));




const App = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [country, setCountry] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch('https://extreme-ip-lookup.com/json/')
            .then( res => res.json())
            .then(response => {
                setCountry(response.countryCode.toLowerCase());
            })
            .catch((data, status) => {
                console.log('Request failed:', data);
            });
    },[country])

    return <Router>
        <PageLoader state={isLoading}/>
        <Switch>
            <Route path="/admin">
                <Suspense fallback={"..."}>
                    {token ? <AdminPanel loader={setIsLoading}/> : <Login loader={setIsLoading}/>}
                </Suspense>
            </Route>
            <Route path="/404">
                <Page404 loader={setIsLoading}/>
            </Route>
            <Route path="/:market">
                <Main language="ru" loader={setIsLoading} country={country}/>
            </Route>
            <Route path="/">
                {/*{country ? <Redirect to={`/${country}?language=ru`}/> : ""}*/}
                <Redirect to={`/ua?language=ru`}/>
            </Route>
        </Switch>
    </Router>
}

export default App