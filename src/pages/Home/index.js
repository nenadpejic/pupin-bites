import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/services";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getProfile()
      .then(res => {
        setUser(res.data.firstName + " " + res.data.lastName);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <div id="home">
      <nav>
        <span>User: {user}</span>
      </nav>
      <h1>Home</h1>
    </div>
  );
}

export default Home;