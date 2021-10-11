import React from "react";

import './style.css';

const Checkbox = props => (
    <div className="checkbox">
        <input type="checkbox" className="custom-checkbox" id={`checkbox${props.id}`} value="yes" />
        <label className="title" htmlFor={`checkbox${props.id}`}>{props.title}</label>
    </div>
);

export default Checkbox;