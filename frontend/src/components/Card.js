import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( `element__like ${isLiked && 'element__like_active'}`); 

    function handleCardClick() {
      props.onCardClick(props.card);
    }

    function handleLikeClick() {
      props.onCardLike(props.card);
    }

    function handleDeleteClick() {
      props.onCardDelete(props.card);
    }

  return (
    <article className="element">
    {isOwn && <button className='element__delete' onClick={handleDeleteClick} />} 
    <img src={props.link} alt={`изображение ${props.card.name}`} className="element__image" onClick={handleCardClick}/>
    <div className="element__items">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <span className="element__counter">{props.likes.length}</span>
        </div>
    </div>
</article>
  )
}