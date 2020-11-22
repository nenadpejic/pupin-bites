import React from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const isAuth = () => {
    const token = localStorage.getItem("Token");
    return token !== null && token !== "";
  }
  const auth = {
    isAuth
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}