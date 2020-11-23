import React, { Component, useEffect, useState } from 'react'
import { getOnePoll, createVote } from '../../services/services'

import { map, uniqBy } from 'lodash'
import { Redirect, useParams } from 'react-router-dom'
import Main from '../../components/Main'
import PollInfo from '../../components/PollInfo'
import RestaurantItem from "../../components/RestaurantItem"
import "./PollVote.css"

const PollVote = () => {
    const [poll, setPoll] = useState([])
    const [voted, setVoted] = useState(false)
    const [restaurants, setRestaurants] = useState([]) 
    const [votes, SetVotes] = useState([])
    const [tmp, setTmp] = useState(0)
    const {slug } = useParams()
    const [selectedRestaurant, setSelectedRestaurants] = useState(null);
    const [id, setId] = useState('')

    useEffect(() => {
        getOnePoll(slug).then(res => {
             
            setPoll(res.data)
            setRestaurants(res.data.restaurants)
            SetVotes(res.data.votes)
             
            // let bla = (map(uniqBy(votes, 'restaurantId')))
            // setTmp(votes.map(el => el.restaurantId).includes(bla.map(el => el.restaurantId)) ? )  
        }).catch((err) => {
            console.log(err);
        })
    }, [slug])


    // Handle change of poll id
    const handleChange = (e) => {
        setId(e.target.id)
        if(id === ''){
            alert("You didn't select a restaurant!");
            return;
        }
        //let id = selectedRestaurant;
    }
    // Handle Submitt
    const handleClick = (e) => {
        let data = {
            "restaurantId": id
        }
        createVote(slug, data)
        setVoted(true)
    }
 

    return (
        <Main>
            {voted ? <Redirect to={`/poll-in-progress/${slug}`} /> : null}
            <h1>Poll Vote</h1>
            <PollInfo poll={poll}/>
            <div className="restaurantList">
                {restaurants.map(restaurant =>
                    <div key={restaurant.id}>
                        <label for={restaurant.id}> 
                        <RestaurantItem restaurant={restaurant}/>
                        </label>
                        <input type="radio" name="chose" id={restaurant.id} onChange={handleChange} />
                    </div>
                )}
            </div>
            <button class="bigButton" type="submit" onClick={handleClick}>Glasaj</button>
        </Main>
    )
}


export default PollVote

