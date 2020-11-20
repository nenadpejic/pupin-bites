<<<<<<< HEAD
import React, { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import { createPoll } from "./services/services"
import { AuthContextProvider } from "./contexts/AuthContext"
import { Settings } from "./components/settings/Settings"




=======
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CreatePoll from "./components/CreatePoll/CreatePoll.jsx";
// import { Settings } from './components/settings/Settings';
// context
import { AuthContext } from "./contexts/AuthContext";
// style
import "./App.css";
>>>>>>> 922e30722786a12a340e392c766fec69719190cf

const App = () => {
  const value = useContext(AuthContext);

  return (
<<<<<<< HEAD
    <AuthContextProvider>
      <Router>
        <Route exact path="/">
          <Welcome />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login redirect={redirect} setRedirect={setRedirect} />
        </Route>

        <PrivateRoute path="/home" redirect={redirect}>
          <Home />
        </PrivateRoute>

        <Route exact path="/create-poll">
          {/* <createPoll token={token} restaurants={restaurants} /> */}
        </Route>

        <Route exact path="/settings">
          <Settings />
        </Route>
























      </Router>
    </AuthContextProvider>
=======
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
        {/* <Settings /> */}
      </Route>

    </Router >
>>>>>>> 922e30722786a12a340e392c766fec69719190cf
  );
}

export default App;
