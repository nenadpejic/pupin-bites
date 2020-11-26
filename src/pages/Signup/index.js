import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/services";
import SignupComplete from "../../components/SignupComplete";
import LoginTab from "../../components/LoginTab";
import "./style.css";

const Signup = () => {
  const [complete, setComplete] = useState(false);
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    // validation
    if (firstName.trim() === "" || firstName === null) {
      setError("Whitespaces are not allowed");
    } else if (lastName.trim() === "" || lastName === null) {
      setError("Whitespaces are not allowed");
    } else if (email.trim() === "" || email === null) {
      setError("Whitespaces are not allowed");
    } else if (password.trim() === "" || password === null) {
      setError("Whitespaces are not allowed");
    } else if (passwordConfirm.trim() === "" || passwordConfirm === null) {
      setError("Whitespaces are not allowed");
    } else if (password !== passwordConfirm) {
      setError("Passwords do not match");
    } else {
      // signup
      const data = {
        email: `${email}`,
        password: `${password}`,
        firstName: `${firstName}`,
        lastName: `${lastName}`,
      };
      register(data)
        .then((res) => {
          // console.log(res);
          setComplete(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div id="signup">
      <LoginTab>
        {complete ? <SignupComplete />
          : <>
            <p>Sing up for your account</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                ref={firstNameRef}
                placeholder="Name"
                required
              />
              <input
                type="text"
                ref={lastNameRef}
                placeholder="Surname"
                required
              />
              <input type="email" ref={emailRef} placeholder="Email" required />
              <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
              <input
                type="password"
                ref={passwordConfirmRef}
                placeholder="Confirm Password"
                required
              />
              <div className="err">{error}</div>
              <button className="bigButton" type="submit">
                Sign Up
              </button>
            </form>
            <span>
              Already have an account? <br></br>
              <Link to="/login">Login</Link>
            </span>
          </>
        }
      </LoginTab>
    </div>
  );
};

export default Signup;
