import React, { useEffect, useState } from "react";
import { getAllPolls, getAllOrders } from "../../services/services";
import { useHistory } from "react-router-dom";
import PollsItem from "../../components/PollsItem";
import ActiveOrderItem from "../../components/ActiveOrderItem";
import Main from "../../components/Main";
//import { formatDate } from "../../utilities/utilities";
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
  const [activeButton,setActiveButton] = useState(1);
  
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

  //////////////////////////// PRIKAZ VREMENA ///////////////////////////////
  const showTime = (t)=>{
    let monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    let d = new Date(t);
    if(Number.isNaN(d.getFullYear()) || d.getFullYear()===1970) return "";
    let date = `${d.getDate()+""}. ${monthNames[d.getMonth()]} ${d.getFullYear()+""}.`;
    let time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    return date + " " + time;
}  
  
  ////////////////////////// MENJANJE TABOVA ////////////////////////////
  const openTab = (e,tabName)=> {
    let c = e.target.className;
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }     
    document.getElementById(tabName).style.display = "block";
     c += " active";   
  }  
  ///////////////////////////////////////////////////////////////////


  return (
      <Main>
        <div id="home">

        <button onClick={handleCreatePoll}>Create Poll</button>
        <button onClick={handleCreateOrder}>Create Order</button>

          <div className="tab">
            <button className = {`tablinks ${activeButton===1 ? "activeButton" : ""}`} onClick={
              (e)=>{openTab(e,'Polls');
                    setActiveButton(1)
              }}>Polls</button> 
            <button className = {`tablinks ${activeButton===2 ? "activeButton" : ""}`}  onClick={
              (e)=>{openTab(e,'Orders');
                setActiveButton(2)
              }}>Active Orders</button> 
          </div>

          <div id="Polls" className="tabcontent">
            
            <div className="pollList" >
              <table>
                  <thead>
                    <tr><th>Poll Name</th><th>Poll Start</th><th>Poll End</th></tr>
                  </thead>
                  <tbody>
                    {polls.map((poll) => ( 
                      <PollsItem  key={poll.id} poll={poll}/>
                    ))}
                    </tbody>
                </table>
            </div>
          </div>

          <div id="Orders" className="tabcontent">
            <div className="orders">
              <table>
                <thead><tr><th>Status</th><th>Time</th><th>Poll Name</th></tr></thead>
                <tbody>
              {activeOrders?.map((order) => (
                  <ActiveOrderItem key={order.id} order={order}/>
             ))}
              </tbody> 
             </table> 
            </div>
            
          </div> 

        </div>
      </Main>
/*
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
    */
  );

};
export default Home;
