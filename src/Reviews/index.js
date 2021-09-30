import React, {useState} from "react";
import { Form, Field } from 'react-final-form'
import ReactStars from "react-rating-stars-component";

import ReviewsList from "../components/ReviewsList";

import './style.css';
import {addReview_reducer} from "./reducer";


const Reviews = props => {

    const [success, setSuccess] = useState(null);

    const submitForm = (e,f) => {
        addReview_reducer(
            props.market,
            e.name,
            e.text,
            e.rating,
            e.company
        ).then((response)=>{
            setSuccess(response.data.data.addReview.success);
            props.updateReviews();
            f.reset();
        })
    }

    const reviewValidator = (values) => {
        const errors = {}
            if (!values.name) {
                errors.name = "required"
            }
            if (!values.text) {
                errors.text = "required"
            }
            if (!values.company || values.company === 0) {
                errors.company = "required"
            }
            if (!values.rating) {
                errors.rating = "required"
            }
        return errors
    }

    return <div className="reviews">
        <div className="review_form">
            <h1 className="title">{props.data ? props.data.header : ""}</h1>
            <Form
                onSubmit={submitForm}
                validate={reviewValidator}
                render={({form, handleSubmit}) => (
                    <form onSubmit={event => {
                        handleSubmit(event, form)
                    }}>
                        <Field name="name">{({input,meta})=>(
                            <input {...input} type="text" placeholder={props.data ? props.data.form.name : ""} style={!success && meta.touched && meta.error ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                        )}</Field>
                        <div className="company">
                            <Field name="company">
                                {({input,meta})=>(
                                    <select {...input} style={!success && meta.touched && meta.error ? {boxShadow: "0 0 5px -2px red"} : {}}>
                                        <option value={0} hidden={true}>
                                            {props.data ? props.data.form.select_organization : ""}
                                        </option>
                                        {props.offers.map((item,key)=>(
                                            <option key={key} value={item.id}>{item.title}</option>
                                        ))}
                                    </select>
                                )}
                            </Field>
                            <div>
                                <span id="rating">{props.data ? props.data.form.rating : ""}</span>
                                <Field name="rating" defaultValue={4}>
                                    {({input, meta})=> (
                                        <ReactStars
                                            classNames="rating"
                                            count={5}
                                            value={input.value}
                                            onChange={input.onChange}
                                            size={18}
                                            activeColor="#ffd700"
                                        />
                                    )}
                                </Field>
                            </div>
                        </div>
                        <Field name="text">
                            {({input, meta})=>(
                                <textarea {...input} placeholder={props.data ? props.data.form.input_placeholder : ""} style={!success && meta.touched && meta.error ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                            )}
                        </Field>
                        <button type="submit" id="send_button" >{props.data ? props.data.form.button : ""}</button>
                        <span className="success_msg" id="success_msg" style={success ? {display: "block"} : {display: "none"}}>{props.data ? props.data.success_message : ""}</span>
                    </form>
                )}
            />
        </div>
        <ReviewsList data={props.data} reviews={props.reviews}/>
    </div>
};

export default Reviews;