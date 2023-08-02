import {useState, useEffect} from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import {apiInfo} from '../utils/Api';

import Login from './Login';
import Register from './Register';
import * as auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [infoTooltip, setInfoTooltip] = useState(false);
    const [infoTooltipTitle, setInfoTooltipTitle] = useState('');
    const [infoTooltipIcon, setInfoTooltipIcon] = useState('');

    useEffect(() => {
        if(loggedIn){
        Promise.all([apiInfo.getInitialCards(), apiInfo.getUserInfo()])
            .then((res) => {
                setCurrentUser(res[1]);
                setCards([...res[0]]);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
        }
    }, [loggedIn]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard({name: '', link: ''});
        setInfoTooltip(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        
        apiInfo.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
    } 

    function handleCardDelete(card) {
        apiInfo.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
    }

    function handleUpdateUser(item) {
        apiInfo.editUserInfo(item).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
    }

    function handleUpdateAvatar(item) {
        apiInfo.editAvatar(item).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
    }

    function handleAddPlaceSubmit(card) {
        apiInfo.addNewCard(card).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    console.log(res.email);
                    setEmail(res.email);
                    navigate("/");
                })
                .catch(err => console.log(err));
        }
    }, [navigate]);

    function signOut() {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
    }

    function onRegister() {
        setInfoTooltipIcon("ok");
        setInfoTooltip(true);
        setInfoTooltipTitle("Вы успешно зарегистрировались!");
      }
    
    function onError() {
        setInfoTooltipIcon("error");
        setInfoTooltip(true);
        setInfoTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }

    function handleLogin(password, email) {
        auth.authorize(password, email)
          .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true);
              navigate("/")
          })
          .catch(err => {
              onError();
              console.log(err);
          });
    }

    function handleRegister(password, email) {
        auth.register(password, email)
          .then(() => {
              navigate("/");
              onRegister();
          })
          .catch(err => {
              onError();
              console.log(err);
          });
    }
    
  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header email={email} signOut={signOut} loggedIn={loggedIn}/>
            <Routes>
                <Route path='/' element={<ProtectedRoute element={Main} loggedIn={loggedIn} cards={cards} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} 
                onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />} />
                <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
                <Route path='/sign-in' element={<Login onLogin={handleLogin} setEmail={setEmail}/>} />
            </Routes>
            {loggedIn && <Footer />}
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
            <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip isOpen={infoTooltip} onClose={closeAllPopups} title={infoTooltipTitle} tooltipIcon={infoTooltipIcon}/>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
