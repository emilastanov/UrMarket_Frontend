import React, {useEffect, useState} from "react";
import {Form, Field} from "react-final-form";

import {addNewUser, deleteUser, userList} from "./reducer";

const Users = props => {
    const [isShow, setIsShow] = useState(false);
    const [usersList, setUsersList] = useState(null);
    const [isShowForm, setIsShowForm] = useState(false);

    const logout = () => {
        localStorage.removeItem("token")
        window.location = "/"
    }

    const getUsersList = () => {
        userList(props.data.key).then((response)=> {
            const users = response.data.data.listUsers.users
            console.log(users)
            setUsersList(users)
        })
    }

    const addUser = (e) => {
        addNewUser(props.data.key, e.name, e.role).then((response)=>{
            const resp = response.data;
            console.log(resp)
            if (resp.data.addUser.success){
                getUsersList();
                setIsShowForm(false);
            }
        })
    }

    const deleteUserById = (id) => {
        deleteUser(props.data.key, id).then((response)=>{
            const resp = response.data;
            console.log(resp)
            if (resp.data.removeUser.success){
                getUsersList();
            }
        })
    }

    useEffect(()=>{
        if (props.data) {
            getUsersList()
        }
    },[props.data])

    return <div className="content p-5">
        <div className="row">
            <div className="col-6">
                <div className="card text-center">
                    <div className="card-header">
                        Карточка пользвателя
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{props.data ? props.data.name : ""}</h5>
                        <p className="card-text">Роль: <b>{props.data ? props.data.permission : ""}</b></p>
                        <div className="input-group mb-3" style={{width: "70%", margin: "0 auto"}}>
                            <input type={isShow ? "text": "password"} className="form-control" value={props.data ? props.data.key : ""} disabled={true}
                                   aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={()=>{setIsShow(!isShow)}}>
                                {isShow ? "Скрыть": "Показать"}
                            </button>
                        </div>
                        <button className="btn btn-primary" onClick={logout}>Выйти</button>
                    </div>
                    <div className="card-footer text-muted">
                        Идентификатор пользователя: {props.data ? props.data.id : ""}
                    </div>
                </div>
            </div>
            <div className="col-6" style={props.data && props.data.permission === "admin" ? {display: "block"} : {display: "none"}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Роль</th>
                        <th scope="col"><button className="btn btn-link p-0" onClick={()=>{setIsShow(!isShow)}}>Ключ</button></th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {usersList ? usersList.map((item, key)=>(
                        <tr key={key}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.permission}</td>
                            <td>{isShow ? item.key : "************************************"}</td>
                            <td><button type="button" className="btn btn-danger" onClick={()=>deleteUserById(item.id)}>x</button></td>
                        </tr>
                    )) : ""}
                    {isShowForm ?
                        <Form
                            onSubmit={addUser}
                            validate={(values)=>{
                                const errors = {};
                                if (!values.name){
                                    errors.name = "Error"
                                }
                                if (!values.role){
                                    errors.role = "Error"
                                }
                                return errors
                            }}
                            render={({handleSubmit})=>(
                            <tr>
                                <td/>
                                <td>
                                    <Field name="name">
                                        {({input, meta})=> (
                                            <input {...input} type="text" className="form-control" placeholder="Имя" style={meta.error && meta.touched ? {boxShadow: "0 0 5px -1px red"}: {}}/>
                                        )}
                                    </Field>
                                </td>
                                <td>
                                    <Field name="role">
                                        {({input, meta})=> (
                                            <input {...input} type="text" className="form-control" placeholder="Роль" style={meta.error && meta.touched ? {boxShadow: "0 0 5px -1px red"}: {}}/>
                                        )}
                                    </Field>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={handleSubmit} style={{marginRight: 8}}>Добавить</button>
                                    <button type="button" className="btn btn-danger" onClick={()=>setIsShowForm(false)}>Отменить</button>
                                </td>
                            </tr>
                        )}/>:
                        <tr>
                            <td colSpan="4" className="text-center"><button className="btn btn-primary" onClick={()=>setIsShowForm(true)}>Добавить</button></td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default Users