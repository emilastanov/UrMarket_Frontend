import React from "react";

import './style.css';

const Checkbox = props => (
    <div className="checkbox">
        <input onChange={e=>{props.onChange(e.target.checked)}} type="checkbox" className="custom-checkbox" id={`checkbox${props.id}`} />
        <label className="title" htmlFor={`checkbox${props.id}`}>{props.title}</label>
    </div>
);

export default Checkbox;