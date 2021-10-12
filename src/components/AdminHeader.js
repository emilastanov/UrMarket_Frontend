import React from "react";

import {Link} from "react-router-dom";


const AdminHeader = props => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{borderBottom: "1px solid grey"}}>
        <div className="container-fluid">
            <a className="navbar-brand" href="/">UrMarket | <span style={{color: "grey"}}>{props.user ? props.user.permission : ""}</span></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={`nav-link ${window.location.pathname === "/admin/content"? "active" : ""}`} to="/admin/content">Контент</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${window.location.pathname === "/admin/offer"? "active" : ""}`} aria-current="page" to="/admin/offer">Офферы</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${window.location.pathname === "/admin/faq"? "active" : ""}`} to="/admin/faq">FAQ</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${window.location.pathname === "/admin/reviews"? "active" : ""}`} to="/admin/reviews">Отзывы</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${window.location.pathname === "/admin/market"? "active" : ""}`} to="/admin/market">Рынки</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${window.location.pathname === "/admin/cards"? "active" : ""}`} to="/admin/cards">Кредитные карты</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${window.location.pathname === "/admin"? "active" : ""}`} to="/admin">Пользователи</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default AdminHeader;