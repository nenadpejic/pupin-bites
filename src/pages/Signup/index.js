import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/services";
import SignupComplete from "../../components/SignupComplete";
import LoginTab from "../../components/LoginTab";

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
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    } else {
      // signup
      const data = {
        "email": `${email}`,
        "password": `${password}`,
        "firstName": `${firstName}`,
        "lastName": `${lastName}`,
      }
      register(data)
        .then(res => {
          // console.log(res);
          setComplete(true);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return (
    <div id="signup">
      {complete
        ? <SignupComplete />
        : <>

           
          <h1>Sign Up</h1>  
          <form onSubmit={handleSubmit}>
            <div>{error}</div>
            <div id="first-name">
              <label>First Name</label>
              <input ref={firstNameRef} type="text" required />
            </div>
            <div id="last-name">
              <label>Last Name</label>
              <input ref={lastNameRef} type="text" required />
            </div>
            <div id="email">
              <label>Email</label>
              <input ref={emailRef} type="email" required />
            </div>
            <div id="password">
              <label>Password</label>
              <input ref={passwordRef} type="password" required />
            </div>
            <div id="password-confirm">
              <label>Password Confirmation</label>
              <input ref={passwordConfirmRef} type="password" required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div>Already have an account? <Link to="/login">Log In</Link></div>
          
        </>
      }
    </div>
  );
}

export default Signup;