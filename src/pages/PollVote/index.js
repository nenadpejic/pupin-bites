import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePoll } from "../../services/services";

const PollVote = () => {
  const [poll, setPoll] = useState({});
  const { slug } = useParams();
  //Hvatam jedan poll
  useEffect(() => {
    getOnePoll(slug)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setPoll(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="poll-vote">
      <h1>PollVote</h1>
      <p>Label: {poll.label}</p>
      <p>ID: {poll.id}</p>
      <p>Created: {poll.created}</p>
      <p>Active: {poll.active}</p>
    </div>
  );
};

export default PollVote;
