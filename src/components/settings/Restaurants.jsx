import React, { useEffect,useState } from "react";
import { createRestaurant, deleteRestaurant } from "../../services/services";
import "../../App.css";
import { paginate } from "../../utilities/utilities";


export const Restaurants = ({ restaurants, submit, setSubmit }) => {
  const [restaurantInput, setRestaurantInput] = useState({
    name: "",
    address: "",
  });
  const [page, setPage] = useState(0);
  const [filterInput,setFilterInput] = useState("")
  const [filteredRestaurants,setFilteredRestaurants] = useState([])
  

  useEffect(()=>{
    
    setFilteredRestaurants(
        restaurants.filter((el) =>
          el.name.toLowerCase().includes(filterInput.toLowerCase())
        )
      );

  },[filterInput,restaurants])

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
          console.log(res);
          setSubmit(!submit);
          setRestaurantInput({
            name: "",
            address: "",
          })
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);

          setRestaurantInput({
            name: "",
            address: "",
          })
        });
    }
  };

  const restaurantDelete = (restaurantId) => {
    deleteRestaurant(restaurantId).then(() => {
      setSubmit(!submit);
    });
  };



  const changePage = (index)=>{
      setPage(index)
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <form onSubmit={newRestaurant}>
        <input
          type="text"
          placeholder="Enter Restaurant Name"
          onChange={handleRestaurantInput}
          value={restaurantInput.name}
          name="name"
        />

        <input
          type="text"
          placeholder="Enter Restaurant Address"
          onChange={handleRestaurantInput}
          value={restaurantInput.address}
          name="address"
        />

        <input type="submit" />
      </form>
      <div>
        <form>
            <input
            type="text"
            placeholder="Enter Restaurant Name"
            name="name"
            value={filterInput.name}
            onChange={handleFilter}/>
        </form>
        {filterInput.length===0&&paginate(restaurants)[page] !== undefined ? 
          paginate(restaurants)[page].map((el, idx) => (
            <div key={el.id}>
              <p>{idx}</p>
              <p>{el.id}</p>
              <p>{el.name}</p>
              <p>{el.address}</p>
              <button onClick={() => restaurantDelete(el.id)}>Delete</button>
              <hr />
            </div>
          ))
        :
        <div>
            {filteredRestaurants.map((el, idx) => (
            <div key={el.id}>
              <p>{idx}</p>
              <p>{el.id}</p>
              <p>{el.name}</p>
              <p>{el.address}</p>
              <button onClick={() => restaurantDelete(el.id)}>Delete</button>
              <hr />
            </div>
          ))
           }
        </div>
        }
      </div>
      <div>
          {filterInput.length===0&& paginate(restaurants)[page] !== undefined && paginate(restaurants).length > 1 && 
          <div className='pagination-buttons'>  
            {/* prev */}
            {paginate(restaurants).map((_,idx)=>{
                return(
                    <button
                      onClick={()=>changePage(idx)}
                      key={idx}
                      className={`page-btn ${page === idx && `page-btn-selected`}`}>
                        {idx+1}
                     </button>
                )
            })
            
            }
          </div>

          }
      </div>
    </div>
  );
};
