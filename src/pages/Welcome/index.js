import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

const Welcome = () => {
  const data = useContext(AuthContext);

  useEffect(() => {
    console.log(data)
  }, [])

  return (<div id="welcome">
    <h1>Welcome</h1>
    <button>
      <Link to="/login">
        Log In
      </Link>
    </button>
    <button>
      <Link to="/signup">
        Sign Up
      </Link>
    </button>
  </div>);
}

export default Welcome;