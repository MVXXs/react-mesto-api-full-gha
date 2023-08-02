export const BASE_URL = "http://api.mvxxs.nomoreparties.co";

function checkDataError(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => checkDataError(res));
}; 

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => checkDataError(res));
}; 

export const checkToken = (item) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${item}`,
    }
  })
  .then((res) => checkDataError(res));
};