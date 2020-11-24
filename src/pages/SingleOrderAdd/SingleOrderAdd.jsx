import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { addOrderItem, getMeals, getOneOrder, getProfile } from "../../services/services";
import "./singleOrderAdd.css";

const SingleOrderAdd = () => {

  const [order, setOrder] = useState({});
  const [meals, setMeals] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [payload,setPayload] = useState([]);
  const [payloadItem, setPayloadItem] = useState({ quantity: 0, mealId: "", note: "" });
  const [orderedMeal,setOrderedMeal] = useState([]);
  const { slug } = useParams();
  const restaurantId = order && order.restaurantId;
  const [valid,setValid] = useState(true);
  const [total,setTotal] = useState(0);

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

  const deleteItem = (name, quantity, note, price) => {
    let index = orderedMeal.findIndex(
      el => el.name === name 
            && el.note === note 
            && el.quantity === quantity);
    orderedMeal.splice(index, 1);
    setTotal(prev => prev - price * quantity);
  };

  const handlesValidation = () => {
    setValid(false)
    setTimeout(() => {
      setValid(true)
    }, 2000);
  };

  const handlePayload = (e) => {
    const { name, value } = e.target;

    setPayloadItem((prevRes) => {
      return {
        ...prevRes,
        [name]: value,
      };
    });
  };

  const resetInput = () => {
    setPayloadItem({
      quantity: 0,
      mealId: "",
      note: "",
    });
  };

  const addItem = (mealId,mealName,mealPrice) => {
   
    if (payloadItem.quantity >= 1) {
      payloadItem.quantity = Number(payloadItem.quantity);
      payloadItem.mealId = mealId;
      setPayload(prev => {
        return [
          ...prev,
          payloadItem
        ]
      });
    }

    else setPayload(prev=>{
      return[
        ...prev
      ]
    });
    
    setOrderedMeal(prev=>{
      if(payloadItem.quantity >= 1) {
      return [
        ...prev,
        {name:mealName,price:mealPrice,quantity:payloadItem.quantity,note:payloadItem.note}
      ];
    }

    else {
      return [...prev]
    }})

    resetInput()
    setTotal(prev => prev + payloadItem.quantity*mealPrice)
  };

  const addItemsToOrder = () => {
  const data = {
    consumer: profile.firstName + ' ' + profile.lastName,
    payloads:payload
  };

  if(order.active === true) {

   addOrderItem(data,slug).then(res => {
     console.log(res)
   })}

   else handlesValidation()
  };

  return (
    <div id="single-order-create">
      <NavBar />
      <div className="meals">
        {meals &&
          meals.map((el) => (
            <div className="singleMeal" key={el.id}>
              <p>{el.name}</p>
              <p>{el.price} USD </p>
              <form>
                <label>Add your note:</label>
                <input
                  type="textBox"
                  onChange={handlePayload}
                  name="note"
                />
                <label>Add quantity:</label>
                <input
                  type="number"
                  onChange={handlePayload}
                  name="quantity"
                  min="1"
                  step="1"
                />
              </form>
              <button onClick={()=>addItem(el.id,el.name,el.price,el.note)}>Add Item</button>
            </div>
          ))}
      </div>

      <div>
        {orderedMeal.map((el,idx) =>
          <div className='orderedItems ' key={idx}>
            <p>Name: {el.name}</p>
            <p>Price: {el.price} USD</p>
            <p>Quantity: {el.quantity}</p>
            <p>Note: {el.note}</p>
            <button onClick={() => deleteItem(el.name, el.quantity, el.note, el.price)}>X</button>
            <hr/>
          </div>
        )}
      </div>
      <div>
        <button onClick={addItemsToOrder}>Make Your Order</button>
        {valid ? null : <p>This order is not active anymore.</p>}
      </div>
      <hr/>
      <div>
        <h2>Price:</h2>
        <p>{total} USD</p>
      </div>
    </div>
  );
};

export default SingleOrderAdd;
