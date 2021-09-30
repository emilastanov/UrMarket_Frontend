import React, {useState} from "react";
import {Form, Field} from "react-final-form";

import {login} from "./reducer";

import "./style.css"

const Login = props => {

    const [error, setError] = useState(false)

    props.loader(false);
    const submitForm = (e) => {
        login(e.auth_key).then((response)=>{
            const resp = response.data;
            if (!resp.data.login.success){
                setError(true)
            } else {
                localStorage.setItem("token", e.auth_key);
                window.location = "/admin"
            }
        })
    }
    return <div className="loginForm">
        <h1>Введите ключ администратора</h1>
        <Form
            onSubmit={submitForm}
            validate={(values => {
                let errors = {}
                if (!values.auth_key) {
                    errors.auth_key = "Empty value"
                }
                return errors
            })}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field name="auth_key" >
                        {({input, meta})=>(
                            <React.Fragment>
                                <input {...input} type="text" placeholder="Введите ключ" style={meta.error && meta.touched ? {boxShadow: "0 0 5px -1px red"}: {}}/>
                                <span style={error ? {opacity: 1}: {opacity: 0}}>Неправильный ключ</span>
                            </React.Fragment>

                        )}
                    </Field>
                    <button>Войти</button>
                </form>
            )}
        />
    </div>
}

export default Login;