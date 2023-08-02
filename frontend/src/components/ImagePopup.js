import React from "react";

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.link ? "popup_opened" : ''}`}>
        <div className="popup__image-container">
            <button className="popup__closed" type="button" onClick={props.onClose}></button>
            <img src={props.card ? props.card.link : ''} alt={`изображение ${props.card.name}`} className="popup__img" />
            <p className="popup__img-text">{props.card ? props.card.name : ''}</p>
        </div>
    </div>
  )
}