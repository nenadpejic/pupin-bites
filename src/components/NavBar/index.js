import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import './style.css';

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
    <nav className="navBar">
      {auth.isAuth() ? (
        <>
          <div className="logo"><Link to="/home"><img src="/img/icons/logo.png"/></Link></div>
          <div className="user dropdown">
            <div className="userName">{user?.firstName + " " + user?.lastName}</div>
            <div className="dropdown-content">
              <button class="settings"><Link to="/settings">Settings</Link></button>
              <hr/>
              <button class="logout" onClick={handleClick}>Logout </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="logo"><Link to="/home"><img src="/img/icons/logo.png"/></Link></div>
          <div className="user loggedOut">
            <button><Link to="/login">Log In</Link></button>
            <button><Link to="/signup">Sign Up</Link></button>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
