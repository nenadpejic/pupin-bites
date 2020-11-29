import { Link } from "react-router-dom";
import "./style.css"

const SignupComplete = () => {
  return (
    <div id="signup-complete">
      <h2>Signup successfull</h2>
      <button>
        <Link to="/login">
          Log In
        </Link>
      </button>
    </div>
  );
}

export default SignupComplete;