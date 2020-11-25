import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
// import RestaurantItem from "../../components/RestaurantItem";
import { addOrderItem, getMeals, getOneOrder, getProfile } from "../../services/services";
import "./singleOrderAdd.css";
// import { formatDate } from "../../utilities/utilities";

const SingleOrderAdd = () => {
  const [order, setOrder] = useState({});
  const [meals, setMeals] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [payload,setPayload] = useState([])
  const [payloadItem, setPayloadItem] = useState({ quantity: 0, mealId: "", note: "" });
  const [orderedMeal,setOrderedMeal] = useState([])
  // const [quantity,setQuantity] = useState(0)
  const { slug } = useParams();
  // const pollId = "001a1b51-6c18-47ca-a2c5-81a3c8d354ef";
  // const [restaurantId,setRestaurantId] = useState(undefined)
  const restaurantId = order && order.restaurantId;

  //Hvatam jedan order
  useEffect(() => {
    getOneOrder(slug)
      .then((res) => {
        const data = res.data;
        setOrder(data);
        console.log(res.data);
        // setRestaurantId(order && order.restaurantId)
      })
      .catch((err) => {
        console.log(err);
      });

    restaurantId &&
      getMeals(restaurantId).then((res) => {
        console.log(res.data);
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
      note: ""
    });
  };

  const addOrder = (mealId,mealName,mealPrice) => {
   

    if (payloadItem.quantity !== "0" && payloadItem.quantity !== "" && payload.quantity!==0) {
      //to check if input is valid
      payloadItem.quantity = Number(payloadItem.quantity);
      payloadItem.mealId = mealId;
      setPayload(prev=>{
        return [
          ...prev,
          payloadItem
      ]
      })
    }

    else setPayload(prev=>{
      return[
        ...prev
      ]
    })
    
    setOrderedMeal(prev=>{
      return [
        ...prev,
        {name:mealName,price:mealPrice,quantity:payloadItem.quantity}
      ]
    })
  };

  const addItemsToOrder = ()=>{
      // Data example:
  // let data = {
  //  "consumer": "Veljko",
  //  "payloads": [
  //    {
  //      "quantity": 1,
  //      "mealId": "d53e202a-317c-4bad-99d5-1b7a446f9e26",
  //      "note": "bez luka" 
  //    }
  //   ]
  // }
  const data = {
    consumer: profile.firstName+' '+profile.lastName,
    payloads:payload
  }
   addOrderItem(data,slug).then(res=>{
     console.log(res)
   })
  }

  return (
    <div id="single-order-create">
      <NavBar />
      <div className="meals">
        {meals &&
          meals.map((el) => (
            <div className="singleMeal" key={el.id}>
              <p>{el.name}</p>
              <p>{el.price} RSD </p>
              <form >
                <input
                  type="textBox"
                  onChange={handlePayload}
                  // value={payloadItem.note}
                  name="note"
                  placeholder="Add your Note"
                />
                <input
                  type="number"
                  onChange={handlePayload}
                  // value={payloadItem.quantity}
                  name="quantity"
                  placeholder="Add quantity"
                />
                
              </form>
              <button onClick={()=>addOrder(el.id,el.name,el.price)}>Add Item</button>
            </div>
          ))}
      </div>

      <div>
        {/* {orderedMeal.map(el,idx=>
          <div className='orderedItems ' key={idx}>
            <p>Name: {el.name}</p>
            <p>Price: {el.price}</p>
        <p>Quantity: {el.quantity}</p>
        <hr/>
          </div>
        )} */}
      </div>
      <div>
        <button onClick={addItemsToOrder}>Make Your Order</button>
      </div>
    </div>
  );
};

export default SingleOrderAdd;
