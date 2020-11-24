import React, { useEffect, useRef, useState } from 'react'
import { getOnePoll, createVote } from '../../services/services'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import Main from '../../components/Main'
import PollInfo from '../../components/PollInfo'
import RestaurantItem from "../../components/RestaurantItem"
import "./PollVote.css"

const PollVote = () => {
    const [poll, setPoll] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [votes, SetVotes] = useState([])
    const { slug } = useParams()
    const [id, setId] = useState('')

    //Local Storige Ref
    const createdVoteRef = useRef(localStorage.getItem("votes") ? localStorage.getItem("votes").split(',') : null)
    const createdVote = new Array(createdVoteRef.current)

    // Redirect
    const history = useHistory()

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
        if (id === '') {
            alert("You didn't select a restaurant!");
            return;
        }
    }

    // Handle Submitt
    const handleClick = (e) => {
        let data = {
            "restaurantId": id
        }
        createVote(slug, data)
        let vote = []
        vote.push(localStorage.getItem('votes'))
        vote.push(slug)
        localStorage.setItem('votes', vote)
        history.push(`/poll-complete/${slug}`)
    }

    return (
        <Main>
            {createdVote[0].includes(slug) ? <Redirect to={`/poll-complete/${slug}`} /> : null}
            <h1>Poll Vote</h1>
            <PollInfo poll={poll} />
            <div className="restaurantList">
                {restaurants.map(restaurant =>
                    <div key={restaurant.id}>
                        <label htmlFor={restaurant.id}>
                            <RestaurantItem restaurant={restaurant} />
                        </label>
                        <input type="radio" name="chose" id={restaurant.id} onChange={handleChange} required />
                    </div>
                )}
            </div>
            <button className="bigButton" type="submit" onClick={handleClick}>Glasaj</button>
        </Main>
    )
}

export default PollVote