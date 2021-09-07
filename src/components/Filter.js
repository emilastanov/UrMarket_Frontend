import React from "react";

import './style.css'

const Filter = props => (
    <div className="filter">
        <span>Сортировать:</span>
        {props.filters.map((item,key)=>(
            <span key={key}>{item.name}</span>
        ))}
    </div>
);

export default Filter;