import React from "react";

import './style.css'

const TopTable = props => (
    <div className="top">
        <h2 className="title" id="topTitle">Топ 5 МФО, выдающих микрозаймы онлайн</h2>
        <div className="top_table" id="top_table">
            <div className="top_table_row" id="top_table_row">
                <div className="top_table_column">
                    МФО
                </div>
                <div className="top_table_column">
                    Сумма
                </div>
                <div className="top_table_column">
                    Ставка
                </div>
                <div className="top_table_column">
                    Срок
                </div>
            </div>
            {props.offers.map((item,key)=>(
                <div className="top_table_row" key={key}>
                    <div className="top_table_column">{item.title}</div>
                    <div className="top_table_column">{item.amount.min} - {item.amount.max}</div>
                    <div className="top_table_column">от {item.rate}%</div>
                    <div className="top_table_column">{item.time.min} - {item.time.max} дней</div>
                </div>
            ))}
        </div>
    </div>
);

export default TopTable;