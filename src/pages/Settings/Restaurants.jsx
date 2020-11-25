import React, { useEffect, useState } from "react";
import { createRestaurant, deleteRestaurant } from "../../services/services";

import { paginate } from "../../utilities/utilities";

export const Restaurants = ({ restaurants, submit, setSubmit }) => {
  const [restaurantInput, setRestaurantInput] = useState({
    name: "",
    address: "",
  });
  const [page, setPage] = useState(0);
  const [filterInput, setFilterInput] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter((el) =>
        el.name.toLowerCase().includes(filterInput.toLowerCase())
      )
    );
  }, [filterInput, restaurants]);

  const handleFilter = (e) => {
    setFilterInput(e.target.value);
  };

  const handleRestaurantInput = (e) => {
    const { name, value } = e.target;

    setRestaurantInput((prevRes) => {
      return {
        ...prevRes,
        [name]: value,
      };
    });
  };

  const newRestaurant = (e) => {
    e.preventDefault();
    if (
      restaurantInput.name.trim() !== "" &&
      restaurantInput.address.trim() !== ""
    ) {
      createRestaurant(restaurantInput)
        .then((res) => {
          setSubmit(!submit);
          setRestaurantInput({
            name: "",
            address: "",
          });
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);

          setRestaurantInput({
            name: "",
            address: "",
          });
        });
    }
  };

  const restaurantDelete = (restaurantId) => {
    deleteRestaurant(restaurantId).then(() => {
      setSubmit(!submit);
    });
  };

  const changePage = (index) => {
    setPage(index);
  };

  return (
    <div className="">
      <div className='login-box'>
      <h2>Manage Restaurants</h2>
      <form onSubmit={newRestaurant}>
        
        <div className="user-box">
          <input   type="text" onChange={handleRestaurantInput} value={restaurantInput.name} name="name" className="restaurantInput" placeholder="Enter Restaurant Name"/>
        </div>
        <div className='user-box'>
          <input type="text" onChange={handleRestaurantInput} value={restaurantInput.address} placeholder="Enter Restaurant Address" name="address" className="restaurantInput"/>
        </div>
        <button
          type="submit"
          value="Add Restaurant"
          className="restaurant-btn"> 
          <span></span>
        <span></span>
        <span></span>
        <span></span>
        Create Restaurant</button>
      </form>
      </div>
      <div className='login-box'>
        <form>
          <input
            type="text"
            placeholder="Search Restaurant by Name"
            name="name"
            value={filterInput.name}
            onChange={handleFilter}
            className="restaurantInput"
          />
        </form>
        {filterInput.length === 0 &&
        paginate(restaurants)[page] !== undefined ? (
          paginate(restaurants)[page].map((el) => (
            <div key={el.id} className="single-restaurant">
              
              <p>{el.name}</p>
              <p>{el.address}</p>
              <button
                onClick={() => restaurantDelete(el.id)}
                className="restaurant-btn"
              >
                Delete
              </button>
              <hr />
            </div>
          ))
        ) : (
          <div className="restaurants-wrapper">
            {filteredRestaurants.slice(0, 4).map((el) => (
              <div key={el.id} className="single-restaurant">
                
                <p>{el.name}</p>
                <p>{el.address}</p>
                <button
                  onClick={() => restaurantDelete(el.id)}
                  className="restaurant-btn"
                >
                  Delete
                </button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {filterInput.length === 0 &&
          paginate(restaurants)[page] !== undefined &&
          paginate(restaurants).length > 1 && (
            <div className="pagination-buttons">
              {/* prev */}
              {paginate(restaurants).map((_, idx) => {
                return (
                  <button
                    onClick={() => changePage(idx)}
                    key={idx}
                    className={`page-btn ${
                      page === idx && `page-btn-selected`
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};
