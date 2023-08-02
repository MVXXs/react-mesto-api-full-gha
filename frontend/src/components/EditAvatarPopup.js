import {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatar = useRef({});

    function handleSubmit(evt) {
        evt.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatar.current.value,
        });
    } 

    return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={'Сохранить'}>
        <div className="popup__field">
            <input type="url" name="avatar" className="popup__input popup__input_type_link" id="avatar-input" placeholder="Ссылка на картинку" ref={avatar} required />
            <span className="popup__error avatar-input-error"></span>
        </div>
    </PopupWithForm>
    )
}