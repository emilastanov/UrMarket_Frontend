import React, {useEffect, useState} from "react";
import {Form, Field} from "react-final-form";

import {getMarkets} from "../AdminPanel/reducer";
import {addMarket, removeMarket} from "./reducer";



const Market = props => {

    const [markets, setMarkets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const listMarkets = () => {
        getMarkets().then((response)=>{
            setMarkets(response.data.data.listMarkets.markets);
            setIsLoading(false);
        })
    }

    const RemoveMarket = (id) => {
        setIsLoading(true);
        removeMarket(props.user.key, id).then((response)=>{
            listMarkets();
            props.listMarkets();
        })
    }

    const AddMarket = (values,f) => {
        setIsLoading(true);
        addMarket(props.user.key, values.value, values.description).then((response)=>{
            listMarkets();
            props.listMarkets();
            f.reset();
        })
    }

    useEffect(()=>{
        listMarkets();
    },[setMarkets])

    return <div className="content p-5">
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            heigth: "100vh",
            background: "rgba(128, 128, 128, 0.89)",
            transition: "200ms",
            opacity: isLoading? 1 : 0,
            zIndex: isLoading ? 100 : -100
        }}><h2 style={{
            position: "absolute",
            width: 200,
            height: 50,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto"
        }}>Загрузка...</h2></div>
        <div className="row">
            <div className="col-6" style={{borderRight: "1px solid grey"}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Значение</th>
                        <th scope="col">Описание</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    {markets ? markets.map((item,key)=>(
                        <tr key={key}>
                            <th scope="row">{item.id}</th>
                            <td>{item.value}</td>
                            <td>{item.description}</td>
                            <td><button className="btn btn-danger" onClick={()=>{RemoveMarket(item.id)}}>x</button></td>
                        </tr>
                    )) : ""}
                    </tbody>
                </table>
            </div>
            <div className="col-6">
                <Form
                    onSubmit={AddMarket}
                    validate={(values)=>{
                        const errors = {};
                        if (!values.value) {
                            errors.value = "required"
                        }
                        if (!values.description) {
                            errors.description = "required"
                        }
                        return errors
                    }}
                    render={({form, handleSubmit})=>(
                        <form onSubmit={e=>handleSubmit(e,form)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Значение</label>
                                <Field name="value">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Описание</label>
                                <Field name="description">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <button className="btn btn-primary" style={{marginTop: 10}}>Добавить</button>
                        </form>
                    )}
                />
            </div>
        </div>
    </div>
}

export default Market