import React, { useState } from 'react'

const CreatePoll = ({ token, restaurants }) => {
    const [change, setChange] = useState('')
    const [filter, setFilter] = useState([])
    const [selected, setSelected] = useState([])

    // Handeling change in input
    const handleChange = (e) => {
        setChange(e.target.value)
        setFilter(restaurants.filter(el => el.name.toLowerCase().includes(change)))
    }
    // Add button
    const handleClickAdd = (restaurant) => {
        return selected.map(restaurant => restaurant.id).includes(restaurant.id) ? null : setSelected(selected.concat(restaurant))
    }
    // Remove button
    const handleClickRemove = (i) => {
        return setSelected(selected.filter((el, selectedIndex) => selectedIndex !== i))
    }

    return (
        <main>
            <section>
                <h3>Create Poll</h3>
                <input type="text" placeholder="Poll Name" />
                <div>
                    <input type="number" placeholder="Hours" />
                    <input type="number" placeholder="Minutes" />
                </div>

                <label>Search Restaurants<br /></label>
                <input type="text" placeholder="..search" onChange={handleChange} />

                {change.length === 0 ? restaurants.slice(1, 10).map(restaurant =>
                    //Complete list
                    <div key={restaurant.id}>
                        <div>{restaurant.name}</div>
                        <button onClick={() => handleClickAdd(restaurant)}>Add Restaurant</button>
                    </div>)
                    : filter.slice(1, 10).map(restaurant =>
                        //Filtered list
                        <div key={restaurant.id}>
                            <div>{restaurant.name}</div>
                            <button onClick={() => handleClickAdd(restaurant)}>Add Restaurant</button>
                        </div>)}
            </section>

            <section>
                <h3>Restaurants</h3>
                {selected.map((restaurant, i) =>
                    <div key={restaurant.id}>
                        <div>{restaurant.name}</div>
                        <button onClick={() => handleClickRemove(i)}>X</button>
                    </div>)}
            </section>
        </main>
    )
}
export default CreatePoll