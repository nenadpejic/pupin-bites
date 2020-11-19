import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"

const Signup = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const [error, setError] = useState("");

  const signup = (name, email, password) => {
    console.log(`Sign up! name: ${name}, email: ${email}, password: ${password}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // validation
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    }
    // signup
    signup(name, email, password);
  }

  return (
    <div id="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div id="name">
          <label>Name</label>
          <input ref={nameRef} type="text" required />
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
    </div>
  );
}

export default Signup;