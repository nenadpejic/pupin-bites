import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneOrder } from "../../services/services";
import { formatDate } from "../../utilities/utilities";

const SingleOrderCreate = () => {
  const [order, setOrder] = useState({});
  const { slug } = useParams();
  //Hvatam jedan order
  useEffect(() => {
    getOneOrder(slug)
      .then((res) => {
        // console.log(res);
        const data = res.data;
        setOrder(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <div id="single-order-create">
      <h1>SingleOrderCreate</h1>
      <p>Label: {order.label}</p>
      <p>ID: {order.id}</p>
      <p>Created: {formatDate(order.created)}</p>
      <p>Active: {order.active?.toString()}</p>
      <p>RestaurantId: {order.restaurantId}</p>
    </div>
  );
};

export default SingleOrderCreate;
