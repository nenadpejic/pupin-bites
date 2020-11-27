import React from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const user = {
    email: "",
    firstName: "",
    lastName: "",
    id: "",
    password: "",
  };

  const time = 30;

  const isAuth = () => {
    const token = localStorage.getItem("Token");
    return token !== null && token !== "";
  }

  const auth = {
    isAuth,
    user,
    time
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}