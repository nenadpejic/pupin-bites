import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CreatePoll from "./components/CreatePoll/CreatePoll.jsx";
import { Settings } from './components/settings/Settings';
// context
import { AuthContext } from "./contexts/AuthContext";
// style
import "./App.css";

const App = () => {
  const value = useContext(AuthContext);

  return (
    <Router>
      <Route exact path="/" render={() => {
        return (
          value.Auth.status()
            ? <Redirect to="/home" />
            : <Welcome />
        )
      }} />

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/login" render={() => {
        return (
          value.Auth.status()
            ? <Redirect to="/home" />
            : <Login />
        )
      }} />

      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>

      <Route exact path="/create-poll">
        <CreatePoll />
      </Route>

      <Route exact path="/settings">
        <Settings />
      </Route>

    </Router >
  );
}

export default App;
