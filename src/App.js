import React, { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Home from "./pages/Home"

const App = () => {
  const [redirect, setRedirect] = useState(false);

  return (
    <Router>
      <Route exact path="/">
        <Welcome />
      </Route>

      <Route path="/login">
        <Login redirect={redirect} setRedirect={setRedirect} />
      </Route>

      <PrivateRoute path="/home" redirect={redirect}>
        <Home />
      </PrivateRoute>
    </Router>
  );
}

export default App;
