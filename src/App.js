import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CreatePoll from "./components/CreatePoll/CreatePoll.jsx";
import { Settings } from './components/settings/Settings';
// context
import { AuthContextProvider } from "./contexts/AuthContext";
// style
import "./App.css";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Route exact path="/">
          <Welcome />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>

        <Route exact path="/create-poll">
          <CreatePoll />
        </Route>

        <Route exact path="/settings">
          <Settings />
        </Route>

      </Router>
    </AuthContextProvider>
  );
}

export default App;
