import { Link } from "react-router-dom";

const SignupComplete = () => {
  return (
    <>
      <h2>Signup successfull</h2>
      <button>
        <Link to="/login">
          Log In
        </Link>
      </button>
    </>
  );
}

export default SignupComplete;