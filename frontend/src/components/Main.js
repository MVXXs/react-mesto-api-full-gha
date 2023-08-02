import {useContext} from "react";
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
            <div className="profile__avatar">
                <img src={currentUser.avatar} alt="аватарка пользователя" className="profile__image" onClick={props.onEditAvatar}/>
            </div>
            <div className="profile__info">
                <div className="profile__container">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button className="profile__button-edit" type="button" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
            {props.cards.map((item) => (
                <Card card={item} name={item.name} link={item.link} likes={[...item.likes]} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}/>
            ))}
        </section>
    </main>
  )
}