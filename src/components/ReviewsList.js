import React from "react";

import "./style.css";

const ReviewsList = props => {

    return <div className="reviewsList">
        <h1 className="title">
            Отзывы
        </h1>
        <div className="list">
            <div className="review" id="review_33">
                <h3>Анон</h3>
                <div>
                    <span>Money4you</span>
                    <span>
                        <img src="https://res.cloudinary.com/urmarket-online/image/upload/v1631037912/star.png" alt="star" />
                    </span>
                    <span >4</span>
                    </div>
                <p>Я оформляю кредит в Money4you второй раз, но условия хорошие, переплата не так много как в других, но
                    к сожалению деньги не сразу падали как одобрили. Займ почти 5-6 дней с выходными может идти, может
                    из-за праздников так, не знаю. В первый раз когда у них, то через 4 часа упали деньги на карту, но
                    там сумма небольшая была, а тут прям с праздниками так долго.</p>
            </div>
            <div className="moreButton">
                Показать еще...
            </div>
        </div>
    </div>
}

export default ReviewsList;