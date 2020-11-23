import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePoll } from "../../services/services";
import Navigation from "../../components/Navigation";
import Main from "../../components/Main";
import PollInfo from "../../components/PollInfo";

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
    <> 
    <Main>
      <h1>PollVote</h1>
      < PollInfo poll={poll}/>
    </Main>
    </>
  );
};

export default PollVote;
