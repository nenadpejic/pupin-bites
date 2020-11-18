import React, { useState } from 'react'

const CreatePoll = ({ token, restaurants }) => {
    const [change, setChange] = useState('')
    const [filter, setFilter] = useState([])
    const [selected, setSelected] = useState([])

    const handleChange = (e) => {
        setChange(e.target.value)
        setFilter(restaurants.filter(el => el.name.toLowerCase().includes(change)))
    }


    return (
        <>
            <section>
                <h3>Create Poll</h3>
                <input type="text" />
                <div>
                    <label>Hours:</label>
                    <input type="number" />
                    <label>Minutes</label>
                    <input type="number" />
                </div>
                <label>Search Restaurants<br /></label>
                <input type="text" onChange={handleChange} />
                {change.length === +'' ? restaurants.map(restaurant =>
                    <div key={restaurant.id}>
                        <div>{restaurant.name}</div>
                        <button onClick={() => selected.map(restaurant => restaurant.id).includes(restaurant.id) ? null : setSelected(selected.concat(restaurant))}>Add Restaurant</button>
                    </div>)
                    : filter.map(restaurant =>
                        <div key={restaurant.id}>
                            <div>{restaurant.name}</div>
                            <button onClick={() => selected.map(restaurant => restaurant.id).includes(restaurant.id) ? null : setSelected(selected.concat(restaurant))}>Add Restaurant</button>
                        </div>)}
            </section>

            <section>
                <h3>Restaurants</h3>
                {selected.map((restaurant, i) =>
                    <div key={restaurant.id}>
                        <div>{restaurant.name}</div>
                        <button onClick={() => setSelected(selected.filter((el, i2) => i2 !== i))}> X</button>
                    </div>)}
            </section>
        </>
    )
}
export default CreatePoll