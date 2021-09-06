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
        "gridTemplateColumns": repeatStringNumTimes('1fr ', props.children.length),
        "width": props.width? props.width: "500px",
        "height": props.height? props.height: "60px"
    }}>
        {props.children}
    </div>
);

export default InputGroup;