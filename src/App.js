import React, { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
// context
import { AuthContextProvider } from "./contexts/AuthContext"

const App = () => {
  const [redirect, setRedirect] = useState(false);

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
          <Login redirect={redirect} setRedirect={setRedirect} />
        </Route>

        <PrivateRoute path="/home" redirect={redirect}>
          <Home />
        </PrivateRoute>

        <Route exact path="/create-poll">
          <CreatePoll token={token} restaurants={restaurants} />
        </Route>

        <Route exact path="/settings">
          {/* <Settings /> */}
        </Route>

























      </Router>
    </AuthContextProvider>
  );
}

export default App;
