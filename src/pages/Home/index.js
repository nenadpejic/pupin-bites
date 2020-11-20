import React, { useState } from "react";

const Home = () => {
  const [user, setUser] = useState();

  return (
    <div id="home">
      <nav>
        {user}
      </nav>
      <h1>Home</h1>
    </div>
  );
}

export default Home;