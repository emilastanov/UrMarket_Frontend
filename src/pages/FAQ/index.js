import React, {useEffect, useState} from "react";
import {getFAQ} from "../Main/reducer";
import {Form, Field} from "react-final-form";
import {addFaq, removeFaq} from "./reducer";

const FAQ = props => {

    const [market, setMarket] = useState("ua");
    const [language, setLanguage] = useState("ru");
    const [list,setList] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const getFaq = () => {
        getFAQ(market, language).then(response=>{
            setList(response.data.data.listFAQ.list_faq)
            setIsLoading(false)
        })
    }

    const addFAQ = (values, f) => {
        setIsLoading(true)
        addFaq(props.user.key,values.question,values.answer,language, market).then((response)=>{
            getFaq();
            f.reset();
        })
    }

    const removeFAQ = id => {
        setIsLoading(true)
        removeFaq(props.user.key,id).then(response=>{
            getFaq();
        })
    }

    useEffect(()=>{
        getFaq();
    }, [setList, setLanguage, setMarket])

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
            <div className="col-2" style={{borderRight: "1px solid grey"}}>
                <h3>Рынок</h3>
                <select defaultValue={market} className="form-select" aria-label="Default select example" onChange={(e)=>{
                    setMarket(e.target.value)
                }}>
                    {props.markets ? props.markets.map((item,key)=>(
                        <option key={key} value={item.value}>{item.description}</option>
                    )) : ""}
                </select>
                <h3 className="mt-3">Язык</h3>
                <select defaultValue={language} className="form-select" aria-label="Default select example" onChange={(e)=>{
                    setLanguage(e.target.value)
                }}>
                    <option value="ru">Русский</option>
                    <option value="ua">Украинский</option>
                    <option value="kz">Казахский</option>
                    <option value="cc">Кредитные карты</option>
                </select>
                <button className="btn btn-primary" style={{margin: "24px auto", display: "block"}} onClick={()=>{
                    getFaq()
                }}>Выбрать</button>
            </div>
            <div className="col-6" style={{borderRight: "1px solid grey"}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Вопрос</th>
                        <th scope="col">Ответ</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    {list ? list.map((item,key)=>(
                        <tr key={key}>
                            <th scope="row">{item.id}</th>
                            <td>{item.question}</td>
                            <td>{item.answer}</td>
                            <td><button className="btn btn-danger" onClick={()=>{removeFAQ(item.id)}}>x</button></td>
                        </tr>
                    )) : ""}
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                <h2>Добавление оффера</h2>
                <Form
                    onSubmit={addFAQ}
                    validate={(value)=>{
                            const errors = {}
                            if (!value.question){
                                errors.question = "required"
                            }
                            if (!value.answer){
                                errors.answer = "required"
                            }
                            return errors;
                        }
                    }
                    render={({form, handleSubmit})=>(
                        <form onSubmit={event=>handleSubmit(event,form)}>
                            <div className="mb-3 ">
                                <div className="input-group">
                                    <Field name="question">
                                        {({input, meta})=>(
                                            <textarea {...input} className="form-control" placeholder="Вопрос" id="floatingTextarea2" style={meta.error && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-3 ">
                                <div className="input-group">
                                    <Field name="answer">
                                        {({input, meta})=>(
                                            <textarea {...input} className="form-control" placeholder="Ответ" id="floatingTextarea2" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Добавить</button>
                        </form>
                    )}
                />
            </div>
        </div>
    </div>
}

export default FAQ;