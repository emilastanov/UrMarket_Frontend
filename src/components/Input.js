import React, {useState} from "react";

import './style.css';

const Input = props => {
    const [focus, setFocus] = useState(false);
    return <div className="input" onClick={(elem)=>{
            setFocus(true);
            if (elem.target.children.length > 0) {
                console.log(elem.target.children[1].focus())
            } else if (elem.target.tagName === "LABEL") {
                elem.target.parentNode.children[1].focus()
            }
        }
    }>
        <label style={{
            transform: focus? 'scale(0.9) translate(-10px,-15px)': 'none'
        }}>{props.label}</label>
        <input
            type="text"
            placeholder={props.placeholder}
            onFocus={(elem)=>{elem.target.style.opacity = 1}}
            onBlur={(elem)=>{
                if (!elem.target.value) {
                    elem.target.style.opacity = 0;
                    setFocus(false)
                }
            }}
            value={props.value}
            onChange={e=>props.changeValue(e.target.value)}
        />
    </div>
}

export default Input