import React, {useEffect, useState} from "react";
import {addOrUpdateContent, listContent, removeContent} from "./reducer";
import {Field, Form} from "react-final-form";

const Content = props => {
    const [market, setMarket] = useState("ua");
    const [contents, setContents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditForm, setIsEditForm] = useState(false);
    const [editContent, setEditContent] = useState(false);

    const ListContent = () => {
        listContent(market).then((response)=>{
            const data = response.data.data.listContent;
            setContents(data.contents);
            setIsLoading(false);
        });
    }

    const switchToEditForm = (id) => {
        setIsEditForm(true);
        setEditContent(contents.filter((item)=>(item.id === id))[0]);
    }

    const _addOrUpdateContent = (values, f) => {
        values.market = market
        setIsLoading(true);
        addOrUpdateContent(
            props.user.key,
            values,
            isEditForm
        ).then(response=>{
            ListContent();
            f.reset();
        })
    }

    const _removeContent = (id) => {
        setIsLoading(true);
        removeContent(
            props.user.key,
            id
        ).then(response=>{
            ListContent();
        })
    }

    useEffect(()=>{
        ListContent();
    },[setContents])

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
                <button className="btn btn-primary" style={{margin: "24px auto", display: "block"}} onClick={()=>{
                    setIsLoading(true);
                    ListContent();
                }}>Выбрать</button>
            </div>
            <div className="col-6">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Заголовок страницы</th>
                        <th scope="col">Язык</th>
                        <th scope="col">Логотип</th>
                        <th scope="col">Рынок</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    {contents ? contents.map((item,key)=>(
                        <tr key={key}>
                            <th scope="row"><a className="btn btn-link" onClick={()=>{switchToEditForm(item.id)}}>{item.id}</a></th>
                            <td>{item.title}</td>
                            <td>{item.language}</td>
                            <td>{item.logotype}</td>
                            <td>{item.market}</td>
                            <td><button className="btn btn-danger" onClick={()=>{_removeContent(item.id)}}>x</button></td>
                        </tr>
                    )) : ""}
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                <h2>Добавление оффера</h2>
                <Form
                    onSubmit={_addOrUpdateContent}
                    mutators={{
                        fillForm: ([values], state, {changeValue}) => {
                            changeValue(state, "id", ()=> values.content.id);
                            changeValue(state, "logotype", ()=> values.content.logotype);
                            changeValue(state, "language", ()=> values.content.language);
                            changeValue(state, "title", ()=> values.content.title);
                            changeValue(state, "metaTitle", ()=> values.content.meta.title);
                            changeValue(state, "metaDescription", ()=> values.content.meta.description);
                            changeValue(state, "metaKeywords", ()=> values.content.meta.keywords);
                            changeValue(state, "header", ()=> values.content.header);
                            changeValue(state, "faqHeader", ()=> values.content.faq_header);
                            changeValue(state, "description", ()=> values.content.description);
                            changeValue(state, "calcButton", ()=> values.content.calc.button);
                            changeValue(state, "calcAmountLabel", ()=> values.content.calc.amount.label);
                            changeValue(state, "calcAmountPlaceholder", ()=> values.content.calc.amount.placeholder);
                            changeValue(state, "calcTermLabel", ()=> values.content.calc.term.label);
                            changeValue(state, "calcTermPlaceholder", ()=> values.content.calc.term.placeholder);
                            changeValue(state, "adsParagraph", ()=> values.content.ads.paragraph);
                            changeValue(state, "adsImage", ()=> values.content.ads.image);
                            changeValue(state, "offerAmount", ()=> values.content.offer.amount);
                            changeValue(state, "offerTime", ()=> values.content.offer.time.title);
                            changeValue(state, "offerTimeUnits", ()=> values.content.offer.time.units);
                            changeValue(state, "offerTermUnits", ()=> values.content.offer.term.units);
                            changeValue(state, "offerRateUnits", ()=> values.content.offer.rate.units);
                            changeValue(state, "offerTerm", ()=> values.content.offer.term.title);
                            changeValue(state, "offerRate", ()=> values.content.offer.rate.title);
                            changeValue(state, "offerButton", ()=> values.content.offer.button);
                            changeValue(state, "filterHeader", ()=> values.content.filter.header);
                            changeValue(state, "filterAmount", ()=> values.content.filter.amount);
                            changeValue(state, "filterTerm", ()=> values.content.filter.term);
                            changeValue(state, "filterRate", ()=> values.content.filter.rate);
                            changeValue(state, "filterPopular", ()=> values.content.filter.popular);
                            changeValue(state, "footerParagraph", ()=> values.content.footer.paragraph);
                            changeValue(state, "footerPartnersHeader", ()=> values.content.footer.partners_header);
                            changeValue(state, "topTitle", ()=> values.content.top.title);
                            changeValue(state, "footerLegalAddress", ()=> values.content.footer.legal_address);
                            changeValue(state, "topTableColumnAmount", ()=> values.content.top.table_columns.amount);
                            changeValue(state, "topTableColumnTerm", ()=> values.content.top.table_columns.term);
                            changeValue(state, "topTableColumnRate", ()=> values.content.top.table_columns.rate);
                            changeValue(state, "topTableColumnCompany", ()=> values.content.top.table_columns.company);
                            changeValue(state, "reviewHeader", ()=> values.content.review.header);
                            changeValue(state, "reviewFormName", ()=> values.content.review.form.name);
                            changeValue(state, "reviewFormSelectOrganization", ()=> values.content.review.form.select_organization);
                            changeValue(state, "reviewFormInputPlaceholder", ()=> values.content.review.form.input_placeholder);
                            changeValue(state, "reviewFormRating", ()=> values.content.review.form.rating);
                            changeValue(state, "reviewFormButton", ()=> values.content.review.form.button);
                            changeValue(state, "reviewSuccessMessage", ()=> values.content.review.success_message);
                            changeValue(state, "reviewListHeader", ()=> values.content.review.list.header);
                            changeValue(state, "reviewListLoader", ()=> values.content.review.list.loader);
                        },
                        resetIdField: (args,state,{changeValue}) => {
                            changeValue(state,'id',()=>null)
                        }
                    }}
                    render={({form, handleSubmit})=>(
                        <form onSubmit={event=>handleSubmit(event,form)}>
                            {isEditForm ? <div className="btn-group">
                                <a className="btn btn-primary" onClick={()=>{
                                    form.mutators.fillForm({content: editContent})
                                }}>Заполнить</a>
                                <a className="btn btn-danger ml-5" onClick={()=>{
                                    form.mutators.resetIdField()
                                    setIsEditForm(false);
                                }}>Отменить</a>
                            </div> : ''}
                            {isEditForm ? <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Идентификатор</label>
                                <Field name="id">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div> : ""}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Ссылка на логотип</label>
                                <Field name="logotype">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Язык</label>
                                <Field name="language">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заголовок страницы</label>
                                <Field name="title">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Мета заголовок</label>
                                <Field name="metaTitle">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Мета описание</label>
                                <Field name="metaDescription">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Мета ключевые слова</label>
                                <Field name="metaKeywords">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заголовок калькулятора</label>
                                <Field name="header">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Описание калькулятора</label>
                                <Field name="description">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Кнопка калькулятора</label>
                                <Field name="calcButton">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Лейбл поля ввода суммы</label>
                                <Field name="calcAmountLabel">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заглушка поля ввода суммы</label>
                                <Field name="calcAmountPlaceholder">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Лейбл поля ввода срока</label>
                                <Field name="calcTermLabel">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заглушка поля ввода срока</label>
                                <Field name="calcTermPlaceholder">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Текст рекламы</label>
                                <Field name="adsParagraph">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Ссылка на картинку рекламы</label>
                                <Field name="adsImage">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Сумма на карточке оффера</label>
                                <Field name="offerAmount">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Время на карточке оффера</label>
                                <Field name="offerTime">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Единицы времени на карточке оффера</label>
                                <Field name="offerTimeUnits">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Срок на карточке оффера</label>
                                <Field name="offerTerm">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Единицы срока на карточке оффера</label>
                                <Field name="offerTermUnits">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Ставка на карточке оффера</label>
                                <Field name="offerRate">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Идиницы ставки на карточке оффера</label>
                                <Field name="offerRateUnits">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Кнопка на карточке оффера</label>
                                <Field name="offerButton">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заголовок блока сортировки</label>
                                <Field name="filterHeader">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Сортировка по сумме</label>
                                <Field name="filterAmount">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Сортировка по сроку</label>
                                <Field name="filterTerm">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Сортировка по ставке</label>
                                <Field name="filterRate">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Сортировка по популярности</label>
                                <Field name="filterPopular">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заголовок топа МФО</label>
                                <Field name="topTitle">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Колонка суммы топа МФО</label>
                                <Field name="topTableColumnAmount">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Колонка срока топа МФО</label>
                                <Field name="topTableColumnTerm">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Колонка ставки топа МФО</label>
                                <Field name="topTableColumnRate">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Колонка МФО топа МФО</label>
                                <Field name="topTableColumnCompany">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заголовок блока отзывов</label>
                                <Field name="reviewHeader">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Форма отпраки отзыва - Имя</label>
                                <Field name="reviewFormName">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Форма отпраки отзыва - МФО</label>
                                <Field name="reviewFormSelectOrganization">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Форма отпраки отзыва - Текст</label>
                                <Field name="reviewFormInputPlaceholder">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Форма отпраки отзыва - Оценка</label>
                                <Field name="reviewFormRating">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Форма отпраки отзыва - Кнопка</label>
                                <Field name="reviewFormButton">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Форма отпраки отзыва - сообщение об отправке</label>
                                <Field name="reviewSuccessMessage">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заголовок списка отзывов</label>
                                <Field name="reviewListHeader">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Список отзывов - Кнопка добавить еще</label>
                                <Field name="reviewListLoader">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Заголовок FAQ</label>
                                <Field name="faqHeader">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Юридический адрес в футере</label>
                                <Field name="footerLegalAddress">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Текст футера</label>
                                <Field name="footerParagraph">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Партнеры в футере</label>
                                <Field name="footerPartnersHeader">
                                    {({input, meta})=>(
                                        <input {...input} required={true} className="form-control" />
                                    )}
                                </Field>
                            </div>


                            <button className={`btn btn-${isEditForm ? "danger": "primary"}`} style={{marginTop: 10}}>{isEditForm ? 'Сохранить' : 'Добавить'}</button>
                        </form>
                    )}
                />
            </div>
        </div>
    </div>
}

export default Content;