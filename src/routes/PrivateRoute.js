import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);

  return (
    <Route {...rest} render={({ location }) => {
      return (
        auth.isAuth()
          ? children
          : <Redirect to={{
            pathname: "/login",
            state: { from: location }
          }} />
      )
    }} />
  )
}

export default PrivateRoute;