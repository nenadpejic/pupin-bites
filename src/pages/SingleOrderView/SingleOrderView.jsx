import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getMeals,
  getOneOrder,
  getOrderItems,
  getProfile,
  updateOrder,
} from "../../services/services";

export const SingleOrderView = () => {
  const [orderedItems, setOrderedItems] = useState(undefined);
  const [yourOrderItems, setYourOrderItems] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [orderInfo, setOrderInfo] = useState([]);
  const [sortedMeals, setSortedMeals] = useState([]);
  const [consumer, setConsumer] = useState({
    consumerName: "",
    mealName: "",
    mealPrice: "",
  });
  const [restaurantId, setRestaurantId] = useState("");
  const [meals, setMeals] = useState(undefined);
  const { slug } = useParams();
  const storage = localStorage.getItem("orderId");
  const history = useHistory();

  useEffect(() => {
    
    getProfile().then((res) => {
      setProfile(res.data);
    });

    getOneOrder(slug).then((res) => {
      console.log(res);
      setOrderInfo(res.data);
      setRestaurantId(res.data.restaurantId);
    });
    getOrderItems(slug).then((res) => {
      console.log(res);
      setOrderedItems(res.data);
    });
  }, [slug]);

  useEffect(() => {
    restaurantId &&
      getMeals(restaurantId).then((res) => {
        setMeals(res.data.filter((el) => el.available === true));
      });
  }, [restaurantId]);

  useEffect(() => {
    console.log(profile + " setovan profil");
    profile &&
      orderedItems &&
      setYourOrderItems(
        orderedItems.filter(
          (el) => el.consumer === profile.firstName + " " + profile.lastName
        )
      );
  }, [profile, orderedItems]);

  const handleBack = () => {
    history.push(`/single-order-add/${slug}`);
  };

  const handleOrderFinish = ()=>{
    // Data example:
    // let data = {
    //  "active": true,
    //  "label": "Radna Nedelja"
    // }
    let data = {
        active:false,
        label: orderInfo.label + '|finished'
    }
    updateOrder(data,orderInfo.id).then(res=>{
        console.log(res)
    })
  }


  return (
    <div>
      <div>
          <h3>Food you ordered:</h3>
        {yourOrderItems && yourOrderItems.length > 0 ? (
          yourOrderItems.map((order) => (
            <div key={order.id}>
              <p>{order.consumer}</p>
              {order.payloads.map((el) => (
                <div key={el.id}>
                  <p>
                    Meal:{" "}
                    {meals &&
                      meals.filter((meal) => el.mealId === meal.id)[0].name}
                  </p>
                  <p>Note : {el.note}</p>
                  <p>quantity : {el.quantity}</p>
                  <hr />
                </div>
              ))}
              <hr />
            </div>
          ))
        ) : (
          <div>
            <h3>Sorry but You haven't ordered yet.</h3>
            <button onClick={handleBack}>back</button>
          </div>
        )}
      </div>

      {storage && (
        <div>
            <h3>Food ordered by all:</h3>
          {orderedItems &&
            orderedItems.length > 0 &&
            orderedItems.map((order) => (
              <div key={order.id}>
                <p>{order.consumer}</p>
                {order.payloads.map((el) => (
                  <div key={el.id}>
                    <p>
                      Meal:{" "}
                      {meals &&
                        meals.filter((meal) => el.mealId === meal.id)[0].name}
                    </p>
                    <p>Note : {el.note}</p>
                    <p>quantity : {el.quantity}</p>
                    <hr />
                  </div>
                ))}
                <hr />
              </div>
            ))}
            <button onClick={handleOrderFinish}>Finish Order and Export to XML</button>
        </div>
        
      )}
    </div>
  );
};
