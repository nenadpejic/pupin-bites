import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Main from '../../components/Main'
import PollInfo from '../../components/PollInfo'
import { getOnePoll, updatePoll } from '../../services/services'
import './PollComplete.css'

const PollInProgress = () => {
    const [poll, setPoll] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [votes, SetVotes] = useState([])
    const { slug } = useParams()
    const [winner, setWinner] = useState()

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
            setWinner((restaurants.filter(el => Math.max(el.vote.length) ? el : null)))
        }).catch((err) => {
            console.log(err);
        })
    }, [slug, votes])

    const handleClick = () => {
        let data = {
            "active": false
        }
        updatePoll(slug, data)
        let tmp = winner.map(el => el.id.toString())
        localStorage.setItem('orderPollId', slug)
        localStorage.setItem('orderRestaurantId', tmp.toString())
        history.push(`/single-order-create/`)
    }

    return (
        <Main>
            <h1>Poll Vote</h1>
            <PollInfo poll={poll} />

            <div className="restaurantList">
                {restaurants.map(restaurant =>
                    <div key={restaurant.id} id={restaurant.id} className="restaurant">
                        <div className="icon">
                            <img src={`https://source.unsplash.com/random/400x400/?restaurant/${restaurant.id}`} alt="restaurant-icon" />
                        </div>
                        <div className="name">{restaurant.name}</div>
                        <div className="address">{restaurant.address}</div>
                        <div value={restaurant.vote.length} className="vote">{restaurant.vote.length}</div>
                    </div>
                )}
            </div>

            {createdPolls[0] ? (createdPolls[0].includes(slug) ? <button onClick={handleClick} className="button">Finish Poll</button> : null) : null}
        </Main>
    )
}
export default PollInProgress