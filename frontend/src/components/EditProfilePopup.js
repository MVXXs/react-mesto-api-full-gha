import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup(props) {

    const [name, setName] = useState({});
    const [description, setDescription] = useState({});

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
        <div className="popup__field">
            <input type="text" name="name" className="popup__input popup__input_type_name" id="name" placeholder="Имя" minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} required />
            <span className="popup__error name-error"></span>
        </div>
        <div className="popup__field">
            <input type="text" name="about" className="popup__input popup__input_type_about" id="about" placeholder="О себе" minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} required />
            <span className="popup__error about-error"></span>
        </div>
    </PopupWithForm>
    )
}