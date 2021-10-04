import React, {useState} from 'react';

import {useHistory} from "react-router-dom";

import {NavLink} from "react-router-dom";


import './style.css';

const Header = props => {
    const history = useHistory();

    const [activeTap, setActiveTap] = useState(true);
    return <header>
        <a className="logotype" onClick={()=>{
            if (window.location.pathname.split('/').length > 2) {
                setTimeout(()=>{
                    history.goBack();
                },200);
            }
        }} style={{cursor: 'pointer'}}><img  src="https://res.cloudinary.com/urmarket-online/image/upload/v1630921659/logotype.svg" alt="Logotype"/></a>
        <div className="menu" >
            <NavLink exact to={`/${props.market}`} activeStyle={{fontWeight: 'bold'}}><span>Микрозаймы</span></NavLink>
            <NavLink exact to={`/${props.market}/cards`} activeStyle={{fontWeight: 'bold'}}><span>Кредитные карты</span></NavLink>
        </div>
        {props.changeLanguage ? <div className="changeLang" onClick={props.change}>
            <div>
                <span className={props.language.selected === props.language.languages[0]? "selected" : ""}>{props.language.languages[0]}</span>
                <span className="blue_color"> | </span>
                <span className={props.language.selected === props.language.languages[1]? "selected" : ""}>{props.language.languages[1]}</span>
            </div>
        </div> : ""}
    </header>
}

export default Header