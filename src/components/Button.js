import React from 'react'

import './style.css';

const Button = (props) => (
    <div className="button" onClick={props.onClick} style={{
        "color": props.color ? props.color: "white",
        "background": props.background ? props.background: "",
        "border": props.border ? `0.2px solid ${props.border}`: "",
        "width": props.width ? `${props.width}px`: "200px",
        "height": props.height ? `${props.height}px`: "60px",
        "margin": props.margin
    }}>
        <span>{props.children}</span>
    </div>
);

export default Button;