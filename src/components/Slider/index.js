import React from "react";
import ReactSlider from "react-slider";

import './style.css';

const Slider = props => (
    <div className="slider_wrapper">
        <span className="title">{props.title}</span>
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            onChange={props.onChange}
            min={props.min}
            max={props.max}
            step={props.step}
        />
        <input
            className="value"
            value={`${props.value}${props.symbol}`}
            onChange={ref=>{
                props.onChange(ref.target.value.replace(props.symbol, ''))
            }}
        />
    </div>
);

export default Slider