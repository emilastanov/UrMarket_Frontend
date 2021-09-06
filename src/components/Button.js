import React from 'react'

import './style.css';

const Button = (props) => (
    <div className="button" onClick={props.onClick} style={{
        "color": props.color ? props.color: "white",
        "background": props.background ? props.background: "rgb(0, 172, 255)",
        "border": props.border ? `0.2px solid ${props.border}`: "0.2px solid #00acff",
        "width": props.width ? `${props.width}px`: "200px",
        "height": props.height ? `${props.height}px`: "60px"
    }}>
        <span>{props.children}</span>
    </div>
);

export default Button;