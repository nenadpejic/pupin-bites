import React, { useEffect, useRef, useState } from 'react'
import './CreatePoll.css'

// Services
import { getAllRestaurants, createPoll } from '../../services/services.js'

const CreatePoll = () => {
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
    const tokenRef = useRef(JSON.parse(localStorage.getItem("Token")))
    const token = tokenRef.current

    useEffect(() => {
        getAllRestaurants(token).then(res => {
            setRestaurants(res.data)
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
        setFilter(restaurants.filter(el => el.name.toLowerCase().includes(change)))
    }
    // Add button
    const handleClickAdd = (restaurant, i) => {
        setSelected(selected.concat(restaurant))
        filter.length === 0 ? setRestaurants(restaurants.filter((el, selectedIndex) => selectedIndex !== i)) :
            setFilter(filter.filter((el, selectedIndex) => selectedIndex !== i))
    }
    // Remove button
    const handleClickRemove = (restaurant, i) => {
        setRestaurants(restaurants.concat(selected.filter((el, selectedIndex) => selectedIndex === i)))
        filter.length === 0 ? setSelected(selected.filter((el, selectedIndex) => selectedIndex === i)) :
            setFilter(filter.concat(selected.filter((el, selectedIndex) => selectedIndex !== i)))
    }
    // Submit button
    const handleSubmit = () => {
        let data = {
            "label": pollName,
            "restaurants": selected.map(el => el.id)
        }
        createPoll(data).then(res => {
            console.log(res.data)
        })
    }

    return (
        <section>
            <div>
                <h3>Create Poll</h3>
                <input type="text" placeholder="Poll Name" onChange={(e) => setPollName(e.target.value)} required />
                <div>
                    <input type="number" placeholder="Hours" name="hours" defaultValue="0" min="0" max="24" onChange={(e) => handleTime(e)} required />
                    <input type="number" placeholder="Minutes" name="minutes" defaultValue="15" min="10" max="59" onChange={(e) => handleTime(e)} required />
                </div>

                <label>Search Restaurants<br /></label>
                <input type="text" placeholder="..search" onChange={handleChange} required />

                {change.length === 0 ? restaurants.slice(1, 10).map((restaurant, i) =>
                    //Complete list
                    <div key={restaurant.id}>
                        <div>{restaurant.name}</div>
                        <button onClick={() => handleClickAdd(restaurant, i)}>Add Restaurant</button>
                    </div>)
                    : filter.slice(1, 10).map((restaurant, i) =>
                        //Filtered list
                        <div key={restaurant.id}>
                            <div>{restaurant.name}</div>
                            <button onClick={() => handleClickAdd(restaurant, i)}>Add Restaurant</button>
                        </div>)}
            </div>

            <div>
                <h3>Restaurants</h3>
                {selected.map((restaurant, i) =>
                    <div key={restaurant.id}>
                        <div>{restaurant.name}</div>
                        <button onClick={() => handleClickRemove(i)}>X</button>
                    </div>)}
            </div>
            <div>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Create Poll</button>
            </div>
        </section>
    )
}
export default CreatePoll