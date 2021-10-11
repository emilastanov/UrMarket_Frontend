import React from "react";

import {SelectorArrow} from "../../icons";

import './style.css'

const DropDown = props => (
    <div className="dropdown_selector">
        <span className="title">{props.title}</span>
        <span className="arrow"><SelectorArrow/></span>
        <select>
            <option value="0">Любая</option>
            {props.selections.map((item, key)=> (
                <option key={key} value={item}>{item}</option>
            ))}
        </select>
    </div>
);

export default DropDown;