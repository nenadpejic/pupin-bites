import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/utilities";

const PollsItem = ({ poll }) => {
  const history = useHistory();

  const handlePollVote = (e) => {
    history.push(`/poll-vote/${e}`);
  };

  return (
    <tr key={poll.id} onClick={() => handlePollVote(poll.id)}>
      <td>{poll.label}</td>
      <td>{formatDate(poll.created)}</td>
      <td>{
        // formatDate(???)
      }</td>
    </tr>
  );
};

export default PollsItem;
