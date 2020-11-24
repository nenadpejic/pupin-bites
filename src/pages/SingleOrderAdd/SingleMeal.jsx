import React, { useState } from 'react'

export const SingleMeal = ({meal,setPayload})=>{

    const [payloadItem,setPayloadItem] = useState({
        quantity: 0,
        mealId: "",
        note: "",
      })
    const [orderedMeal,setOrderedMeal] = useState([])

    const handlePayloadItem = (e) => {
        const { name, value } = e.target;
    
        setPayloadItem((prevRes) => {
          return {
            ...prevRes,
            [name]: value,
          };
        });
      };

      const addOrder = (mealId, mealName, mealPrice) => {
        if (
          payloadItem.quantity !== "0" &&
          payloadItem.quantity !== "" &&
          payloadItem.quantity !== 0
        ) {
          //to check if input is valid
          payloadItem.quantity = Number(payloadItem.quantity);
          payloadItem.mealId = mealId;
          setPayload((prev) => {
            return [...prev, payloadItem];
          });
        } else
          setPayload((prev) => {
            return [...prev];
          });
    
        setOrderedMeal((prev) => {
          return [
            ...prev,
            { name: mealName, price: mealPrice, quantity: payloadItem.quantity }
          ];
        });
      };


    return (
        <div>
            <p>{meal.name}</p>
              <p>{meal.price} RSD </p>
              <form>
                <input
                  type="textBox"
                  onChange={handlePayloadItem}
                  value={payloadItem.note}
                  name="note"
                  placeholder="Add your Note"
                />
                <input
                  type="number"
                  onChange={handlePayloadItem}
                  value={payloadItem.quantity}
                  name="quantity"
                  placeholder="Add quantity"
                />
              </form>
              <button onClick={() => addOrder(meal.id, meal.name, meal.price)}>
                Add Item
              </button>
        </div>
    )
}