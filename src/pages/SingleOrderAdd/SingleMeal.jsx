import React, { useState } from 'react'

export const SingleMeal = ({meal,setPayload,setOrderedMeal,setTotal})=>{

    const [payloadItem,setPayloadItem] = useState({
        quantity: 0,
        mealId: "",
        note: "",
      })
      const resetInput = () => {
        setPayloadItem({
          quantity: 0,
          mealId: "",
          note: "",
        });
      };

    const handlePayloadItem = (e) => {
        const { name, value } = e.target;
    
        setPayloadItem((prevRes) => {
          return {
            ...prevRes,
            [name]: value,
          };
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
            {name:mealName,price:mealPrice,quantity:payloadItem.quantity,note:payloadItem.note,mealId:mealId}
          ];
        }
    
        else {
          return [...prev]
        }})
    
        resetInput()
        if(payloadItem.quantity*mealPrice > 0)
        setTotal(prev => prev + payloadItem.quantity*mealPrice)
      };


    return (
        <div className="single-meal">
            <p>{meal.name}</p>
              <p>{meal.price} USD </p>
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
              <button onClick={() => addItem(meal.id, meal.name, meal.price)}>
                Add Item
              </button>
        </div>
    )
}