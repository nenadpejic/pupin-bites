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

    const createdVoteRef = useRef(localStorage.getItem("votes") ? localStorage.getItem("votes").split(',') : null)
    const createdVote = new Array(createdVoteRef.current)

    // Redirect
    const history = useHistory()


    useEffect(() => {
        let isMounted = true
        getOnePoll(slug).then(res => {
            if (isMounted) {
                setPoll(res.data)
                SetVotes(votes.length === 0 ? res.data.votes : null)
                setRestaurants(res.data.restaurants.map(el => Object.assign(el, { vote: [...votes.filter(vote => vote.restaurantId === el.id)] })))
            }
        }).catch((err) => {
        })
        return () => { isMounted = false };
    }, [votes, slug])


    useEffect(() => {
        let tmpArr = []
        restaurants.map(el => tmpArr.push(el.vote.length))
        let maxNum = Math.max.apply(Math, tmpArr)
        setWinner(restaurants.filter((el => el.vote.length === maxNum ? el : null)))
    }, [restaurants])

    const handleClickFinish = () => {
        let data = {
            "active": false
        }
        updatePoll(slug, data)
        let tmp = winner.map(el => el.id.toString())
        localStorage.setItem('orderPollId', slug)
        localStorage.setItem('orderRestaurantId', tmp.toString())
        history.push(`/single-order-create/`)
    }
    const handleClickHome = () => {
        history.push(`/`)
    }
    const handleSuspend = () => {
        let susspend = createdVote[0].filter(el => el !== slug)
        localStorage.setItem('votes', susspend)
        history.push(`/poll-vote/${slug}`)
    }

    const totalVotes = restaurants.map(r => r.vote.length).reduce((a, b) => a + b, 0);

    return (
        <Main>
            <h2 className="page-title" style={{ marginBottom: "40px" }}>Poll results</h2>
            <div className="pollComplete">
                <PollInfo poll={poll} />
                {restaurants.map(restaurant =>
                    <div key={restaurant.id} className="pollComplete-restaurant">
                        <div className=" restaurant-name"><i className="material-icons">restaurant</i> <b>{restaurant.name}</b></div>
                        <div className="restaurant-img"><img src={`https://source.unsplash.com/random/400x400/?restaurant/${restaurant.id}`} alt="restaurant-icon" /></div>
                        <div className="restaurant-votes" value={restaurant.vote.length}>{restaurant.vote.length}</div>
                        <div className="restaurant-chart">
                            <div className="chart-bar" style={{
                                width: `${(Math.ceil(restaurant.vote.length / totalVotes * 300))}px`
                            }}></div>
                        </div>
                    </div>
                )}
            </div>
            {createdPolls[0] ? (createdPolls[0].includes(slug) ?
                (!winner ? null : (winner.length === 1 ? <button onClick={handleClickFinish} className="button">Finish Poll</button> :
                    <div>
                        <button onClick={handleClickFinish} className="button">Finish Poll</button>
                        <div className="tsd-wrapper">
                            <button onClick={handleSuspend} className="button-suspend">TSD</button>
                            <p>Apparently there are two or more restaurants with an equal amount of votes, use "The Suspend Democracy" button to be the judge</p>
                        </div>
                    </div>))
                : <button onClick={handleClickHome} className="button">Back To Home</button>)
                : null}

        </Main>
    )
}
export default PollInProgress