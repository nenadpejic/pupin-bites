import React, { useEffect, useState } from "react";
import { getAllPolls, getAllOrders } from "../../services/services";
import { useHistory } from "react-router-dom";
import PollsItem from "../../components/PollsItem";
import ActiveOrderItem from "../../components/ActiveOrderItem";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./style.css";

const Home = () => {
  const history = useHistory();
  //Polls
  const [polls, setPolls] = useState([]);
  const [searchPolls, setSearchPolls] = useState([]);
  const [pollSearch, setPollSearch] = useState("");
  //Orders
  const [activeOrders, setActiveOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState("");

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

  const handlePollSearch = (e) => {
    setPollSearch(e.target.value);
    setSearchPolls(polls.filter((elem) => elem.label.includes(e.target.value)));
  };

  const handleOrderSearch = (e) => {
    setOrderSearch(e.target.value);
    setSearchOrders(
      activeOrders.filter((elem) => elem.label.includes(e.target.value))
    );
  };

  return (
    <div id="home">
      {/* Main */}
      <NavBar />
      <h1>Home</h1>
      <button onClick={handleCreatePoll}>Create Poll</button>
      <button onClick={handleCreateOrder}>Create Order</button>
      <h2>Polls</h2>
      <input
        type="search"
        onChange={handlePollSearch}
        value={pollSearch}
        placeholder="Search for poll..."
      />
      <ul>
        {!pollSearch.length
          ? polls.map((poll) => <PollsItem key={poll.id} data={poll} />)
          : searchPolls.map((poll) => <PollsItem key={poll.id} data={poll} />)}
      </ul>
      <h2>Active Orders</h2>
      <input
        type="search"
        onChange={handleOrderSearch}
        vaule={orderSearch}
        placeholder="Search for order..."
      />
      <ul>
        {!orderSearch.length
          ? activeOrders?.map((order) => (
              <ActiveOrderItem key={order.id} data={order} />
            ))
          : searchOrders?.map((order) => (
              <ActiveOrderItem key={order.id} data={order} />
            ))}
      </ul>
      <Footer />
    </div>
  );
};
export default Home;
