import React, { useEffect, useState } from "react";
import { getAllPolls, getAllOrders } from "../../services/services";
import { useHistory } from "react-router-dom";
import PollsItem from "../../components/PollsItem";
import ActiveOrderItem from "../../components/ActiveOrderItem";
import Main from "../../components/Main";
import "./style.css";

const Home = () => {
  const history = useHistory();
  const [activeButton, setActiveButton] = useState(0);
  // Polls
  const [polls, setPolls] = useState([]);
  const [searchPolls, setSearchPolls] = useState([]);
  const [pollSearch, setPollSearch] = useState("");
  // Orders
  const [orders, setOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState("");

  const handleCreatePoll = () => {
    history.push("/poll-create");
  };

  const handleCreateOrder = () => {
    history.push("/single-order-create");
  };

  // Hvatam listu anketa iz baze
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

  // Hvatam listu ordere iz baze
  useEffect(() => {
    getAllOrders()
      .then((res) => {
        const data = res.data;
        setOrders(data);
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
      orders.filter((elem) => elem.label.includes(e.target.value))
    );
  };

  return (
    <Main>
      <div id="home">
        <button onClick={handleCreatePoll}>Create Poll</button>
        <button onClick={handleCreateOrder}>Create Order</button>

        <div className="tab">
          <button className={activeButton === 0 ? "activeButton" : ""}
            onClick={() => {
              setActiveButton(0)
            }}>Active Polls</button>
          <button className={activeButton === 1 ? "activeButton" : ""}
            onClick={() => {
              setActiveButton(1)
            }}>Active Orders</button>
        </div>
        {!activeButton
          ? <div id="Polls" className="tabcontent">
            <div className="pollList" >
              <input
                type="search"
                onChange={e => handlePollSearch(e)}
                // value={pollSearch}
                placeholder="Search for poll..."
              />
              <table>
                <thead>
                  <tr>
                    <th>Poll Name</th>
                    <th>Poll Started</th>
                    {/* <th>Poll End</th> */}
                  </tr>
                </thead>
                <tbody>
                  {!pollSearch.length
                    ? polls.map((poll) => <PollsItem key={poll.id} poll={poll} />)
                    : searchPolls.map((poll) => <PollsItem key={poll.id} poll={poll} />)}
                </tbody>
              </table>
            </div>
          </div>
          : <div id="Orders" className="tabcontent">
            <div className="orders">
              <input
                type="search"
                onChange={e => handleOrderSearch(e)}
                // vaule={orderSearch}
                placeholder="Search for order..."
              />
              <table>
                <thead>
                  <tr>
                    <th>Order Name</th>
                    <th>Order Started</th>
                  </tr>
                </thead>
                <tbody>
                  {!orderSearch.length
                    ? orders?.map((order) => (
                      <ActiveOrderItem key={order.id} order={order} />
                    ))
                    : searchOrders?.map((order) => (
                      <ActiveOrderItem key={order.id} order={order} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>}
      </div>
    </Main>
  )
};
export default Home;
