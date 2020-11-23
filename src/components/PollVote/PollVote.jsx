import React, { Component, useEffect, useState } from 'react'
import { getOnePoll, createVote } from '../../services/services'
import { map, uniqBy } from 'lodash'
import { useParams } from 'react-router-dom'
import Main from '../../components/Main'
import PollInfo from '../../components/PollInfo'
import RestaurantItem from "../../components/RestaurantItem"
import "./PollVote.css"

const PollVote = () => {
    let pollId = '69189b9e-a970-443f-8f84-98c6f3dde45e'
    const [poll, setPoll] = useState([])
    const [restaurants, setRestaurants] = useState([]) 
    const [votes, SetVotes] = useState([])
    const [tmp, setTmp] = useState(0)
    const { slug } = useParams()
    
    const [selectedRestaurant, setSelectedRestaurants] = useState(null);

    // console.log(votes.filter(vote => vote.restaurantId).includes(id) ? setTmp(tmp + 1) : setTmp(tmp))
    useEffect(() => {
        getOnePoll(pollId).then(res => {
             
            setPoll(res.data)
            setRestaurants(res.data.restaurants)
            SetVotes(res.data.votes)
             
            // let bla = (map(uniqBy(votes, 'restaurantId')))
            // setTmp(votes.map(el => el.restaurantId).includes(bla.map(el => el.restaurantId)) ? )  
        }).catch((err) => {
            console.log(err);
        })
    }, [pollId])


    const handleClick = () => {
        if(selectedRestaurant === null){
            alert("You didn't select a restaurant!");
            return;
        }
        let id = selectedRestaurant;
        let data = {
            "restaurantId": id
        }
        createVote(pollId, data)
        // return votes.filter(vote => vote.restaurantId).includes(id) ? setTmp(tmp + 1) : setTmp(tmp)
    }
 

    return (
        <Main>
            <h1>Poll Vote</h1>
            <PollInfo poll={poll}/>
            <div className="restaurantList">
                {restaurants.map(restaurant =>
                <>
                <input type="radio" id={restaurant.id} key={restaurant.id} name="restaurant" onClick={()=>setSelectedRestaurants(restaurant.id)} />
                <label for={restaurant.id}> 
                    <RestaurantItem restaurant={restaurant}/>
                </label>
                </>
                )}
            </div> 
            <button class="bigButton" onClick={handleClick} >Glasaj</button>
        </Main>
    )
}


export default PollVote

