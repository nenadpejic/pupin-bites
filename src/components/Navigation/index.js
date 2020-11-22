import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const Navigation = (props) => {
    const userName = props.userName;
    return (
        <div className='navigation'>
            <div className="logo">
                <img src="/img/icons/logo.png"/>
            </div>
            <div className="status">
                { userName 
                ? 
                <div className="loggedIn">
                    <img src="/img/icons/user.png" /> <div>{userName}</div>
                </div>
                :
                <div className="loggedOut">
                    <button>
                        <Link to="/login">Log In</Link>
                    </button>
                    <button>
                        <Link to="/signup">Sign Up</Link>
                    </button>
                </div>
                }
            </div>
            
        </div>
    )
}

export default Navigation;