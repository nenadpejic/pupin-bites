import React, { useState } from 'react'

export const SingleMeal = ({meal,setPayload,setOrderedMeal,setTotal})=>{

    const [payloadItem,setPayloadItem] = useState({
        quantity: 1,
        mealId: "",
        note: "",
      })
      const resetInput = () => {
        setPayloadItem({
          quantity: 1,
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
<>
<div className="singleMeal">
  <div className="meal-img"><img src= {`https://source.unsplash.com/random/400x400/?burger&pizza&kebab&sandwich/${meal.id}`}  alt="restaurant-icon"/>
</div>
  <div className="meal-name">{meal.name}</div>
  <div className="meal-price">{meal.price}.00$</div>
  <div className="meal-form">
    <form>
    <input
        type="textBox"
        id="single-order-note"
        onChange={handlePayloadItem}
        value={payloadItem.note}
        name="note"
        placeholder="Add your Note"
    />
    <input
        type="number"
        id="single-order-quantity"
        onChange={handlePayloadItem}
        value={payloadItem.quantity}
        name="quantity"
        placeholder="Add quantity"
      />
    </form>
  </div>
  <div className="meal-add">
    <i className="material-icons" onClick={() => addItem(meal.id, meal.name, meal.price)}>add_shopping_cart
</i> 
  </div>
</div>


        {/* <div> <p>{meal.name}</p>
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
              <button onClick={() => addItem(meal.id, meal.name, meal.price)}>
                Add Item
              </button>
        </div> */}
        </>
    )
}