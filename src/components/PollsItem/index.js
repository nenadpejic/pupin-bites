import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/utilities";
import { AuthContext } from "../../contexts/AuthContext";

const PollsItem = ({ poll }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const date = new Date(poll.created);
  const dateEnd = new Date(date.setMinutes(date.getMinutes() + auth.time));
  const dateCurrent = new Date();
  const [err, setErr] = useState("");

  const handlePollVote = (e) => {
    if (dateCurrent >= dateEnd) {
      setErr("Poll has ended.");
    } else {
      history.push(`/poll-vote/${e}`);
    }
  };

  return (
    <tr key={poll.id} onClick={() => handlePollVote(poll.id)}>
      {err
        ? <td colSpan="3">{err}</td>
        : <>
          <td>{poll.label}</td>
          <td>{formatDate(poll.created)}</td>
          <td>{formatDate(dateEnd)}</td>
        </>
      }
    </tr>
  );
};

export default PollsItem;
