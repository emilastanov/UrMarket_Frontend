import React from "react";
import { Form, Field } from 'react-final-form'

import ReviewsList from "../components/ReviewsList";

import './style.css';


const Reviews = props => {
    const submitForm = () => {

    }
    return <div className="reviews">
        <div className="review_form">
            <h1 className="title">Оставьте отзыв</h1>
            <Form
                onSubmit={submitForm}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit} >
                        <input id="name" name="name" type="text" placeholder="Фамилия Имя" />
                        <div className="company">
                            <select name="company" id="company"
                                    onChange="document.getElementById('company').style = 'color: black!important';">
                                <option value="" selected="" disabled="" hidden="" id="select_placeholder">Выберите МФО
                                </option>
                                <option value="Ваша Готивочка">Ваша Готивочка</option>
                                <option value="Money4you">Money4you</option>
                            </select>
                            <div>
                                <span id="rating">Оцените</span>
                                <fieldset>
                                    <span className="star-cb-group">
                                      <input type="radio" id="rating-5" name="rating" value="5" /><label
                                        htmlFor="rating-5">5</label>
                                      <input type="radio" id="rating-4" name="rating" value="4" checked="checked" /><label
                                        htmlFor="rating-4">4</label>
                                      <input type="radio" id="rating-3" name="rating" value="3" /><label
                                        htmlFor="rating-3">3</label>
                                      <input type="radio" id="rating-2" name="rating" value="2" /><label
                                        htmlFor="rating-2">2</label>
                                      <input type="radio" id="rating-1" name="rating" value="1" /><label
                                        htmlFor="rating-1">1</label>
                                      <input type="radio" id="rating-0" name="rating" value="0"
                                             className="star-cb-clear" /><label htmlFor="rating-0">0</label>
                                    </span>
                                </fieldset>
                            </div>
                        </div>
                        <textarea id="text" placeholder="Оставьте отзыв" />

                        <button type="submit" id="send_button">Отправить</button>
                        <span className="success_msg" id="success_msg" >Ваш отзыв успешно отправлен!</span>
                    </form>
                )}
            />
        </div>
        <ReviewsList />
    </div>
};

export default Reviews;