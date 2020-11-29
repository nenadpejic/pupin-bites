import React from  'react'; 
import './style.css';

const LoginTab = ({children})=>{
    return(
        <div className="wrapperLogin" style={{backgroundImage: `url(${"/img/photos/sandwich.jpg"}`}}>
            <div className="loginTab">
                <img src="/img/icons/logo.png" alt="logo"/>
                <div>{children}</div>
            </div>
        </div>  
    )
}

export default LoginTab;