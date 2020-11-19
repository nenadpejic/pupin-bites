import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"

const Login = ({ redirect, setRedirect }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    axios.post("https://hungryherceg.api.veljko.dev/auth", {
      "username": email,
      "password": password
      // username: "admin@hungryherceg.com",
      // password: "123"
    })
      .then(res => {
        const token = res.data.access_token;
        setRedirect(true)
        console.log(token)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleUser = (e) => {
    const value = e.target.value;
    if (e.target.type === "email") {
      setEmail(value);
    } else if (e.target.type === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = (e) => {
    console.log(e)
  }

  return (
    redirect
      ? <Redirect to="/home" />
      : (
        <div id="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input onChange={handleUser} type="email" placeholder="Enter email" value={email} />
            <input onChange={handleUser} type="password" placeholder="Enter password" value={password} />
            {/* <button onClick={handleLogin}> */}
            <button>
              <Link to="/home">
                Log In
          </Link>
            </button>
            <div>
              Neead an account? <Link to="/signup">Sign up.</Link>
            </div>
          </form>
        </div>
      )
  );
}

export default Login;