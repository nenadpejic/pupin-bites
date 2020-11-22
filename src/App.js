import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CreatePoll from "./components/CreatePoll/CreatePoll";
import { Settings } from "./components/settings/Settings";
import PollVote from "./components/PollVote/PollVote";
// context
import { AuthContext } from "./contexts/AuthContext";
// style
import "./App.css";

const App = () => {
  const value = useContext(AuthContext);

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => {
          return value.Auth.status() ? <Redirect to="/home" /> : <Welcome />;
        }}
      />

      <Route path="/signup">
        <Signup />
      </Route>

      <Route
        path="/login"
        render={() => {
          return value.Auth.status() ? <Redirect to="/home" /> : <Login />;
        }}
      />

      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>

      <PrivateRoute exact path="/create-poll">
        <CreatePoll />
      </PrivateRoute>

      <PrivateRoute exact path="/settings">
        <Settings />
      </PrivateRoute>

      <PrivateRoute path="/poll-vote/:slug">
        <PollVote />
      </PrivateRoute>
    </Router>
  );
};

export default App;
