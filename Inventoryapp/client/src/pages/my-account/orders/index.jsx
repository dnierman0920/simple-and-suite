import API from "api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./orders.module.scss";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    getAllOrders();
  }, []);

  const [orders, setOrders] = useState();

  const getAllOrders = async () => {
    await API.get(`/order/${user.currentUser.user.userId}`)
      .then((res) => {
        setOrders(res.data.orders);
        console.log("res", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tableData = orders?.map((order) => {
    return (
      <tr key={order._id}>
        <td>#{order._id}</td>
        <td>August 29, 2022</td>
        <td>{order.status}</td>
        <td>${order.total}.00</td>
        <td>
          <div>
            <button
              onClick={() => navigate(`/my-account/view-order/${order.cartId}`)}
            >
              View
            </button>
            <button>Invoice</button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className={classes.orders}>
      <div className={classes.ordersHolder}>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
