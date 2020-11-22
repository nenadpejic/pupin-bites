import React, { useEffect, useState } from "react";
import "../../App.css";
import { createMeal, deleteMeal, getMeals } from "../../services/services";
import { paginate } from "../../utilities/utilities";

export const Meals = ({ restaurants, submit, setSubmit }) => {
  const [restaurantInput, setRestaurantInput] = useState("");
  const [filterRestaurant, setFilterRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState(undefined);
  const [meals, setMeals] = useState([]);
  const [restaurantName, setRestaurantName] = useState(undefined);
  const [page,setPage] = useState(0)
  const [enableInput,setEnableInput] = useState(false)
  const [mealInput, setMealInput] = useState({
    name: "",
    price: 0,
    available: true,
  });
  
  const toggleEnableInput = ()=>{
    setEnableInput(!enableInput)
  }
  

  const handleMealInput = (e) => {
    const { name, value } = e.target;

    setMealInput((prevRes) => {
      return {
        ...prevRes,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setFilterRestaurants(
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

    if (mealInput.name.trim() !== "" && mealInput.price.trim() !== "") {
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
  };

  useEffect(() => {
    if (restaurantId !== undefined) {
      getMeals(restaurantId).then((res) => {
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
      <input
        type="text"
        placeholder="Enter Restaurant Name"
        name="name"
        value={restaurantInput}
        onChange={handleFilter}
      />
      <div className="restaurantFilter">
        {restaurantInput.length !== 0 &&
          filterRestaurant.slice(0,6).map((restaurant) => (
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
        <input
          type="text"
          placeholder="Enter Meal Name"
          onChange={handleMealInput}
          value={mealInput.name}
          name="name"
          disabled={enableInput ===false ? 'disabled' : false}
        />
        <input
          type="number"
          placeholder="Enter Meal Price"
          onChange={handleMealInput}
          value={mealInput.price}
          name="price"
          disabled={enableInput ===false ?'disabled' : false  }
        />

        <input type="submit" value="Add Meal" />
      </form>

      {paginate(meals)[page]!==undefined && paginate(meals)[page].map((meal) => (
        <div key={meal.id}>
          <p>{meal.name}</p>
          <p>{meal.price}</p>
          <p>{meal.available ? "available" : "unavailable"}</p>
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
