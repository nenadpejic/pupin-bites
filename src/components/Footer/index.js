import React from 'react';
import './style.css';

const Footer = () => {
    const year=new Date().getFullYear();   
    return(
        <div className="footer">
            <small>&copy; Copyright {year}, Pupin Team</small>
      </div>
    )
}

export default Footer;