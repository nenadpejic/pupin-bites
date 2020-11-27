import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div id="error">
      <h1>Oooops seems like your lost.</h1>
      <Link to="/home">Back to safety!</Link>
    </div>
  );
}

export default Error;