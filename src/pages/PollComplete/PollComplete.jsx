import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getOnePoll, updatePoll } from '../../services/services'

const PollInProgress = () => {
    const [poll, setPoll] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [votes, SetVotes] = useState([])
    const { slug } = useParams()

    //Local Storige Ref
    const createdPollsRef = useRef(localStorage.getItem("createPoll") ? localStorage.getItem("createPoll").split(',') : null)
    const createdPolls = new Array(createdPollsRef.current)

    // Redirect
    const history = useHistory()


    useEffect(() => {
        getOnePoll(slug).then(res => {
            setPoll(res.data)
            SetVotes(res.data.votes)
            setRestaurants(res.data.restaurants.map(el => Object.assign(el, { vote: [...votes.filter(vote => vote.restaurantId === el.id)] })))

        }).catch((err) => {
            console.log(err);
        })
    }, [slug, votes])

    const handleClick = () => {
        let data = {
            "active": false
        }
        updatePoll(slug, data)
        history.push(`/single-order-create/`)
    }

    return (
        <section>
            <div key={poll.id}>
                <h3>Poll Name: {poll.label}</h3>
                <h3>Poll Created: {poll.created}</h3>
                <h3>Poll Ends at: </h3>
            </div>
            <div>

                {restaurants.map(restaurant =>
                    <div key={restaurant.id} id={restaurant.id} className="poll">
                        <div>{restaurant.name}</div>
                        <div>{restaurant.address}</div>
                        <div>Votes: {restaurant.vote.length}</div>
                    </div>

                )}
            </div>
            {createdPolls[0] ? (createdPolls[0].includes(slug) ? <button onClick={handleClick}>Finish Poll</button> : null) : null}
        </section>
    )
}
export default PollInProgress