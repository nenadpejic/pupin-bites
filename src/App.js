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

<<<<<<< HEAD
// Components
import { Register } from './components/Register';
import CreatePoll from './components/CreatePoll';
import { Settings } from './components/settings/Settings';
=======
        <Route path="/signup">
          <Signup />
        </Route>
>>>>>>> 7a773fde841a6a54efebc91dc9ebd3398426d0e4

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






<<<<<<< HEAD
    //vraca niz svih anketa
    getAllPolls(token).then(res => {
      // console.log(res.data)
    })
=======
>>>>>>> 7a773fde841a6a54efebc91dc9ebd3398426d0e4









<<<<<<< HEAD
    //zakucan id od jednog polla
    // vraca datum , id ,label,active(true,false)
    getOnePoll(`a7daf06d-23e0-40fb-97ab-4bca3b527550`).then(res => {
      // console.log(res)
    })
  }, [])
=======
>>>>>>> 7a773fde841a6a54efebc91dc9ebd3398426d0e4


<<<<<<< HEAD
        <Route exact path="/login">
          <Register />
        </Route>
        <Route exact path="/">
          <h1>Test</h1>
        </Route>
        <Route exact path="/create-poll">
          <CreatePoll token={token} restaurants={restaurants} />
        </Route>
        <Route exact path="/settings">
          <Settings/>
        </Route>
      </Router>
=======

>>>>>>> 7a773fde841a6a54efebc91dc9ebd3398426d0e4







      </Router>
    </AuthContextProvider>
  );
}

export default App;
