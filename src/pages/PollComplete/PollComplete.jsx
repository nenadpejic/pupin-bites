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
    }, [votes])
    useEffect(() => {
        setWinner(restaurants.filter(el => Math.max(el.vote.length) ? el : null))
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
 
    
    const totalVotes = restaurants.map(r=>r.vote.length).reduce((a,b)=>a+b, 0);
    const handleClickHome = () => {
        history.push(`/`)
    }

    return (
        <Main>
        <h2 className="page-title" style={{marginBottom:"40px"}}>Poll results</h2>
        <div className="pollComplete">
            <PollInfo poll={poll}/>
            {restaurants.map(restaurant => 
            <div key={restaurant.id} className="pollComplete-restaurant">
                <div className=" restaurant-name"><b>{restaurant.name}</b></div>
                <div className="restaurant-img"><img src= {`https://source.unsplash.com/random/400x400/?restaurant/${restaurant.id}`}  alt="restaurant-icon"/></div>
                <div className="restaurant-votes" value={restaurant.vote.length}>{restaurant.vote.length}</div>
                <div className="restaurant-chart">
                     <div className="chart-bar" style={{
                        width:`${(Math.ceil(restaurant.vote.length/totalVotes*300))}px`
                    }}></div>  
                </div>
            </div> 
            )}
        </div>

            {/* <div>

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
            */}
            {createdPolls[0] ? (createdPolls[0].includes(slug) ?
                (winner === true && winner.length === 1 ? <button onClick={handleClickFinish} className="button">Finish Poll</button> :
                    <div>
                        <button onClick={handleClickFinish} className="button">Finish Poll</button>
                        <button>X</button>
                    </div>)
                : <button onClick={handleClickHome} className="button">Back To Home</button>) : null}
            
        </Main>
    )
}
export default PollInProgress