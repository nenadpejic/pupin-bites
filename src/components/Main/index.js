import React from 'react'; 
import NavBar from '../NavBar';
import Footer from '../Footer'
import './style.css';

const Main = ({children}) => { 
    return (  
        <div class="wrapper" style={{backgroundImage: `url(${"/img/photos/wallpaper.jpg"}`}}>
            <NavBar/>
            <div className="container" >
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Main;