class Api {
    constructor(item) {
        this._baseUrl = item.baseUrl;
    }

    _checkDataError(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then (this._checkDataError);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then (this._checkDataError);
    }

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then (this._checkDataError);
    }

    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then (this._checkDataError);
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then (this._checkDataError);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then (this._checkDataError);
    }

    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then (this._checkDataError);
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then (this._checkDataError);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.setLike(id);
        }
        return this.deleteLike(id);
    }
}

export const apiInfo = new Api({ baseUrl: 'https://api.mvxxs.nomoreparties.co' });