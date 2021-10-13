import React, {useEffect, useState} from "react";
import {Field, Form} from "react-final-form";

import {cardOfferSwitcher, removeCreditCardOffer, addOrUpdateCreditCardOffer} from "./reducer";
import {creditCardOffersList} from "../CreditCards/reducer";
import {uploadImg} from "../Offers/reducer";


const CardOffers = props => {
    const [market, setMarket] = useState("ua");
    const [cardOffers, setCardOffers] = useState(null);
    const [showEditForm, setEditForm] = useState(false);
    const [file, setFile] = useState(null);
    const [editOffer, setEditOffer] = useState(null);


    const getCardOfferList = () => {
        creditCardOffersList(market).then(res=>{
            setCardOffers(res.data.data.listCreditCardOffers.credit_cards.sort((a,b)=>(a.id-b.id)));
        })
    }

    const addOrUpdateCardOffer = (e,f) => {
        if (showEditForm) {
            if (file) {
                uploadImg(file).then((response)=>{
                    e.logotype = response.data.out_original;
                    addOrUpdateCreditCardOffer(
                        props.user.key,
                        e,
                        showEditForm
                    ).then(resp=>{
                        getCardOfferList();
                        f.reset();
                    })
                })
            } else {
                addOrUpdateCreditCardOffer(
                    props.user.key,
                    e,
                    showEditForm
                ).then(resp=>{
                    getCardOfferList();
                    f.reset();
                })
            }
        } else {
            uploadImg(file).then((response)=>{
                e.logotype = response.data.out_original;
                e.isShow = e.isShow === undefined ? false : e.isShow;
                e.market = market
                addOrUpdateCreditCardOffer(
                    props.user.key,
                    e,
                    showEditForm
                ).then(resp=>{
                    getCardOfferList();
                    f.reset();
                })
            })
        }
    }

    const removeCardOffer = (id) => {
        removeCreditCardOffer(props.user.key, id).then((response)=>{
            getCardOfferList()
        })
    }

    const switchCardOffer = (id,state) => {
        cardOfferSwitcher(props.user.key, id, state).then((response)=>{
            getCardOfferList()
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
                    getCardOfferList()
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
                                <button className={`btn btn-${item.is_show ? "danger" : "success"}`} onClick={()=>{switchCardOffer(item.id, !item.is_show)}}>{item.is_show ? "Скрыть" : "Показать"}</button>
                            </td>
                            <td>
                                <button className={`btn btn-danger`} onClick={()=>removeCardOffer(item.id)}>x</button>
                            </td>
                        </tr>
                    )) : ""}
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                <h2>Добавление Кредитной карты</h2>
                <Form
                    onSubmit={addOrUpdateCardOffer}
                    mutators={{
                        fillForm: ([values], state, {changeValue})=>{
                            changeValue(state, "id", ()=> values.cardOffers.id);
                            changeValue(state, "title", ()=> values.cardOffers.title);
                            changeValue(state, "description", ()=> values.cardOffers.description);
                            changeValue(state, "link", ()=> values.cardOffers.link);
                            changeValue(state, "rate", ()=> values.cardOffers.rate);
                            changeValue(state, "isShow", ()=> values.cardOffers.is_show);
                            changeValue(state, "amountSymbol", ()=> values.cardOffers.amount_symbol);
                            changeValue(state, "rating", ()=> values.cardOffers.rating);
                            changeValue(state, "market", ()=> values.cardOffers.market);
                            changeValue(state, "cashWithdrawal", ()=> values.cardOffers.cash_withdrawal);
                            changeValue(state, "cardType", ()=> values.cardOffers.card_type);
                            changeValue(state, "gracePeriod", ()=> values.cardOffers.grace_period);
                            changeValue(state, "servicePayment", ()=> values.cardOffers.service_payment);
                            changeValue(state, "creditLimit", ()=> values.cardOffers.credit_limit);
                            changeValue(state, "creditDocs", ()=> values.cardOffers.credit_docs);
                            changeValue(state, "ageMin", ()=> values.cardOffers.age.min);
                            changeValue(state, "ageMax", ()=> values.cardOffers.age.max);
                            changeValue(state, "onlyIndividual", ()=> values.cardOffers.only_individual);
                            changeValue(state, "minimumWorkExperience", ()=> values.cardOffers.minimum_work_experience);
                            changeValue(state, "minimumCurrentWorkExperience", ()=> values.cardOffers.minimum_current_work_experience);
                            changeValue(state, "salaryMinimumSalary", ()=> values.cardOffers.salary.minimum_salary);
                            changeValue(state, "salaryMinimumSalaryMainRegions", ()=> values.cardOffers.salary.minimum_salary_main_regions);
                            changeValue(state, "salaryMainRegions", ()=> values.cardOffers.salary.main_regions);
                        },
                        resetIdField: (args,state,{changeValue}) => {
                            changeValue(state,'id',()=>null)
                        }
                    }}
                    render={({form, handleSubmit})=>(
                        <form onSubmit={event=>handleSubmit(event,form)}>
                            {showEditForm ? <div className="btn-group">
                                <a className="btn btn-primary" onClick={()=>{
                                    form.mutators.fillForm({cardOffers: editOffer})
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
                                <label htmlFor="exampleInputEmail1" className="form-label">Название Карты</label>
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
                                <label htmlFor="exampleInputEmail1" className="form-label">Символ валюты</label>
                                <Field name="amountSymbol">
                                    {({input, meta})=>(
                                        <select required={true} {...input} defaultValue={0} className="form-control" placeholder="Валюта" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}>
                                            <option value={0} hidden={true}>
                                                Выбрать
                                            </option>
                                            <option value="₴">Гривна ₴</option>
                                            <option value="₽">Рубль ₽</option>
                                            <option value="₸">Тенге ₸</option>
                                        </select>
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Возраст</label>
                                <div className="input-group">
                                    <Field name="ageMin">
                                        {({input, meta})=>(
                                            <input required={true} {...input} className="form-control" placeholder="Минимальный" style={meta.error === "required" && meta.touched ? {boxShadow: "0 0 5px -2px red"} : {}}/>
                                        )}
                                    </Field>
                                    <Field name="ageMax">
                                        {({input, meta})=>(
                                            <input required={true} {...input} className="form-control" placeholder="Максимальный" />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Документы</label>
                                <Field name="creditDocs">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" placeholder="Например: [Паспорт], [Справка 2-ндфл, Справка по форме банка]" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Коммиссия за снятие</label>
                                <Field name="cashWithdrawal">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" placeholder="Например: 2%, мин 200р" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Тип капты</label>
                                <Field name="cardType">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" placeholder="Например: Visa" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Грейс период</label>
                                <Field name="gracePeriod">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control"  />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Плата за обслуживание</label>
                                <Field name="servicePayment">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control"  />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Минимальный доход</label>
                                <Field name="salaryMinimumSalary">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Минимальный доход для регионов</label>
                                <Field name="salaryMinimumSalaryMainRegions">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Регионы</label>
                                <Field name="salaryMainRegions">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Минимальный опыт работы на текущем месте</label>
                                <Field name="minimumCurrentWorkExperience">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Минимальный опыт общий опыт работы</label>
                                <Field name="minimumWorkExperience">
                                    {({input, meta})=>(
                                        <input required={true} {...input} className="form-control" />
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