import React, { useEffect, useState } from "react";
import { getAllPolls, getAllOrders } from "../../services/services";
import { useHistory } from "react-router-dom";
import PollsItem from "../../components/PollsItem";
import ActiveOrderItem from "../../components/ActiveOrderItem";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./style.css";

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const history = useHistory();

  const handleCreatePoll = () => {
    history.push("/poll-create");
  };

  const handleCreateOrder = () => {
    history.push("/single-order-create");
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
    getAllOrders()
      .then((res) => {
        const data = res.data;
        setActiveOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="home">
      {/* Main */}
      <NavBar />
      <h1>Home</h1>
      <button onClick={handleCreatePoll}>Create Poll</button>
      <button onClick={handleCreateOrder}>Create Order</button>
      <h2>Polls</h2>
      <ul>
        {polls.map((poll) => (
          <PollsItem key={poll.id} data={poll} />
        ))}
      </ul>
      <h2>Active Orders</h2>
      <ul>
        {activeOrders?.map((order) => (
          <ActiveOrderItem key={order.id} data={order} />
        ))}
      </ul>
      <Footer />
    </div>
  );
};
export default Home;