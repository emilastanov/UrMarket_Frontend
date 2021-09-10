import React, {useEffect, useState} from "react";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import AdminHeader from "../../components/AdminHeader";
import Users from "../Users";
import Offers from "../Offers";

import "./style.css";
import {login} from "../Login/reducer";

const AdminPanel = props => {

    const [user, setUser] = useState(null);
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

    useEffect(()=>{
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
                <Offers user={user}/>
            </Route>
            <Route path={`${path}/content`}>
                content
            </Route>
            <Route path={`${path}/market`}>
                market
            </Route>
        </Switch>
    </div>
};

export default AdminPanel;