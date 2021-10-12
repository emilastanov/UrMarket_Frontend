import React, {useEffect, useState} from "react";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import AdminHeader from "../../components/AdminHeader";
import Users from "../Users";
import Offers from "../Offers";
import FAQ from "../FAQ";
import Reviews from "../Reviews";
import Market from "../Market";
import Content from "../Content";
import CardOffers from "../CardOffers";

import "./style.css";
import {login} from "../Login/reducer";
import {getMarkets} from "./reducer";

const AdminPanel = props => {

    const [user, setUser] = useState(null);
    const [markets, setMarkets] = useState(null)
    let { path } = useRouteMatch();

    const getUser = () => {
        const token = localStorage.getItem("token")
        login(token).then((response)=> {
            const resp = response.data;
            if (!resp.data.login.success){
                localStorage.removeItem("token");
                window.location.reload();
            } else {
                setUser(resp.data.login.user)
            }
        })
    }

    const listMarkets = () => {
        getMarkets().then((response)=>{
            setMarkets(response.data.data.listMarkets.markets)
        })
    }

    useEffect(()=>{
        const link = document.createElement("link");
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css";
        link.rel = "stylesheet";
        link.integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        link.crossOrigin = "anonymous"
        document.getElementsByTagName('head')[0].appendChild(link);

        const script = document.createElement("script");
        script.src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
        script.integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
        script.crossOrigin="anonymous"
        document.getElementsByTagName('body')[0].appendChild(script);

        listMarkets();
        props.loader(false);
        getUser();
    }, [setUser])

    document.title = "Admin Panel"

    return <div className="adminPanel">
        <AdminHeader user={user}/>
        <Switch>
            <Route exact path={`${path}`}>
                <Users data={user}/>
            </Route>
            <Route path={`${path}/offer`}>
                <Offers user={user} markets={markets}/>
            </Route>
            <Route path={`${path}/faq`}>
                <FAQ user={user} markets={markets}/>
            </Route>
            <Route path={`${path}/market`}>
                <Market user={user} listMarkets={listMarkets}/>
            </Route>
            <Route path={`${path}/reviews`}>
                <Reviews user={user} markets={markets}/>
            </Route>
            <Route path={`${path}/content`}>
                <Content user={user} markets={markets}/>
            </Route>
            <Route path={`${path}/cards`}>
                <CardOffers user={user} markets={markets}/>
            </Route>
        </Switch>
    </div>
};

export default AdminPanel;