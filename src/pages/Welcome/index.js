import { Link } from "react-router-dom"

const Welcome = () => {
  return (<div id="welcome">
    <h1>Welcome</h1>
    <button>
      <Link to="/login">
        Log In
      </Link>
    </button>
    <button>
      <Link to="/sign-up">
        Sign Up
      </Link>
    </button>
  </div>);
}

export default Welcome;