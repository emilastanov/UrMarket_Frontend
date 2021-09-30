import React from "react";

import './style.css'

const TopTable = props => (
    <div className="top">
        <h2 className="title" id="topTitle">{props.header}</h2>
        <div className="top_table" id="top_table">
            <div className="top_table_row" id="top_table_row">
                <div className="top_table_column">
                    {props.columns ? props.columns.company : ""}
                </div>
                <div className="top_table_column">
                    {props.columns ? props.columns.amount : ""}
                </div>
                <div className="top_table_column">
                    {props.columns ? props.columns.rate : ""}
                </div>
                <div className="top_table_column">
                    {props.columns ? props.columns.term : ""}
                </div>
            </div>
            {props.offers.map((item,key)=>(
                <div className="top_table_row" key={key}>
                    <div className="top_table_column">{item.title}</div>
                    <div className="top_table_column">{item.amount.min} - {item.amount.max}</div>
                    <div className="top_table_column">от {item.rate}%</div>
                    <div className="top_table_column">{item.term.min} - {item.term.max} дней</div>
                </div>
            ))}
        </div>
    </div>
);

export default TopTable;