import React from "react";
import ok from "../images/ok.svg";
import error from "../images/error.svg";

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_tooltip ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container-tooltip">
                <button className="popup__closed" type="button" onClick={props.onClose}></button>
                {props.tooltipIcon === "ok" && (<img src={ok} alt="Успешно" />)}
                {props.tooltipIcon === "error" && <img src={error} alt="Произошла ошибка" />}
                <h3 className="popup__title-tooltip">{props.title}</h3>
            </div>
        </div>
    );
  }
  
export default InfoTooltip;