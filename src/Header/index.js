import React, {useState} from 'react';

import {Link} from "react-router-dom";


import './style.css';

const Header = props => {
    const [activeTap, setActiveTap] = useState(true);
    return <header>
        <Link to="/"><img onClick={()=>props.loader(true)} className="logotype" src="https://res.cloudinary.com/urmarket-online/image/upload/v1630921659/logotype.svg" alt="Logotype"/></Link>
        <div className="menu" style={{display: 'none'}}>
            <span onClick={()=>setActiveTap(!activeTap)} className={activeTap ? "active" : ""}>Микрозаймы</span>
            <span onClick={()=>setActiveTap(!activeTap)} className={!activeTap ? "active" : ""}>Кредитные карты</span>
        </div>
        {props.changeLanguage ? <div className="changeLang" onClick={props.change}>
            <div>
                <span className={props.language.selected === props.language.languages[0]? "selected" : ""}>{props.language.languages[0]}</span>
                <span style={{color: "#00ACFF"}}> | </span>
                <span className={props.language.selected === props.language.languages[1]? "selected" : ""}>{props.language.languages[1]}</span>
            </div>
        </div> : ""}
    </header>
}

export default Header