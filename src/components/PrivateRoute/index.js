import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// import { getProfile } from "../../services/services";

const PrivateRoute = ({ children, ...rest }) => {
  const value = useContext(AuthContext);
  // const history = useHistory();

  return (
    <Route {...rest} render={() => {

      // not a good solution
      // getProfile()
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     localStorage.removeItem("Token");
      //     history.push("/login");
      //   })
      // console.log(value.Auth.status());
      // console.log(localStorage.getItem("Token"));
      return (
        value.Auth.status()
          ? children
          : <Redirect to="/login" />
      )
    }} />
  )
}

export default PrivateRoute;