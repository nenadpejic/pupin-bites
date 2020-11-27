import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"; 
import { addOrderItem, getMeals, getOneOrder, getProfile } from "../../services/services";
import { OrderedMeal } from "./OrderedMeal";
import { SingleMeal } from "./SingleMeal";
import "./singleOrderAdd.css";
import Main from "../../components/Main"

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
  <Main> 
    <div className="single-order-create">
     
        <h2 className="page-title">Create Order</h2>
      <div className="meals">
        {meals && meals.map((el) => (
            <SingleMeal meal={el} setPayload={setPayload} key={el.id} setOrderedMeal={setOrderedMeal} setTotal={setTotal}/>
          ))}
      </div>

      <hr/>
      {orderedMeal.length===0&&<div className="make-order">
        <div className='label'><label>Already ordered?</label></div>
        <button className="bigButton-label" onClick={handleOrderView}>Go to Your Order</button>
      </div>}

      <div>
        {orderedMeal.map((el,idx) =>
          <div className='orderedItems ' key={idx}>
            <OrderedMeal ordered={el} orderedMeal={orderedMeal} payload={payload} setTotal={setTotal}/>
          </div>
        )} 
      </div>
      
       {orderedMeal.length>0 &&  
        <>
        <div>
          <h2>Total: {total} USD</h2>
        </div>
        <div>
          <button className="bigButton" onClick={addItemsToOrder}>Make Your Order</button>
          {valid ? null : <p>This order is not active anymore or you did not pick any meal to order.</p>}
        </div> 
        <div className="make-order">
        <label>Already ordered?</label>
        <button onClick={handleOrderView} className="smallLink">Go to Your Order</button>
      </div> 
        </>
      } 
     
  </div> 
  </Main>
  );
};

export default SingleOrderAdd;
