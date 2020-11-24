import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/utilities";

const ActiveOrderItem = ({ order }) => {
  const history = useHistory();

  const handleActiveOrder = (e) => {
    history.push(`/single-order-add/${e}`);
  };

  return (
    <tr key={order.id} onClick={() => handleActiveOrder(order.id)}>
      <td>{order.active.toString()}</td>
      <td>{formatDate(order.created)}</td>
      <td>{order.label}</td>
    </tr>
  );
};

export default ActiveOrderItem;
