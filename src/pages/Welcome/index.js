import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div id="welcome">
      <nav>
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
      </nav>
      <h1>Welcome</h1>
    </div>
  );
}

export default Welcome;