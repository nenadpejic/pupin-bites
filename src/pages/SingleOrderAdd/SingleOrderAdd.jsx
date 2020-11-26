import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { addOrderItem, getMeals, getOneOrder, getProfile } from "../../services/services";
import { OrderedMeal } from "./OrderedMeal";
import { SingleMeal } from "./SingleMeal";
import "./singleOrderAdd.css";

const SingleOrderAdd = () => {

  const [order, setOrder] = useState({});
  const [meals, setMeals] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [payload,setPayload] = useState([]);
  // const [payloadItem, setPayloadItem] = useState({ quantity: 0, mealId: "", note: "" });
  const [orderedMeal,setOrderedMeal] = useState([]);
  const { slug } = useParams();
  const restaurantId = order && order.restaurantId;
  const [valid,setValid] = useState(true);
  const [total,setTotal] = useState(0);
  const history = useHistory()
  useEffect(() => {

    getOneOrder(slug)
      .then((res) => {
        const data = res.data;
        setOrder(data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      restaurantId &&
        getMeals(restaurantId).then((res) => {
          console.log(res.data.filter((el) => el.available));
          setMeals(res.data.filter((el) => el.available));
        });

  }, [slug, restaurantId]);

  useEffect(() => {

    getProfile().then((res) => {
      console.log(res);
      setProfile(res.data);
    });
    
  }, []);


  const handlesValidation = () => {
    setValid(false)
    setTimeout(() => {
      setValid(true)
    }, 2000);
  };
  

  const addItemsToOrder = () => {
  const data = {
    consumer: profile.firstName + ' ' + profile.lastName,
    payloads:payload
  };

  if(order.active === true && payload.length!==0) {

   addOrderItem(data,slug).then(res => {
     console.log(res)
    history.push(`/single-order-view/${slug}`)
   })}

   else handlesValidation()
  };

  const handleOrderView = ()=>{
    history.push(`/single-order-view/${slug}`)
  }
  return (
    <div className="wrapper" style={{backgroundImage: `url(${"/img/photos/wallpaper.jpg"}`}}>
    <NavBar />
    <div id="single-order-create">
      
      <div className="meal">
        {meals &&
          meals.map((el) => (
            <SingleMeal meal={el} setPayload={setPayload} key={el.id} setOrderedMeal={setOrderedMeal} setTotal={setTotal}/>
     
          ))}
      </div>

      <div>
        {orderedMeal.map((el,idx) =>
          
          <div className='orderedItems ' key={idx}>
            <OrderedMeal ordered={el} orderedMeal={orderedMeal} payload={payload} setTotal={setTotal}/>
        
          </div>
        )} 
      </div>
      <div className="make-order">
        <button onClick={addItemsToOrder}>Make Your Order</button>
        {valid ? null : <p>This order is not active anymore or you did not pick any meal to order.</p>}
      </div>
      <hr/>
      <div className="make-order price">
        <h2>Price:</h2>
        <p>{total} USD</p>
      </div>
      <div className="make-order">
        <label>Already ordered?</label>
        <button onClick={handleOrderView}>Go to Your Order</button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default SingleOrderAdd;
