import React from 'react';

import {Link} from "react-router-dom";


import './style.css';

const Header = props => {
    return <header>
        <Link to="/"><img className="logotype" src="https://res.cloudinary.com/urmarket-online/image/upload/v1630921659/logotype.svg" alt="Logotype"/></Link>
        <div className="changeLang" onClick={props.change}>
            <span className={props.language.selected === props.language.languages[0]? "selected" : ""}>{props.language.languages[0]}</span><span style={{color: "#00ACFF"}}> | </span><span className={props.language.selected === props.language.languages[1]? "selected" : ""}>{props.language.languages[1]}</span>
        </div>
    </header>
}

export default Header