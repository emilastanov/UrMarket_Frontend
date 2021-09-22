import React, {useState, lazy, Suspense, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './style.css'

import PageLoader from "../components/PageLoader";
import Page404 from "../components/Page404";
const Main = lazy(()=>(
    import("../pages/Main")
));
const AdminPanel = lazy(() => (
    import("../pages/AdminPanel")
));
const Login = lazy(() => (
    import("../pages/Login")
));




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

    const fallback = () => (
        <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: "auto",
            width: 100,
            height: 50
        }}>...</div>
    );

    return <Router>
        <PageLoader state={isLoading}/>
        <Switch>
            <Route path="/admin">
                <Suspense fallback={fallback}>
                    {token ? <AdminPanel loader={setIsLoading}/> : <Login loader={setIsLoading}/>}
                </Suspense>
            </Route>
            <Route path="/404">
                <Suspense fallback={fallback}>
                    <Page404 loader={setIsLoading}/>
                </Suspense>
            </Route>
            <Route path="/:market">
                <Suspense fallback={fallback}>
                    <Main language="ru" loader={setIsLoading} country={country}/>
                </Suspense>
            </Route>
            <Route path="/">
                {/*{country ? <Redirect to={`/${country}?language=ru`}/> : ""}*/}
                <Redirect to={`/ua?language=ru`}/>
            </Route>
        </Switch>
    </Router>
}

export default App