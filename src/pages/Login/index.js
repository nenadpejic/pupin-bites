import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { login } from "../../services/services.js"

const Login = () => {
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
        localStorage.setItem("Token", JSON.stringify(token));
        history.push("/home");
      })
      .catch(err => {
        setError("Invalid email or password");
        console.log(err)
      });
  }

  return (
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
  );
}

export default Login;