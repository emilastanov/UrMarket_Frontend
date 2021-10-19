import React from "react";

import './style.css';

const Checkbox = props => (
    <div className="checkbox">
        <input onChange={props.onChange} type="checkbox" className="custom-checkbox" id={`checkbox${props.id}`} value={props.value} />
        <label className="title" htmlFor={`checkbox${props.id}`}>{props.title}</label>
    </div>
);

export default Checkbox;