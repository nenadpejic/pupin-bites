import React from 'react'; 
import Navigation from '../Navigation';
import Footer from '../Footer'
import './style.css';

const Main = ({children}) => { 
    return ( 
        <div className="background" style={{backgroundImage: `url(${"/img/photos/wallpaper.jpg"}`}}>
            <Navigation/>
            <div className="container">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Main;