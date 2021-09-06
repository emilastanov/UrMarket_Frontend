import React from 'react';

import './style.css';

const Header = props => {
    return <header>
        <img className="logotype" src="https://res.cloudinary.com/urmarket-online/image/upload/v1630921659/logotype.svg" alt="Logotype"/>
        <div className="changeLang" onClick={props.change}>
            <img className="logotype" src={`https://res.cloudinary.com/urmarket-online/image/upload/v1630923674/lang${props.language}.svg`} alt="Change language"/>
        </div>
    </header>
}

export default Header