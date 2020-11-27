import React, { useEffect, useRef, useState, useContext } from 'react'
import { map, uniqBy } from 'lodash'
import Main from '../../components/Main'
import RestaurantItem from '../../components/RestaurantItem'
import { getProfile, postCheckData } from '../../services/services'
//Css
import './PollCreate.css'

// Services
import { getAllRestaurants, createPoll } from '../../services/services.js'
import { useHistory } from 'react-router-dom'
// context
import { AuthContext } from "../../contexts/AuthContext";



const PollCreate = () => {
    const auth = useContext(AuthContext);
    const [change, setChange] = useState('')
    const [filter, setFilter] = useState([])
    const [selected, setSelected] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [pollName, setPollName] = useState('')
    const [email, setEmail] = useState('')

    // States for time calculation
    const [time, setTime] = useState('')
    // const [hoursToEnd, setHoursToEnd] = useState(0)
    // const [minutesToEnd, setMinutesToEnd] = useState(15)
    // const [duration, setDuration] = useState(15)

    // Token
    const tokenRef = useRef(localStorage.getItem("Token"))
    const token = tokenRef.current

    // Redirect
    const history = useHistory()

    useEffect(() => {
        getAllRestaurants(token).then(res => {
            let tmp = res.data
            setRestaurants(map(uniqBy(tmp, 'name')))
        })
        getProfile().then(res => {
            setEmail(res.data.email)
        })
    }, [token])

    // Handeling hours
    // const handleTime = (e) => {
    //     let name = e.target.name
    //     let value = e.target.value

    //     if (name === 'hours') {
    //         (value > 24) ? setHoursToEnd(e.target.value) : setHoursToEnd(value)
    //     }
    //     else if (name === 'minutes') {
    //         value > 59 ? setMinutesToEnd(e.target.value) : setMinutesToEnd(value)
    //     }
    //     setDuration(Number(hoursToEnd) * 60 + Number(minutesToEnd))

    //     let timer = new Date()
    //     timer.setHours(timer.getHours() + parseInt(hoursToEnd))
    //     timer.setMinutes(timer.getMinutes() + parseInt(minutesToEnd))
    //     setTime(timer.toString(','))
    // }
    // Handeling input change
    const handleChange = (e) => {
        setChange(e.target.value)
        change <= 0 ? setFilter([]) : setFilter(restaurants.filter(el => el.name.toLowerCase().includes(change)))
    }
    // Add button
    const handleClickAdd = (restaurant, e) => {
        let id = e.target.id
        setSelected(selected.concat(restaurant))
        setRestaurants(restaurants.filter(el => el.id !== id))
        setFilter(filter.filter(el => el.id !== id))
    }
    // Remove button
    const handleClickRemove = (e) => {
        let id = e.target.id
        setSelected(selected.filter(el => el.id !== id))
        setRestaurants(restaurants.concat(selected.filter(el => el.id === id)))
        setFilter(filter.concat(selected.filter(el => el.id === id)))
    }
    //Handle Time
    const handleTime = () => {
        let timer = new Date()
        timer.setHours(timer.getHours() + auth.time)
        timer.setMinutes(timer.getMinutes() + auth.time)
        setTime(timer.toString(','))
    }
    // Submit button
    const handleSubmit = () => {
        if (pollName.trim() !== '' && selected.length >= 2) {
            let data = {
                "label": pollName,
                "restaurants": selected.map(el => el.id)
            }
            handleTime()
            let currentPoll
            createPoll(data).then(res => {
                currentPoll = res.data.id
                let pollId = []
                pollId.push(localStorage.getItem('createPoll'))
                pollId.push(res.data.id)
                localStorage.setItem('createPoll', pollId)

                let info = {
                    'email': email,
                    'poll': currentPoll,
                    'date': time
                }
                postCheckData(info)
                return history.push(`/poll-vote/${currentPoll}`)
            })
        }
        else {
            alert("Please add poll name and select two or more restaurants!");
            return;
        }

    }
    const displayResults = selected.length === 0 ? "none" : "block";

    return (
        <Main>
            <div>
                <h2 className="page-title">Create Poll</h2>
                <input type="text" placeholder="Poll Name" onChange={(e) => setPollName(e.target.value)} required /><br></br>
                {/* <div className="pollDuration">
                        <div className="title">Set Duration</div>
                        <div className="hours">
                            <input type="number" placeholder="h" name="hours" min="0" max="24" onChange={handleTime} required />
                        </div>
                        <div className="minutes">
                            <input type="number" placeholder="m" name="minutes" min="10" max="59" size="100" onChange={handleTime} required />
                        </div>
                    </div> */}
                <input type="text" placeholder="Search Restaurant" onChange={handleChange} />
                <div className="info">Poll duration time is <b>{`${auth.time}`}</b> min</div>

                <div className="restaurant-list">
                    {change.length === 0 ? restaurants.map((restaurant) => (
                        //Complete list
                        <div className="item" key={restaurant.id}>
                            <div><RestaurantItem restaurant={restaurant} /></div>
                            <button onClick={(e) => handleClickAdd(restaurant, e)} id={restaurant.id}>+ </button>
                        </div>))
                        : filter.map((restaurant) => (
                            //Filtered list
                            <div className="item" key={restaurant.id}>
                                <div><RestaurantItem restaurant={restaurant} /></div>
                                <button onClick={(e) => handleClickAdd(restaurant, e)} id={restaurant.id}>+ </button>
                            </div>))}
                </div>
            </div>
            <div style={{ display: `${displayResults}` }}>
                <div className="selected-list">
                    <table>
                        <thead><tr><th colSpan="2">Selected Restaurants</th></tr></thead>
                        <tbody>
                            {selected.map((restaurant) => (
                                <tr><td>{restaurant.name}</td>
                                    <td><i onClick={(e) => handleClickRemove(e)} id={restaurant.id} className="material-icons"> delete</i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div >
                    <button className="bigButton" type="submit" onClick={(e) => handleSubmit(e)}>Create Poll</button>
                </div>
            </div>
        </Main>
    )
}
export default PollCreate