import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import { createMeal, deleteMeal, getMeals } from "../../services/services";
import {paginate} from "../../utilities/utilities";
import "./settings-style.css";

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
    mealInput.name.trim() !== "" && mealInput.price > 0  ? setValid(true) : setValid(false);
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

    if (mealInput.name.trim() !== "" && mealInput.price > 0) { //to check if input is valid
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
      
      <div className='manageRestaurants'><h2>Manage Meals</h2></div>
      <input  type="text" name="name" placeholder="Search by Restaurant Name" value={restaurantInput} onChange={handleFilter} className='restaurantSearch' />
      
      <div className="restaurantFilter">
        <table>
        <tbody>
          {restaurantInput.length !== 0 &&
          filteredRestaurant.slice(0,6).map((restaurant) => (
            <tr key={restaurant.id} onClick={() =>{ getRestaurantInfo(restaurant.id, restaurant.name);setRestaurantInput("");toggleEnableInput()}}>
              <td className='restaurantTd'>{restaurant.name}</td>
            </tr>
          ))}
          </tbody>
          </table>
      </div>
 
      <div className="selectedRestaraunt">{restaurantName}</div>
      

      <div className='mealInfo'>
      <form onSubmit={newMeal}>
        <input type="text" onChange={handleMealInput} value={mealInput.name} name="name" placeholder="Meal Name" disabled={enableInput ===false ? 'disabled' : false} className='mealName'/>
        <input type="number" onChange={handleMealInput} value={mealInput.price} name="price" disabled={enableInput ===false ?'disabled' : false  } placeholder="Meal Price" className='mealPrice'/>
        <button type="submit" value="Add Meal" className="bigButton"> Add Meal </button>
        {valid ? null : <p>Please provide valid restaurant name and price.</p>}
      </form> 
      </div>
      
<br/>

      {paginate(meals)[page]!==undefined && paginate(meals)[page].map((meal) => (
        <div key={meal.id}>
          
          <div className='restaurantInfo'><p>{meal.name}</p></div>
         
          <div className='restaurantInfo'><p>{meal.price} USD</p></div>
          
          <div className={meal.available?"restaurantInfo available" : "restaurantInfo unavailable"}>{meal.available ? "Available" : "Unavailable"}</div>
          <button onClick={() => mealDelete(restaurantId, meal.id)} className='deleteButton'>
            delete
          </button>
          <hr />
        </div>
      ))}
<br/>
      <div className='pagination'>
        {paginate(meals)[page] !== undefined &&
          paginate(meals).length > 1 && (
            <div className="pagination">
              {/* prev */}
              
              {paginate(meals).map((_, idx) => {
                return (
                  <button
                    onClick={() => changePage(idx)}
                    key={idx}
                    className={`pagination-buttons ${
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
      <hr/>
    </div>
   
  );
};
