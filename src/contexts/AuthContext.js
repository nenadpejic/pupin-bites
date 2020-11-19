import React from "react";
import Auth from "../config/auth";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const value = {
    Auth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}