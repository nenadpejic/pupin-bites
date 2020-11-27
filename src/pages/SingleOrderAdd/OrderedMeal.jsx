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
<div className="ordered-meal">
  <div className="ordered-name">{ordered.name}</div>
  <div className="ordered-p">{ordered.price}.00$ </div>
  <div className="ordered-q">{ordered.quantity}{ordered.quantity>1 ? " pieces" : " piece"}</div>
    <div className="ordered-note">{ordered.note}{ordered.note==="" && (<i>note</i>) }</div>
  <div className="ordered-delete"><button onClick={() => deleteItem(ordered.name, ordered.quantity, ordered.note, ordered.price,ordered.mealId)}>Delete</button></div>
</div> 
        

    )
}