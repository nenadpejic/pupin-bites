import React, { useState, useContext } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { login } from "../../services/services.js"
import { AuthContext } from "../../contexts/AuthContext"

const Login = () => {
  const value = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const history = useHistory();

  const handleUser = (e) => {
    const value = e.target.value;
    if (e.target.type === "email") {
      setEmail(value);
    } else if (e.target.type === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // const data = {
    //   username: "admin@hungryherceg.com",
    //   password: "123"
    // }
    const data = {
      username: email,
      password: password
    }
    login(data)
      .then(res => {
        const token = res.data.access_token;
        localStorage.setItem("Token", token);
        value.Auth.login();
        history.push("/home");
      })
      .catch(err => {
        setError("Invalid email or password");
        console.log(err)
      });
  }

  return (
    // value.Auth.status()
    //   ? <Redirect to="/home" />
    //   : <>
    <div id="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>{error}</div>
        <div id="email">
          <input onChange={handleUser} type="email" placeholder="Enter email" value={email} />
        </div>
        <div id="password">
          <input onChange={handleUser} type="password" placeholder="Enter password" value={password} />
        </div>
        <button type="submit">
          Log In
            </button>
        <div>
          Neead an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
    // </>
  );
}

export default Login;