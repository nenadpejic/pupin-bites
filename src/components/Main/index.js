import React from 'react'; 
import Navigation from '../Navigation';
import Footer from '../Footer'
import './style.css';

const Main = ({children}) => { 
    return (  
        <>
            <Navigation/>
            <div className="container" style={{backgroundImage: `url(${"/img/photos/wallpaper.jpg"}`}}>
                <div className="children">
                    {children}
                </div>
            </div>
            <Footer/> 
        </>
    )
}

export default Main;