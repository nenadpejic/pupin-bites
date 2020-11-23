import React, { useEffect, useState } from "react";
import { createMeal, deleteMeal, getMeals } from "../../services/services";
import { paginate } from "../../utilities/utilities";

export const Meals = ({ restaurants, submit, setSubmit }) => {
  const [restaurantInput, setRestaurantInput] = useState("");
  const [filteredRestaurant, setFilteredRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState(undefined);
  const [meals, setMeals] = useState([]);
  const [restaurantName, setRestaurantName] = useState(undefined);
  const [page,setPage] = useState(0);
  const [valid,setValid] = useState(true);
  const [enableInput,setEnableInput] = useState(false);
  const [mealInput, setMealInput] = useState({
    name: "",
    price: 0,
    available: true,
  });
  
  const toggleEnableInput = () => { //enables creating meal after choosing restaurant
    setEnableInput(!enableInput)
  };

  const handlesValidation = () => {
    mealInput.name.trim() !== "" || mealInput.price !== 0 ? setValid(true) : setValid(false);
    setTimeout(() => {
      setValid(true)
    }, 2000);
  };
  
  const handleMealInput = (e) => {
    const { name, value } = e.target;

    setMealInput((prevRes) => {
      return {
        ...prevRes,
        [name]: value,
      };
    });
  };

  const resetInput = () => {
    setMealInput({
      name: "",
      price: 0,
      available: true,
    })
  } 

  useEffect(() => {
    setFilteredRestaurants( //search for restaurant
      restaurants.filter((el) =>
        el.name.toLowerCase().includes(restaurantInput.toLowerCase())
      )
    );
  }, [restaurantInput, restaurants]);

  const handleFilter = (e) => {
    setRestaurantInput(e.target.value);
  };

  const getRestaurantInfo = (resId, resName) => {
    setRestaurantId(resId);
    setRestaurantName(resName);
  };

  const newMeal = (e) => {
    e.preventDefault();

    if (mealInput.name.trim() !== "" && mealInput.price !== 0) { //to check if input is valid
      mealInput.price = Number(mealInput.price);
      createMeal(mealInput, restaurantId)
        .then((res) => {
          console.log(res);
          setSubmit(!submit);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    }

    resetInput();
    handlesValidation();
  };

  useEffect(() => {
    if (restaurantId !== undefined) {
      getMeals(restaurantId).then((res) => { //shows Menu
        setMeals(res.data);
      });
    }
  }, [restaurantId, submit]);

  const mealDelete = (restaurantId, mealId) => {
    deleteMeal(restaurantId, mealId).then(() => {
      setSubmit(!submit);
    });
  };

  const changePage = (index) => {
    setPage(index);
  };

  return (
    <div className="meals">
      <h1>Manage Meals</h1>
      <label>Restaurant Name:</label>
      <input
        type="text"
        name="name"
        value={restaurantInput}
        onChange={handleFilter}
      />
      <div className="restaurantFilter">
        {restaurantInput.length !== 0 &&
          filteredRestaurant.slice(0,6).map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() =>{ getRestaurantInfo(restaurant.id, restaurant.name);setRestaurantInput("");toggleEnableInput()}}
              
            >
              <div>{restaurant.name}</div>
              <hr />
            </div>
          ))}
      </div>
      <div>{restaurantName}</div>
      <form onSubmit={newMeal}>
      <label>Meal Name:</label>
        <input
          type="text"
          onChange={handleMealInput}
          value={mealInput.name}
          name="name"
          disabled={enableInput ===false ? 'disabled' : false}
        />
        <label>Meal Price:</label>
        <input
          type="number"
          onChange={handleMealInput}
          value={mealInput.price}
          name="price"
          disabled={enableInput ===false ?'disabled' : false  }
        />
        <input type="submit" value="Add Meal"/>
        {valid ? null : <p>Please provide valid restaurant name and price.</p>}
      </form>

      {paginate(meals)[page]!==undefined && paginate(meals)[page].map((meal) => (
        <div key={meal.id}>
          <p>{meal.name}</p>
          <p>{meal.price} USD</p>
          <p>{meal.available ? "Available" : "Unavailable"}</p>
          <button onClick={() => mealDelete(restaurantId, meal.id)}>
            delete
          </button>
          <hr />
        </div>
      ))}

      <div>
        {paginate(meals)[page] !== undefined &&
          paginate(meals).length > 1 && (
            <div className="pagination-buttons">
              {/* prev */}
              {paginate(meals).map((_, idx) => {
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
