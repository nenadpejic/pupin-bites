import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/utilities";

const PollsItem = ({ data }) => {
  const [createdFormater, setCreatedFormater] = useState("");
  const history = useHistory();

  const handlePollVote = (e) => {
    history.push(`/poll-vote/${e}`);
  };

  useEffect(() => {
    setCreatedFormater(formatDate(data.created));
  }, []);

  return (
    <li key={data.id} prop={data.id} onClick={() => handlePollVote(data.id)}>
      <p>
        <span>Label:</span> {data.label}
      </p>
      <p>
        <span>ID:</span> {data.id}
      </p>
      <p>
        <span>Created:</span> {createdFormater}
      </p>
      <p>
        <span>Active:</span> {data.active}
      </p>
    </li>
  );
};

export default PollsItem;
