import React from "react";

import './style.css'

const Filter = props => (
    <div className="filter">
        <span>{props.header}</span>
        {props.filters.map((item,key)=>(
            <span onClick={item.filter} key={key}>{item.name}</span>
        ))}
    </div>
);

export default Filter;