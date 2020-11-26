import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/utilities";

const PollsItem = ({ poll }) => {
  const history = useHistory();
  const date = new Date(poll.created);

  const handlePollVote = (e) => {
    history.push(`/poll-vote/${e}`);
  };

  return (
    <tr key={poll.id} onClick={() => handlePollVote(poll.id)}>
      <td>{poll.label}</td>
      <td>{formatDate(poll.created)}</td>
      <td>{formatDate(date.setMinutes(date.getMinutes() + 30))}</td>
    </tr>
  );
};

export default PollsItem;
