import React, {useState, lazy, Suspense} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './style.css'
import Main from "../pages/Main";
import PageLoader from "../components/PageLoader";
const AdminPanel = lazy(() => import("../pages/AdminPanel"));
const Login = lazy(() => import("../pages/Login"));




const App = props => {
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem("token");

    return <Router>
        <PageLoader state={isLoading}/>
        <Switch>
            <Route path="/admin">
                <Suspense fallback={"..."}>
                    {token ? <AdminPanel loader={setIsLoading}/> : <Login loader={setIsLoading}/>}
                </Suspense>
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