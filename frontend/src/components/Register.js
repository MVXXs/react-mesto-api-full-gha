import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    } 

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(password, email);
    }

   return (
    <div className="auth auth_register" >
        <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" name="login" onSubmit={handleSubmit} noValidate>
                <input className="auth__input" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailInput} required />
                <input className="auth__input" type="password" name="password" placeholder="Пароль" value={password} onChange={handlePasswordInput} required />
                <button className="auth__saved" type="submit">Зарегистрироваться</button>
            </form>
        <p className="auth__description">Уже зарегистрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
    </div>
  )
}