// import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { formatDate } from "../../utilities/utilities";

const PollsItem = ({ poll }) => {
  // const [createdFormater, setCreatedFormater] = useState("");
  const history = useHistory();

  const handlePollVote = (e) => {
    history.push(`/poll-vote/${e}`);
  };

  // useEffect(() => {
  //   setCreatedFormater(formatDate(poll.created));
  // }, [poll.created]);

  const showTime = (t) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = new Date(t);
    if (Number.isNaN(d.getFullYear()) || d.getFullYear() === 1970) return "";
    let date = `${d.getDate() + ""}. ${monthNames[d.getMonth()]} ${d.getFullYear() + ""}.`;
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return date + " " + time;
  }

  return (
    <tr key={poll.id} onClick={() => handlePollVote(poll.id)}>
      <td>{poll.label}</td>
      <td>{showTime(poll.created)}</td>
      <td>{
        // showTime(poll.???)
      }</td>
    </tr>
  );
};

export default PollsItem;
