import React, { useEffect, useRef, useState } from 'react'
import { map, uniqBy } from 'lodash'
import Main from '../../components/Main'

//Css
import './PollCreate.css'

// Services
import { getAllRestaurants, createPoll } from '../../services/services.js'
import { Redirect, useHistory } from 'react-router-dom'

const PollCreate = () => {
    const [change, setChange] = useState('')
    const [filter, setFilter] = useState([])
    const [selected, setSelected] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [pollName, setPollName] = useState('')

    // States for time calculation
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(15)
    const [duration, setDuration] = useState(15)
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
    }, [token])

    // Handeling hours
    const handleTime = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === 'hours') {
            (value > 24) ? setHours(e.target.value) : setHours(value)
        }
        else if (name === 'minutes') {
            value > 59 ? setMinutes(e.target.value) : setMinutes(value)
        }
        setDuration(Number(hours) * 60 + Number(minutes))
    }
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
    // Submit button
    const handleSubmit = () => {
        let data = {
            "label": pollName,
            "restaurants": selected.map(el => el.id)
        }
        let currentPoll
        createPoll(data).then(res => {
            currentPoll = res.data.id
            let pollId = []
            pollId.push(localStorage.getItem('createPoll'))
            pollId.push(res.data.id)
            localStorage.setItem('createPoll', pollId)

        })
        setTimeout(() => {
            return history.push(`/poll-vote/${currentPoll}`)
        }, 1000)
    }


    return (
        <>
            <Main>
                <div>
                    <h3>Create Poll</h3>
                    <input type="text" placeholder="Poll Name" onChange={(e) => setPollName(e.target.value)} required />
                    <div className="pollDuration">
                        <div className="title">Set Duration</div>
                        <div className="hours">
                            <input type="number" placeholder="h" name="hours" min="0" max="24" onChange={(e) => handleTime(e)} required />
                        </div>
                        <div className="between">:</div>
                        <div className="minutes">
                            <input type="number" placeholder="m" name="minutes" min="10" max="59" size="100" onChange={(e) => handleTime(e)} required />
                        </div>
                    </div>

                    <label>Search Restaurants<br /></label>
                    <input type="text" placeholder="..search" onChange={handleChange} />

                    {change.length === 0 ? restaurants.map((restaurant) =>
                        //Complete list
                        <div key={restaurant.id}>
                            <div>{restaurant.name}</div>
                            <button onClick={(e) => handleClickAdd(restaurant, e)} id={restaurant.id}>Add Restaurant</button>
                        </div>)
                        : filter.map((restaurant) =>
                            //Filtered list
                            <div key={restaurant.id}>
                                <div>{restaurant.name}</div>
                                <button onClick={(e) => handleClickAdd(restaurant, e)} id={restaurant.id}>Add Restaurant</button>
                            </div>)}
                </div>

                <div>
                    <h3>Restaurants</h3>
                    {selected.map((restaurant) =>
                        <div key={restaurant.id} >
                            <div>{restaurant.name}</div>
                            <button onClick={(e) => handleClickRemove(e)} id={restaurant.id}>X</button>
                        </div>)}

                </div>
                <div>
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Create Poll</button>
                </div>
            </Main>
        </>
    )
}
export default PollCreate