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
    return this._isAuthenticated;
  }
}

export default new Auth();
