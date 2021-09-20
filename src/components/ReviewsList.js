import React from "react";

import "./style.css";

const ReviewsList = props => {

    return <div className="reviewsList">
        <h1 className="title">
            {props.data ? props.data.list.header : ""}
        </h1>
        <div className="list">
            {props.reviews.map((item,key)=>(
                <div key={key} className="review" id="review_33">
                    <h4 style={{marginBottom: 0}}>{item.name}</h4>
                    <div>
                        <span>{item.company.title}</span>
                        <span>
                            <img src="https://res.cloudinary.com/urmarket-online/image/upload/v1631037912/star.png" alt="star" />
                        </span>
                        <span >{item.rating}</span>
                    </div>
                    <p>{item.text}</p>
                </div>
            ))}
            <div className="moreButton" style={{display: "none"}}>
                {props.data ? props.data.list.loader : ""}
            </div>
        </div>
    </div>
}

export default ReviewsList;