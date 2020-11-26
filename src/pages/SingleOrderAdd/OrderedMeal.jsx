import React from 'react'

export const OrderedMeal = ({ordered,orderedMeal,payload,setTotal})=>{

    const deleteItem = (name, quantity, note, price,id) => {
        let index = orderedMeal.findIndex(
          el => el.name === name 
                && el.note === note 
                && el.quantity === quantity);
        orderedMeal.splice(index, 1);


        setTotal(prev => prev - price * quantity);

        let itemIndex = payload.findIndex(
            el => el.mealId === id 
                  && el.note === note 
                  && el.quantity === quantity);
          payload.splice(itemIndex, 1);
      };
    return (
        <div >
            <p>Name: {ordered.name}</p>
            <p>Price: {ordered.price} USD</p>
            <p>Quantity: {ordered.quantity}</p>
            <p>Note: {ordered.note}</p>
            <button onClick={() => deleteItem(ordered.name, ordered.quantity, ordered.note, ordered.price,ordered.mealId)}>Delete</button>
            <hr/> 
        </div>
    )
}