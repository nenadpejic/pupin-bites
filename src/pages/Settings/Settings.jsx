import React, { useEffect, useState } from "react";
import { getAllRestaurants } from "../../services/services";
import { Meals } from "./Meals";
import { Restaurants } from "./Restaurants";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./settings.css";
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
    <div className="wrapper" style={{backgroundImage: `url(${"/img/photos/wallpaper.jpg"}`}}>
    <NavBar />
      <div className="Settings">
        <div className='Restaurants'>
          <Restaurants
            submit={submit}
            setSubmit={setSubmit}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
          />
        </div>
        <div className='Meals'>
          <Meals
            restaurants={restaurants}
            submit={submit}
            setSubmit={setSubmit}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
