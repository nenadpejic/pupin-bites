import React from 'react';
import './style.css';  

const RestaurantItem = (props)=>{
    const restaurant = props.restaurant;
    const address=props.address;
    const name=props.name;
    const id=props.id;
    return( 
        <div key={restaurant.id} className="restaurant">
            <div className="icon">
                <img src= {`https://source.unsplash.com/random/400x400/?restaurant/${restaurant.id}`}  alt="restaurant-icon"/>
            </div>
            <div className="name">{restaurant.name}</div>
            <div className="address">{restaurant.address}</div>
        </div>
    )  
}

export default RestaurantItem;