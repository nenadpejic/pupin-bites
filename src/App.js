import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PollCreate from "./pages/PollCreate/PollCreate";
import PollVote from "./pages/PollVote/PollVote";
import PollComplete from "./pages/PollComplete/PollComplete";
import { SingleOrderCreate } from "./pages/SingleOrderCreate/SingleOrderCreate";
import SingleOrderAdd from "./pages/SingleOrderAdd/SingleOrderAdd";
import { SingleOrderView } from "./pages/SingleOrderView/SingleOrderView";
import { Settings } from "./pages/Settings/Settings";
import { getProfile, updatePoll, getAllPolls } from "./services/services";
import Error from "./pages/Error";
import About from "./pages/About";
// context
import { AuthContext } from "./contexts/AuthContext";
// style
import "./App.css";

const App = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    localStorage.getItem("Token") &&
      getProfile()
        .then((res) => {
          const data = res.data;
          auth.user = data;
        })
        .catch((err) => {
          console.log(err);
        })
  }, [auth]);

  // set poll.active to false if currentDate >= endDate
  useEffect(() => {
    getAllPolls()
      .then((res) => {
        let data = res.data;
        data = data.filter(poll => poll.active);
        data.forEach(poll => {
          const currentDate = new Date();
          const endDate = new Date(poll.created);
          endDate.setMinutes(endDate.getMinutes() + auth.time);
          if (currentDate >= endDate) {
            updatePoll(poll.id, {
              "active": false
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <Router>
      <Switch>
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

        <PrivateRoute path="/poll-vote/:slug">
          <PollVote />
        </PrivateRoute>

        <PrivateRoute path="/poll-complete/:slug">
          <PollComplete />
        </PrivateRoute>

        <PrivateRoute exact path='/single-order-create'>
          <SingleOrderCreate />
        </PrivateRoute>

        <PrivateRoute path="/single-order-add/:slug">
          <SingleOrderAdd />
        </PrivateRoute>

        <PrivateRoute exact path="/settings">
          <Settings />
        </PrivateRoute>

        <PrivateRoute exact path="/single-order-view/:slug">
          <SingleOrderView />
        </PrivateRoute>

        <PrivateRoute path="/about">
          <About />
        </PrivateRoute>

        <Error path="*" />
      </Switch>
    </Router>
  );
};

export default App;
