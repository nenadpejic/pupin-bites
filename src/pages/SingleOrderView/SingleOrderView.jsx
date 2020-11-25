import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMeals, getOneOrder, getOrderItems } from '../../services/services'

export const SingleOrderView = ()=>{

    const [orderedItems,setOrderedItems] = useState(undefined)
    const [orderInfo,setOrderInfo] = useState([])
    const [sortedMeals,setSortedMeals] = useState([])
    const [consumer,setConsumer] = useState({consumerName:'',mealName:'',mealPrice:''})
    const [restaurantId,setRestaurantId] = useState('')
    const [meals,setMeals] = useState(undefined)
    const { slug } = useParams();

    useEffect(()=>{
        getOneOrder(slug).then(res=>{
            console.log(res)
            setOrderInfo(res.data)
            setRestaurantId(res.data.restaurantId)
        })
        getOrderItems(slug).then(res=>{
            console.log(res)
            setOrderedItems(res.data)
        })
        
    },[slug])
    useEffect(()=>{

        restaurantId && getMeals(restaurantId).then(res=>{
            console.log(res.data)
            setMeals(res.data.filter(el=>el.available === true))
        })
    
        
    },[restaurantId])

    // useEffect(()=>{
    //     if(orderedItems && meals){
    //         orderedItems.forEach(el=>{
    //          setConsumer(prev=>{
    //              return {
    //                  ...prev,
    //                  consumerName:el.consumer
    //              }
    //          })   
    //          let sortedMeal = meals.filter(meal=>payload.mealId===meal.id)
    //         })

    //     }
    // },[])

    // const sortMealsByConsumer = ()=>{
    //     if(meals&&orderedItems)
    //     orderedItems.forEach(orderItem=>{
    //         orderItem.payloads.forEach(payload=>{
    //          let mealInfo =  meals.filter(meal=>payload.mealId===meal.id)
    //          setSortedMeals(prev=>{
    //             return [...prev,{consumer:orderItem.consumer,mealName:mealInfo.name,price:mealInfo.price}]
    //         })
    //     })
    //     })
    // }
  
  

    return (
        <div>
            {orderedItems&&orderedItems.map(order=>
                <div key={order.id}>
                    <p>{order.consumer}</p>
                    {order.payloads.map(el=>
                        <div key={el.id}>
                            <p>{el.mealId}</p>
                            <p>{el.note}</p>
                             <p>{el.quantity}</p>
                        </div>)}
                        <hr/>
                </div>)}
            
        </div>
    )
}