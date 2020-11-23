import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import './style.css';

const Main = ({ children }) => {
    return (
        <>
            <NavBar />
            <div className="container" style={{ backgroundImage: `url(${"/img/photos/wallpaper.jpg"}` }}>
                <div className="children">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Main;