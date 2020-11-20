class Auth {
  constructor() {
    this.isAuthenticated = false;
  }

  // login(cb) {
  //   this._isAuthenticated = true;
  //   cb();
  // }
  login() {
    this._isAuthenticated = true;
  }

  // logout(cb) {
  //   this._isAuthenticated = false;
  //   cb();
  // }
  logout() {
    this._isAuthenticated = false;
  }

  status() {
    const token = localStorage.getItem("Token");
    return token !== null && token !== "";
  }
}

export default new Auth();
