import { authConfig } from "./constants";

class Auth {
  constructor(authConfig) {
    this._url = authConfig.url;
    this._headers = authConfig.headers;
  }
  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    })
    .then(this._chechResponse);
  }
  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    })
    .then(this._chechResponse);
  }
  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
    } 
    })
    .then(this._chechResponse);
  }

  _chechResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const auth = new Auth(authConfig);
