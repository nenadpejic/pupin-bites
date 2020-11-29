import React, { useEffect, useState } from "react";
import { getAllPolls, getAllOrders } from "../../services/services";
import { Link } from "react-router-dom";
import PollsItem from "../../components/PollsItem";
import ActiveOrderItem from "../../components/ActiveOrderItem";
import Main from "../../components/Main";
import "./style.css";

const Home = () => {
  const [activeButton, setActiveButton] = useState(0);
  // Polls
  const [polls, setPolls] = useState([]);
  const [searchPolls, setSearchPolls] = useState([]);
  const [pollSearch, setPollSearch] = useState("");
  // Orders
  const [orders, setOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState("");
  // Sorting
  const [direction, setDirection] = useState(true);
  const [scale, setScale] = useState(null);

  function compare(a, b) {
    if (a.label.toLowerCase() < b.label.toLowerCase()) {
      return -1;
    }
    if (a.label.toLowerCase() > b.label.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  const handleSortName = (param) => {
    setDirection(!direction);
    if (param === "poll") {
      setPolls(polls?.reverse());
    } else if (param === "order") {
      setOrders(orders?.reverse());
    }
    if (direction) {
      setScale({ transform: "scaleY(-1)" });
    } else {
      setScale(null);
    }
  };

  // Hvatam listu anketa iz baze
  useEffect(() => {
    getAllPolls()
      .then((res) => {
        let data = res.data;
        data = data.filter((poll) => poll.active);
        data.sort(compare);
        setPolls(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Hvatam listu ordera iz baze
  useEffect(() => {
    getAllOrders()
      .then((res) => {
        let data = res.data;
        data = data.filter((order) => order.active);
        data.sort(compare);
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
        <button>
          <Link to="/poll-create">Create Poll</Link>
        </button>
        <button>
          <Link to="/single-order-create">Create Order</Link>
        </button>

        <div className="tab">
          <button
            className={activeButton === 0 ? "activeButton" : ""}
            onClick={() => {
              setActiveButton(0);
            }}
          >
            Active Polls
          </button>
          <button
            className={activeButton === 1 ? "activeButton" : ""}
            onClick={() => {
              setActiveButton(1);
            }}
          >
            Active Orders
          </button>
        </div>
        {!activeButton ? (
          <div id="Polls" className="tabcontent">
            <div className="pollList">
              <div className="search">
              <input
                type="search"
                onChange={(e) => handlePollSearch(e)}
                // value={pollSearch}
                placeholder="Search by poll name..."
              />
              </div>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSortName("poll")}>
                      Poll Name
                      <img
                        src={"/img/icons/arrow-down.svg"}
                        alt="arrow-down"
                        style={scale}
                      />
                    </th>
                    <th>Poll Started</th>
                    <th>Poll End</th>
                  </tr>
                </thead>
                <tbody>
                  {pollSearch.length
                    ? searchPolls.map((poll) => (
                        <PollsItem key={poll.id} poll={poll} />
                      ))
                    : polls.map((poll) => (
                        <PollsItem key={poll.id} poll={poll} />
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div id="Orders" className="tabcontent">
            <div className="orders">
            <div className="search">
              <input
                type="search"
                onChange={(e) => handleOrderSearch(e)}
                // vaule={orderSearch}
                placeholder="Search by order name..."
              />
              </div>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSortName("order")}>
                      Order Name
                      <img
                        src={"/img/icons/arrow-down.svg"}
                        alt="arrow-down"
                        style={scale}
                      />
                    </th>
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
          </div>
        )}
      </div>
    </Main>
  );
};
export default Home;
