import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PollCreate from "./pages/PollCreate/PollCreate";
import { Settings } from "./pages/Settings/Settings";
import SingleOrderCreate from "./pages/SingleOrderAdd";
import PollVote from "./pages/PollVote/PollVote";
import PollComplete from "./pages/PollComplete/PollComplete";
// context
import { AuthContext } from "./contexts/AuthContext";
// style
import "./App.css";

const App = () => {
  const auth = useContext(AuthContext);

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => {
          return auth.isAuth() ? <Redirect to="/home" /> : <Welcome />;
        }}
      />

      <Route path="/signup">
        <Signup />
      </Route>

      <Route
        path="/login"
        render={() => {
          return auth.isAuth() ? <Redirect to="/home" /> : <Login />;
        }}
      />

      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>

      <PrivateRoute exact path="/poll-create">
        <PollCreate />
      </PrivateRoute>

      <PrivateRoute exact path="/settings">
        <Settings />
      </PrivateRoute>

      <PrivateRoute path="/poll-vote/:slug">
        <PollVote />
      </PrivateRoute>

      <PrivateRoute path="/poll-complete/:slug">
        <PollComplete />
      </PrivateRoute>

      <PrivateRoute path="/single-order-create/:slug">
        <SingleOrderCreate />
      </PrivateRoute>
    </Router>
  );
};

export default App;
