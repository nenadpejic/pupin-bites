import React, { useContext, useEffect, useState } from "react"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    console.log(email, password);
  }

  useEffect(() => {
    // setCurrentUser()
  }, [])

  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}