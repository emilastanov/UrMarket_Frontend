import React from 'react';

import './style.css';

const repeatStringNumTimes = (string, times) => {
    var repeatedString = "";
    while (times > 0) {
        repeatedString += string;
        times--;
    }
    return repeatedString;
}

const InputGroup = props => (
    <div className="inputGroup" style={{
        "gridTemplateColumns": window.innerWidth <= 900 ? "1fr" : repeatStringNumTimes('1fr ', props.children.length),
        "width": window.innerWidth <= 900 ? "100%" : props.width? props.width: "500px",
        "height": window.innerWidth <= 900 ?
            props.children.length ?
                40*props.children.length : 40 :
            props.height ? props.height: "60px"
    }}>
        {props.children}
    </div>
);

export default InputGroup;