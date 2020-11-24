import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOnePoll } from '../../services/services'

const PollInProgress = () => {
    const [poll, setPoll] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [votes, SetVotes] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        getOnePoll(slug).then(res => {
            setPoll(res.data)
            SetVotes(res.data.votes)
            setRestaurants(res.data.restaurants.map(el => Object.assign(el, { vote: [...votes.filter(vote => vote.restaurantId === el.id)] })))

        }).catch((err) => {
            console.log(err);
        })
    }, [slug, votes])

    return (
        <section>
            {/* {voted ? <Redirect to={`/poll-in-progress/${slug}`} /> : null} */}
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
            {/* <button onClick={handleClick}>Finish Poll</button> */}
        </section>
    )
}
export default PollInProgress