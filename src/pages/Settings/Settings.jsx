import React, { useEffect, useState } from "react";
import { getAllRestaurants } from "../../services/services";
import { Meals } from "./Meals";
import { Restaurants } from "./Restaurants"; 
import Main from '../../components/Main'
import "./settings-style.css";

export const Settings = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {

    getAllRestaurants().then((res) => {
      // console.log(res)
      setRestaurants(res.data);
    });
    

 
  }, [submit]);


  return (
    <Main>
      <div className="settings">
        <div className='restaurants'>
          <Restaurants
            submit={submit}
            setSubmit={setSubmit}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
          />
        </div>
        <hr style={{marginBottom:"50px", backgroundColor:"red"}}/>
        <div className='meals'>
          <Meals
            restaurants={restaurants}
            submit={submit}
            setSubmit={setSubmit}
          />
        </div>
      </div>
    </Main>
  );
};
