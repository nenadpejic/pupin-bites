import React, { useEffect, useState } from 'react'
import { getOnePoll, createVote } from '../../services/services'
import { Redirect, useParams } from 'react-router-dom'
import './PollVote.css'

const PollVote = () => {
    const [poll, setPoll] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [id, setId] = useState('')
    const [voted, setVoted] = useState(false)
    const { slug } = useParams()
    console.log(localStorage)

    useEffect(() => {
        getOnePoll(slug).then(res => {
            setPoll(res.data)
            setRestaurants(res.data.restaurants)

        }).catch((err) => {
            console.log(err);
        })
    }, [slug])

    // Handle change of poll id
    const handleChange = (e) => {
        setId(e.target.id)
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
        <form>
            {voted ? <Redirect to={`/poll-in-progress/${slug}`} /> : null}
            <div key={poll.id}>
                <h3>Poll Name: {poll.label}</h3>
                <h3>Poll Created: {poll.created}</h3>
                <h3>Poll Ends at: </h3>
            </div>
            <div>
                {restaurants.map(restaurant =>
                    <div key={restaurant.id} className="poll">
                        <div>{restaurant.name}</div>
                        <div>{restaurant.address}</div>
                        <input type="radio" name="chose" id={restaurant.id} onChange={handleChange} />
                    </div>
                )}
            </div>
            <button type="submit" onClick={handleClick}>Glasaj</button>
        </form>
    )
}

export default PollVote

