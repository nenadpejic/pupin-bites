import React, { useEffect, useState } from 'react'
import { getOnePoll, createVote } from '../../services/services'
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
    const { slug } = useParams()
    const [id, setId] = useState('')

    useEffect(() => {
        getOnePoll(slug).then(res => {
            setPoll(res.data)
            setRestaurants(res.data.restaurants)
            SetVotes(res.data.votes)
        }).catch((err) => {
            console.log(err);
        })
    }, [slug])

    // Handle change of poll id
    const handleChange = (e) => {
        setId(e.target.id)
        
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
            {voted ? <Redirect to={`/poll-complete/${slug}`} /> : null}
            <h1>Poll Vote</h1>
            <PollInfo poll={poll} />
            <div className="restaurantList">
                {restaurants.map(restaurant =>
                    <div key={restaurant.id}>
                        <label htmlFor={restaurant.id}>
                            <RestaurantItem restaurant={restaurant} />
                        </label>
                        <input type="radio" name="choose" id={restaurant.id} onChange={handleChange} />
                    </div>
                )}
            </div>
            <button className="bigButton" type="submit" onClick={handleClick}>Glasaj</button>
        </Main>
    )
}

export default PollVote