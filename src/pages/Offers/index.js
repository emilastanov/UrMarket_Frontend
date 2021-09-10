import React, {useEffect, useState} from "react";
import {getOffers} from "../Main/reducer";
import {offerSwitcher, addOffer, uploadImg, removeOffer} from "./reducer";
import {Form, Field} from "react-final-form";

const Offers = props => {

    const [market, setMarket] = useState("ua");
    const [offers, setOffers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState(null);


    const markets = [
        {value: "kz", name: "Казахстан"},
        {value: "ua", name: "Украина"}
    ];

    const offersList = () => {
        getOffers(market).then((response)=>{
            const resp = response.data;
            setOffers(resp.data.listOffers.offers.sort((a,b)=>(a.id-b.id)))
            setIsLoading(false)
        })
    }

    const switchOffer = (id,state) => {
        setIsLoading(true)
        offerSwitcher(props.user.key, id, state).then((response)=>{
            offersList()
        })
    }

    const _removeOffer = (id) => {
        setIsLoading(true)
        removeOffer(props.user.key, id).then((response)=> {
            offersList()
        })
    }

    const _addOffer = (e) => {
        setIsLoading(true)
        uploadImg(file).then((response)=>{
            const logotype = response.data.out;
            addOffer(
                props.user.key,
                e.title,
                e.description,
                logotype,
                e.link,
                e.rate,
                e.isShow === undefined? false : e.isShow,
                e.amountMin,
                e.amountMax,
                e.amountSymbol,
                e.termMin,
                e.termMax,
                e.rating,
                e.processingTimeMin,
                e.processingTimeMax,
                e.processingMethods,
                e.requirementsAgeMin,
                e.requirementsAgeMax,
                e.requirementsIncome ? e.requirementsIncome : 0,
                e.requirementsIncomeProof === undefined ? false : e.requirementsIncomeProof,
                e.requirementsDocuments,
                e.requirementsUkrainNationality === undefined ? false : e.requirementsUkrainNationality,
                e.requirementsSpecial ? e.requirementsSpecial : "",
                e.market
            ).then(resp=>{
                offersList();
            })
        })
    }

    const _addOfferValidator = (values) => {
        const errors = {}

        if (!values.title){
            errors.title = "required"
        }
        if (!values.market){
            errors.title = "required"
        }
        if (!values.description){
            errors.description = "required"
        }
        if (!values.logotype){
            errors.logotype = "required"
        }
        if (values.logotype && values.logotype.split('.').slice(-1)[0] !== "png") {
            errors.logotype = "bad_format"
        }
        if (!values.link){
            errors.link = "required"
        }
        if (!values.rate){
            errors.rate = "required"
        }
        if (!values.amountMin){
            errors.amountMin = "required"
        }
        if (!values.amountMax){
            errors.amountMax = "required"
        }
        if (!values.amountSymbol){
            errors.amountSymbol = "required"
        }
        if (!values.termMin){
            errors.termMin = "required"
        }
        if (!values.termMax){
            errors.termMax = "required"
        }
        if (!values.rating){
            errors.rating = "required"
        }
        if (!values.processingTimeMin){
            errors.processingTimeMin = "required"
        }
        if (!values.processingTimeMax){
            errors.processingTimeMax = "required"
        }
        if (!values.processingMethods){
            errors.processingMethods = "required"
        }
        if (!values.requirementsAgeMin){
            errors.requirementsAgeMin = "required"
        }
        if (!values.requirementsAgeMax){
            errors.requirementsAgeMax = "required"
        }
        if (!values.requirementsDocuments){
            errors.requirementsDocuments = "required"
        }

        return errors
    }

    useEffect(()=>{
        offersList()
    },[setMarket])

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
                <select disabled={true} defaultValue={market} className="form-select" aria-label="Default select example" onChange={(e)=>{
                    setMarket(e.target.value)
                }}>
                    {markets.map((item,key)=>(
                        <option key={key} value={item.value}>{item.name}</option>
                    ))}
                </select>
                <button className="btn btn-primary disabled" style={{margin: "24px auto", display: "block"}} onClick={offersList}>Выбрать</button>
            </div>
            <div className="col-6" style={{borderRight: "1px solid grey"}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Рынок</th>
                        <th scope="col">Приоритет</th>
                        <th scope="col">Показывается</th>
                        <th scope="col"/>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {offers ? offers.map((item,key)=>(
                        <tr key={key}>
                            <th scope="row">{item.id}</th>
                            <td>{item.title}</td>
                            <td>{item.market}</td>
                            <td>{item.rating}</td>
                            <td>{item.is_show ? "Да": "Нет"}</td>
                            <td>
                                <button className={`btn btn-${item.is_show ? "danger" : "success"}`} onClick={()=>{switchOffer(item.id, !item.is_show)}}>{item.is_show ? "Скрыть" : "Показать"}</button>
                            </td>
                            <td>
                                <button className={`btn btn-danger`} onClick={()=>{_removeOffer(item.id)}}>x</button>
                            </td>
                        </tr>
                    )) : ""}
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                <h2>Добавление оффера</h2>
                <Form
                    onSubmit={_addOffer}
                    validate={_addOfferValidator}
                    render={({handleSubmit})=>(
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Обложка оффера</label>
                                <Field name="logotype">
                                    {({input, meta})=>(
                                        <React.Fragment>
                                            <input {...input} onChange={(e)=>{input.onChange(e); setFile(e.target.files[0])}} className="form-control" type="file" id="formFile" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                            <div id="passwordHelpBlock" className="form-text" style={meta.error === "bad_format" && meta.touched ? {color: "red"} : {}}>
                                                Изображение должно быть в формате png с прозрачным фоном.
                                            </div>
                                        </React.Fragment>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Название МФО</label>
                                <Field name="title">
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
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Реферальная ссылка</label>
                                <Field name="link">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Реферальная ссылка</label>
                                <Field name="market">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Ставка</label>
                                <Field name="rate">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Приоритет</label>
                                <Field name="rating">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Сумма</label>
                                <div className="input-group">
                                    <Field name="amountMin">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Минимальная" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                    <Field name="amountMax">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Максимальная" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                    <Field name="amountSymbol">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Валюта" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Срок</label>
                                <div className="input-group">
                                    <Field name="termMin">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Минимальный" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                    <Field name="termMax">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Максимальный" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Время выдачи</label>
                                <div className="input-group">
                                    <Field name="processingTimeMin">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Минимальное" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                    <Field name="processingTimeMax">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Максимальное" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Способы выдачи</label>
                                <Field name="processingMethods">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" placeholder="Например: на карту,на qiwi" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Возраст</label>
                                <div className="input-group">
                                    <Field name="requirementsAgeMin">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Минимальный" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                    <Field name="requirementsAgeMax">
                                        {({input, meta})=>(
                                            <input {...input} className="form-control" placeholder="Максимальный" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Документы</label>
                                <Field name="requirementsDocuments">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" placeholder="Например: паспорт,водительское удостоверение" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Особенности</label>
                                <Field name="requirementsSpecial">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" placeholder="Например: Режим работы с 9:00 до 10:00"/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Доход</label>
                                <Field name="requirementsIncome">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="form-check form-switch">
                                <Field name="requirementsIncomeProof" type="checkbox">
                                    {({input, meta})=>(
                                        <input {...input} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  />
                                    )}
                                </Field>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Требуется подтверждение дохода</label>
                            </div>
                            <div className="form-check form-switch">
                                <Field name="requirementsUkrainNationality" type="checkbox">
                                    {({input, meta})=>(
                                        <input {...input} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault2"  />
                                    )}
                                </Field>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault2">Гражданство обязательно</label>
                            </div>
                            <div className="form-check form-switch">
                                <Field name="isShow" type="checkbox">
                                    {({input, meta})=>(
                                        <input {...input} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault1"  />
                                    )}
                                </Field>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault1">Отобразить в выдаче</label>
                            </div>
                            <button className="btn btn-primary" style={{marginTop: 10}}>Добавить</button>
                        </form>
                    )}
                />
            </div>
        </div>
    </div>
}

export default Offers;