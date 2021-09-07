import React from "react";

import './style.css';


const Ads = props => (
    <div className="ads" style={props.style} >
        <img src={props.img} alt="Ads"/>
        <p>{props.text}</p>
    </div>
);

export default Ads;