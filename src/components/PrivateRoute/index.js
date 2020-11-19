import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const PrivateRoute = ({ children, ...rest }) => {
  const value = useContext(AuthContext);

  return (
    <Route {...rest} render={() => {
      return (
        value.Auth.status()
          ? children
          : <Redirect to="/login" />
      )
    }} />
  )
}

export default PrivateRoute;