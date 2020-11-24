import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/utilities";

const ActiveOrderItem = ({ data }) => {
  const history = useHistory();

  const handleActiveOrder = (e) => {
    history.push(`/single-order-add/${e}`);
  };

  return (
    <li key={data.id} onClick={() => handleActiveOrder(data.id)}>
      <p>{data.active.toString()}</p>
      <p>{formatDate(data.created)}</p>
      <p>{data.id}</p>
      <p>{data.label}</p>
      <p>{data.restaurantId}</p>
    </li>
  );
};

export default ActiveOrderItem;
