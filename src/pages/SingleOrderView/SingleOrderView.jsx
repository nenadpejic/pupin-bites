import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMeals, getOneOrder, getOrderItems } from '../../services/services'
import Main from '../../components/Main'
import './style.css'

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
        <Main>   
        <div className="singleOrderview">
            <h2 className="page-title" >Customer Orders</h2>
        {orderedItems&&orderedItems.map(order=>
            <div key={order}>
                <h3>{order.consumer}</h3>
                <table>
                <thead><tr><th>Meals</th><th>Notes</th><th>Quantities</th></tr></thead>
                <tbody>
                {order.payloads.map(el=>
                    <tr key={el.id}>
                        <td> {meals&& meals.filter(meal=>el.mealId===meal.id)[0].name}</td>
                        <td> {el.note}</td>
                        <td> {el.quantity}</td>
                    </tr>)} 
                </tbody>
                </table> 
            </div>)}      
        </div>  
        </Main>
    )
}

 