import React, { useEffect, useState } from "react";
import { getAllRestaurants } from "../../services/services";
import { Meals } from "./Meals";
import { Restaurants } from "./Restaurants";
import "./settings.css";
export const Settings = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "Token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OGIyNWZjYS1kODA4LTRhOWUtOTA0ZC02MTM4MGM2MDY1ZWQiLCJpYXQiOjE2MDU3OTMyODZ9.Xj9XNgkYK9jC4TfQRmZeuwULtKuBnh4-H2NQ2zctcms"
    );
    getAllRestaurants().then((res) => {
      // console.log(res)
      setRestaurants(res.data);
    });
  }, [submit]);
  return (
    <>
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
    </>
  );
};
