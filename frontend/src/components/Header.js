import React from "react";
import logo from "../images/logo.svg"
import { useLocation, Link } from "react-router-dom"

export default function Header(props) {
    const location = useLocation();
    const path = (location.pathname === "/sign-in") ? "/sign-up" : "/sign-in";
    const LinkName = (location.pathname === "/sign-in") ? "Регистрация" : "Войти";

    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="логотип mesto russia" />
            {props.loggedIn ? (<div className="header__div"><p className="header__email">{props.email}</p>
            <Link className="header__link" to="/sign-in" onClick={props.signOut}>Выйти</Link></div>) : ( <Link className="header__link" to={path}>{LinkName}</Link>)}
        </header>
    )
}
