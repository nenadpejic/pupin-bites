import React, { useEffect, useState } from 'react'
import { getOnePoll, createVote } from '../../services/services'
import { map, uniqBy } from 'lodash'
import { useParams } from 'react-router-dom'

const PollVote = () => {
    let pollId = '69189b9e-a970-443f-8f84-98c6f3dde45e'
    const [poll, setPoll] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [votes, SetVotes] = useState([])
    const [tmp, setTmp] = useState(0)
    const { slug } = useParams()

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


    const handleClick = (e) => {
        let id = e.target.id
        let data = {
            "restaurantId": id
        }
        createVote(pollId, data)
        // return votes.filter(vote => vote.restaurantId).includes(id) ? setTmp(tmp + 1) : setTmp(tmp)
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
                    <div key={restaurant.id}>
                        <div>{restaurant.name}</div>
                        <div>{restaurant.address}</div>
                        <button onClick={handleClick} id={restaurant.id}>Glasaj</button>
                    </div>
                )}
            </div>


        </section>
    )
}

export default PollVote

