import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route {...rest} render={() => {
      return (
        rest.redirect
          ? children
          : <Redirect to="/login"></Redirect>
      )
    }} />
  )
}

export default PrivateRoute;