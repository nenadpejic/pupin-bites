import React, { useState } from "react"

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [test, setTest] = useState();

  // NOTE: no curlies required
  const value = {
    test,
    setTest
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}