import React from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const user = {};
  const isAuth = () => {
    const token = localStorage.getItem("Token");
    return token !== null && token !== "";
  }

  const auth = {
    isAuth,
    user
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}