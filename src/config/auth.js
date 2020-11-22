class Auth {
  constructor() {
    this.isAuthenticated = false;
  }

  // login(cb) {
  //   this._isAuthenticated = true;
  //   cb;
  // }

  // logout(cb) {
  //   this._isAuthenticated = false;
  //   cb;
  // }

  // isAuth() {
  //   return this._isAuthenticated;
  // }

  status() {
    const token = localStorage.getItem("Token");
    return token !== null && token !== "";
  }
}

export default new Auth();
