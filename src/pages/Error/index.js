import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Main from "../../components/Main";

const Error = () => {
  return (
    <div id="error">
      <Main>
        <h1>Page not found.</h1>
        <h2>Oooops seems like your lost.</h2>
        <Link to="/home">Take me back to safety!</Link>
      </Main>
    </div>
  );
}

export default Error;