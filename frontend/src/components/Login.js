import React, { useState } from "react";

export default function Login(props) {
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
        props.onLogin(password, email);
    }

    return (
      <div className="auth" >
          <h2 className="auth__title">Вход</h2>
          <form className="auth__form" name="login" onSubmit={handleSubmit} noValidate>
              <input className="auth__input" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailInput} required />
              <input className="auth__input" type="password" name="password" placeholder="Пароль" value={password} onChange={handlePasswordInput} required />
              <button className="auth__saved" type="submit">Войти</button>
          </form>
      </div>
    )
}