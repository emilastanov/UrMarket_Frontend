import React from "react";

import './style.css';

const Footer = props => {
    return <footer>
        <div className="footer">
            <span id="rules">
                {props.data ? props.data.paragraph : ""}
            </span>
            <br/>
            <br/>
            <span id="partnersTitle">{props.data ? props.data.partners_header : ""}</span>
            <br/>
            <span id="ourPartners">{props.partners.join(', ')}</span>
            <br/>
            <br/>
            <span id="address">{props.data ? props.data.legal_address : ""}</span>

        </div>
    </footer>
};

export default Footer;