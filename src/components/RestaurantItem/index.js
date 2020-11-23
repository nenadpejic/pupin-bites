import React from 'react';
import './style.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faMap } from '@fortawesome/free-solid-svg-icons'

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
            <div className="address"><FontAwesomeIcon icon={faMap } /> {restaurant.address}</div>
        </div>
    )  
}

export default RestaurantItem;