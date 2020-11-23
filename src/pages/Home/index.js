import React, { useEffect, useState } from "react";
import { getAllPolls, getManyOrders } from "../../services/services";
import { useHistory } from "react-router-dom";
import PollsItem from "../../components/PollsItem";
import ActiveOrderItem from "../../components/ActiveOrderItem";
import NavBar from "../../components/NavBar";
import "./style.css";

const Home = () => {
  const [polls, setPolls] = useState([]);
  const history = useHistory();

  const handleCreatePoll = () => {
    history.push("/create-poll");
  };

  //Hvatam listu anketa iz baze
  useEffect(() => {
    getAllPolls()
      .then((res) => {
        const data = res.data;
        setPolls(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Hvatam aktivne ordere
  useEffect(() => {
    getManyOrders()
      .then((res) => {
        const data = res.data.data;
        setActiveOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="home">
      <NavBar />
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
