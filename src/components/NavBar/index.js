import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;

  const handleClick = () => {
    if (auth.isAuth()) {
      localStorage.removeItem("Token");
      window.location.reload();
    }
  };

  return (
    <nav>
      {auth.isAuth() ? (
        <>
          <p>
            <Link to="/home">Logo</Link>
          </p>
          <span>User: {user?.firstName + " " + user?.lastName}</span>
          <button onClick={handleClick}>Logout</button>
          <button>
            <Link to="/settings">Settins</Link>
          </button>
        </>
      ) : (
          <>
            <p>Logo</p>
            <button>
              <Link to="/login">Log In</Link>
            </button>
            <button>
              <Link to="/signup">Sign Up</Link>
            </button>
          </>
        )}
    </nav>
  );
};

export default NavBar;
