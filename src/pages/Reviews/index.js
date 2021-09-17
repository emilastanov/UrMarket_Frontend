import React, {useEffect, useState} from 'react';
import {getReviews} from "../Main/reducer";
import {removeReview} from "./reducer";

const Review = props => {

    const [market, setMarket] = useState("ua");
    const [reviews, setReviews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const RemoveReview = (id) => {
        setIsLoading(true);
        removeReview(props.user.key, id).then(()=>{
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        getReviews(market).then((response)=>{
            const reviews = response.data.data.listReviews.reviews

            setReviews(reviews);

            setIsLoading(false);

        })
    }, [reviews])

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
                    {props.markets ? props.markets.map((item,key)=>(
                        <option key={key} value={item.value}>{item.description}</option>
                    )) : ""}
                </select>
                <button className="btn btn-primary disabled" style={{margin: "24px auto", display: "block"}} >Выбрать</button>
            </div>
            <div className="col-10" style={{borderRight: "1px solid grey"}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Компания</th>
                        <th scope="col">Рейтинг</th>
                        <th scope="col">Текст</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {reviews ? reviews.map((item,key)=>(
                        <tr key={key}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.company.title}</td>
                            <td>{item.rating}</td>
                            <td>{item.text}</td>
                            <td><button className="btn btn-danger" onClick={()=>{RemoveReview(item.id)}}>x</button></td>
                        </tr>
                    )) : ""}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default Review;