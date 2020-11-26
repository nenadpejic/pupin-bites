import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getOnePoll, updatePoll } from '../../services/services'
import Main from '../../components/Main'
import PollInfo from '../../components/PollInfo'
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
 
    
    const totalVotes = restaurants.map(r=>r.vote.length).reduce((a,b)=>a+b, 0);

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

                {restaurants.map(restaurant =>
                    <div key={restaurant.id} id={restaurant.id} className="poll">
                        <div>{restaurant.name}</div>
                        <div>{restaurant.address}</div>
                        <div value={restaurant.vote.length}>Votes: {restaurant.vote.length}</div>
                    </div>
                )}
            </div> */}
            {createdPolls[0] ? (createdPolls[0].includes(slug) ? <button className="bigButton" onClick={handleClick}>Finish Poll</button> : null) : null} 
        </Main>
    )
}
export default PollInProgress