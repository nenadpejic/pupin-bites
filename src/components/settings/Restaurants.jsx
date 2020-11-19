import React, { useEffect, useState } from 'react'
import { createRestaurant, getAllRestaurants } from '../../services/services'

export const Restaurants = ()=>{

const [restaurants,setRestaurants] = useState([])
const [restaurantInput,setRestaurantInput] = useState({name:"",address:""})
const [submit,setSubmit] = useState(false)

useEffect(()=>{
    getAllRestaurants().then(res=>{
        // console.log(res)
        setRestaurants(res.data)
    })

},[submit])

const handleRestaurantInput = (e) => {
    const { name, value } = e.target;



    setRestaurantInput((prevRes) => {
        return {
            ...prevRes,
            [name]: value
        };
    });
};

const newRestaurant = (e)=>{

    e.preventDefault();
    if (restaurantInput.name.trim() !== "" && restaurantInput.address.trim() !== "") {
        createRestaurant(restaurantInput)
            .then((res) => {
                console.log(res)
                setSubmit(!submit)
                setRestaurantInput({ name: "", address: "" });

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                
                setRestaurantInput({ name: "", address: "" });
            });
    }
}


const deleteRestaurant = (restaurantId)=>{



}


    return (
        <>
            <h1>Hello</h1>
            <form onSubmit={newRestaurant}>
                <input
                type="text"
                placeholder='Enter Restaurant Name'
                onChange={handleRestaurantInput}
                value={restaurantInput.name}
                name="name"/>

                <input
                type="text"
                placeholder='Enter Restaurant Address'
                onChange={handleRestaurantInput}
                value={restaurantInput.address}
                name="address" />

                <input type="submit"/>
            </form>

            
                
                    {restaurants.map((el,idx)=>
                    <div key={el.id}>
                        <p>{idx}</p>
                        <p>{el.name}</p>
                        <p>{el.address}</p>
                        <button onClick=delete/>
                        <hr/>
                    </div>
                )}
            
        </>
    )
}