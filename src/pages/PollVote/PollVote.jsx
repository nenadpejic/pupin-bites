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
    const [id, setId] = useState('')
    const [votes, SetVotes] = useState([])
    const { slug } = useParams()

    //Local Storige Ref
    const createdVoteRef = useRef(localStorage.getItem("votes") ? localStorage.getItem("votes").split(',') : null)
    const createdVote = new Array(createdVoteRef.current)

    // Redirect
    const history = useHistory()

    useEffect(() => {
        let isMounted = true
        getOnePoll(slug).then(res => {
            if (isMounted) {
                setPoll(res.data)
                setRestaurants(res.data.restaurants)
                SetVotes(votes.length === 0 ? res.data.votes : null)
            }
        }).catch((err) => {
        })
        return () => { isMounted = false };
    }, [])

    // Handle change of poll id
    const handleChange = (e) => {
        setId(e.target.id)
    }

    // Handle Submitt
    const handleClick = (e) => {
        if (id === '') {
            alert("You didn't select a restaurant!");
            return;
        }
        else {
            let data = {
                "restaurantId": id
            }
            createVote(slug, data)
            let vote = []
            vote.push(localStorage.getItem('votes'))
            vote.push(slug)
            localStorage.setItem('votes', vote)
            setTimeout(() => {
                history.push(`/poll-complete/${slug}`)
            }, 500)
        }
    }

    return (
        <Main>
            {createdVote[0] ? (createdVote[0].includes(slug) ? <Redirect to={`/poll-complete/${slug}`} /> : null) : null}
            <h1>Poll Vote</h1>
            <PollInfo poll={poll} />
            <div className="restaurantList">
                {restaurants.map(restaurant =>
                    <div key={restaurant.id}>
                        <label htmlFor={restaurant.id}>
                            <RestaurantItem restaurant={restaurant} />
                        </label>
                        <input type="radio" name="chose" id={restaurant.id} onChange={handleChange} className="radio" />
                    </div>
                )}
            </div>
            <button className="bigButton" type="submit" onClick={handleClick}>Vote</button>
        </Main>
    )
}

export default PollVote