import React, { useEffect, useState } from "react";
import { getProfile, getAllPolls } from "../../services/services";
import { useHistory } from "react-router-dom";
import "./style.css";

const Home = () => {
  const [user, setUser] = useState();
  const [polls, setPolls] = useState([]);
  const history = useHistory();

  const handleCreatePoll = () => {
    history.push("/create-poll");
  };

  const handlePollVote = (e) => {
    history.push(`/poll-vote/${e}`);
  };

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data.firstName + " " + res.data.lastName);
      })
      .catch((err) => {
        console.log(err);
      });
    //Hvatam listu anketa iz baze
    getAllPolls()
      .then((res) => {
        console.log(res);
        const data = res.data;
        setPolls(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="home">
      <nav>
        <span>User: {user}</span>
      </nav>
      <h1>Home</h1>
      <button onClick={handleCreatePoll}>Create Poll</button>
      <ul>
        {polls.map((poll) => (
          <li
            key={poll.id}
            prop={poll.id}
            onClick={() => handlePollVote(poll.id)}
          >
            <p>
              <span>Label:</span> {poll.label}
            </p>
            <p>
              <span>ID:</span> {poll.id}
            </p>
            <p>
              <span>Created:</span> {poll.created}
            </p>
            <p>
              <span>Active:</span> {poll.active}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
