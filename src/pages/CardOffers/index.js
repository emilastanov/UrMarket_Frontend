import React, {useEffect, useState} from "react";
import {Field, Form} from "react-final-form";

// import {cardOfferSwitcher, removeCreditCardOffer, addOrUpdateCardOffer} from "./reducer";
import {creditCardOffersList} from "../CreditCards/reducer";


const CardOffers = props => {
    const [market, setMarket] = useState("ua");
    const [cardOffers, setCardOffers] = useState(null);
    const [showEditForm, setEditForm] = useState(false);
    const [file, setFile] = useState(null);
    const [editOffer, setEditOffer] = useState(null);

    const getCardOfferList = () => {
        creditCardOffersList(market).then(res=>{
            setCardOffers(res.data.data.listCreditCardOffers.credit_cards);
        })
    }

    useEffect(()=>{
        getCardOfferList()
        console.log(file);
    }, setCardOffers)

    const switchToEditForm = (id) => {
        setEditForm(true);
        setEditOffer(cardOffers.filter((item)=>(item.id === id))[0]);
    }

    return <div className="content p-5">
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
                <button className="btn btn-primary" style={{margin: "24px auto", display: "block"}} onClick={()=>{

                }}>Выбрать</button>
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
                    {cardOffers ? cardOffers.map((item,key)=>(
                        <tr key={key}>
                            <th scope="row"><a className="btn btn-link" onClick={()=>{switchToEditForm(item.id)}}>{item.id}</a></th>
                            <td>{item.title}</td>
                            <td>{item.market}</td>
                            <td>{item.rating}</td>
                            <td>{item.is_show ? "Да": "Нет"}</td>
                            <td>
                                <button className={`btn btn-${item.is_show ? "danger" : "success"}`}>Показать</button>
                            </td>
                            <td>
                                <button className={`btn btn-danger`} >x</button>
                            </td>
                        </tr>
                    )) : ""}
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                <h2>Добавление Кредитной карты</h2>
                <Form
                    onSubmit={()=>{}}
                    render={({form, handleSubmit})=>(
                        <form onSubmit={event=>handleSubmit(event,form)}>
                            {showEditForm ? <div className="btn-group">
                                <a className="btn btn-primary" onClick={()=>{
                                    form.mutators.fillForm({offer: editOffer})
                                }}>Заполнить</a>
                                <a className="btn btn-danger ml-5" onClick={()=>{
                                    form.mutators.resetIdField()
                                    setEditForm(false);
                                }}>Отменить</a>
                            </div> : ''}
                            {showEditForm ? <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Идентификатор</label>
                                <Field name="id">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div> : ""}
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Обложка оффера</label>
                                <Field name="logotype" >
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
                                        <input required={true} {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Описание</label>
                                <Field name="description">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Реферальная ссылка</label>
                                <Field name="link">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Ставка</label>
                                <Field name="rate">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Приоритет</label>
                                <Field name="rating">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Кредитный лимит</label>
                                <Field name="creditLimit">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" />
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
                                            <input {...input} className="form-control" placeholder="Максимальный" />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Документы</label>
                                <Field name="creditDocs">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" placeholder="Например: [Паспорт], [Справка 2-ндфл, Справка по форме банка]" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Коммиссия за снятие</label>
                                <Field name="cashWithdrawal">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" placeholder="Например: 2%, мин 200р" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Тип капты</label>
                                <Field name="cardType">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" placeholder="Например: Visa" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Грейс период</label>
                                <Field name="gracePeriod">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control"  />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Плата за обслуживание</label>
                                <Field name="servicePayment">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control"  />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Минимальный доход</label>
                                <Field name="salaryMinimumSalary">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Минимальный доход для регионов</label>
                                <Field name="salaryMinimumSalaryMainRegions">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Регионы</label>
                                <Field name="salaryMainRegions">
                                    {({input, meta})=>(
                                        <input {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="form-check form-switch">
                                <Field name="onlyIndividual" type="checkbox">
                                    {({input, meta})=>(
                                        <input {...input} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  />
                                    )}
                                </Field>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Только для физ. лиц</label>
                            </div>
                            <div className="form-check form-switch">
                                <Field name="isShow" type="checkbox">
                                    {({input, meta})=>(
                                        <input {...input} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  />
                                    )}
                                </Field>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Отобразить в выдаче</label>
                            </div>
                            <button className={`btn btn-${showEditForm ? 'danger' : 'primary'}`} style={{marginTop: 10}}>{showEditForm ? "Сохранить" : "Добавить"}</button>
                        </form>
                    )}
                />
            </div>
        </div>
    </div>
};

export default CardOffers;