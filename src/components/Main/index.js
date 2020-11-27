import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer'
import './style.css';
import Loader from 'react-loader-spinner'

const Main = ({ children }) => {
    return (
        <div className="wrapper" style={{ backgroundImage: `url(${"/img/photos/wallpaper.jpg"}` }}>
            <NavBar />
            <Loader type="Rings" color="#4CAF50" height={200} width={200} timeout={1000} className="loader" />
            <div className="container" >
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Main;