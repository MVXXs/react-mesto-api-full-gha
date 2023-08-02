import React from "react";

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
            <button className="popup__closed" type="button" onClick={props.onClose}></button>
            <form className="popup__form" name={`${props.name}-profile`} onSubmit={props.onSubmit} noValidate>
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button className="popup__saved" type="submit">{props.buttonText}</button>
            </form>
        </div>
    </div>
  )
}