import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getMeals,
  getOneOrder,
  getOrderItems,
  getProfile,
  updateOrder,
} from "../../services/services";
import { CSVLink } from "react-csv";
import "./singleOrderView.css"
import Main from "../../components/Main";

export const SingleOrderView = () => {

  const [orderedItems, setOrderedItems] = useState(undefined);
  const [yourOrderItems, setYourOrderItems] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [orderInfo, setOrderInfo] = useState([]);
  const [data, setData] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [meals, setMeals] = useState(undefined);
  const { slug } = useParams();
  const [storage,setStorage] =useState(localStorage.getItem("orderId")!==null && localStorage.getItem("orderId")[0]==='[' ? JSON.parse(localStorage.getItem("orderId")):[]);
  const [isCreator,setIsCreator] = useState(false)
  const history = useHistory();

  useEffect(() => {

    getProfile().then((res) => {
      setProfile(res.data);
    });

    getOneOrder(slug).then((res) => {
      
      setOrderInfo(res.data);
      setRestaurantId(res.data.restaurantId);
    });

    getOrderItems(slug).then((res) => {
      
      setOrderedItems(res.data);
    });

    storage && storage.some(el=>el===slug) && setIsCreator(true)
  }, [slug,storage]);

  useEffect(() => {

    restaurantId &&
      getMeals(restaurantId).then((res) => {
        setMeals(res.data.filter((el) => el.available === true));
      });

  }, [restaurantId]);

  useEffect(() => {
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

  const handleOrderFinish = () => {
    // Data example:
    // let data = {
    //  "active": true,
    //  "label": "Radna Nedelja"
    // }
    let data = {
      active: false,
      label: 'done'
    }
    updateOrder(data, orderInfo.id).then(res => {
      localStorage.removeItem("orderRestaurantId");
    })

    history.push(`/home`);
  };

  useEffect(() => {
    if (orderedItems && meals) {

      orderedItems.forEach(order => {
        
        order.payloads.forEach(payload => {
          setData(prev => {
            return [...prev, {
              consumer: order.consumer,
              mealName: meals.find(el => el.id === payload.mealId).name,
              quantity: payload.quantity,
              mealPrice: meals.find(el => el.id === payload.mealId).price * payload.quantity + '$',
              note: payload.note,
            }];
          });
        });
      });
    };
  }, [orderedItems, meals]);



  return (
    <div className="wrapper" style={{ backgroundImage: `url(${"/img/photos/wallpaper.jpg"}` }}>
      <Main>
        <div className="order-div">
          <div>
            <div className='order-title'>
            <p>(Food ordered by all can be viewed only by Order Creator)</p>
            <h3>Food you ordered:</h3>
            </div>
            {yourOrderItems && yourOrderItems.length > 0 ? (
              yourOrderItems.map((order) => (
                <div className="order-view" key={order.id}>
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
                  <button onClick={handleBack} className='bigButton'>back</button>
                </div>
              )}
          </div>

          {isCreator && (
            <div className="order-view-all">
              <h3>Food ordered by all:</h3>
              {orderedItems &&
                orderedItems.length > 0 &&
                orderedItems.map((order) => (
                  <div className="order-consumer" key={order.id}>
                    <p>{order.consumer}</p>
                    {order.payloads.map((el) => (
                      <div key={el.id}>
                        <p>
                          Meal:{" "}
                          {meals &&
                            meals.filter((meal) => el.mealId === meal.id)[0].name}
                        </p>
                        <p>Note : {el.note}</p>
                        <p>Quantity : {el.quantity}</p>
                        <hr />
                      </div>
                    ))}
                    <hr />
                  </div>
                ))}

              {isCreator &&  <CSVLink
                className="csv-button" onClick={handleOrderFinish}
                filename={orderInfo.label + " " + slug + ".csv"}

                data={data}
              >Finish Order and Export to Excel</CSVLink>}
            </div>

          )}
        </div>
      </Main>
    </div>
  );
};
