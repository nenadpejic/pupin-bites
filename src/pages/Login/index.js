import React, { useState, useContext } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { login, getProfile } from "../../services/services.js";
import LoginTab from "../../components/LoginTab";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);
  const { state } = useLocation();
  const auth = useContext(AuthContext);

  const handleUser = (e) => {
    const value = e.target.value;
    if (e.target.type === "email") {
      setEmail(value);
    } else if (e.target.type === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: email,
      password: password,
    };
    login(data)
      .then((res) => {
        const token = res.data.access_token;
        localStorage.setItem("Token", token);
        return getProfile();
      })
      .then((res) => {
        const data = res.data;
        auth.user = data;
        setRedirect(true);
      })
      .catch((err) => {
        setError("Invalid email or password");
        console.log(err);
      });
  };

  return redirect ? (
    <Redirect to={state?.from || "/home"} />
  ) : (
      <div id="login">
        <LoginTab>
          <p>Log in to Pupin Bites</p>
          <form onSubmit={handleSubmit}>
            <div className="err">{error}</div>
            <input
              onChange={handleUser}
              type="email"
              placeholder="Enter email"
              value={email}
            />
            <input
              onChange={handleUser}
              type="password"
              placeholder="Enter password"
              value={password}
            />
            <button className="bigButton" type="submit">
              Login
          </button>
          </form>
          <span>
            Need an account? <br></br>
            <Link to="/signup">Sign Up</Link>
          </span>
        </LoginTab>
      </div>
    );
};

export default Login;
