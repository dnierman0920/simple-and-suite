import API from "api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./view-order.module.scss";

const ViewOrder = () => {
  const { id } = useParams();
  const [cart, setCart] = useState({});

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    await API.get(`cart/${id}`).then((res) => {
      setCart(res.data.cart);
      console.log(res);
    });
  };
  return (
    <div className={classes.viewOrder}>
      <div className={classes.wrapper}>
        <h3>Order Details</h3>
        <div className={classes.orderDetails}>
          <div className={classes.detailRow}>
            <div className={classes.label}>Product</div>
            <div className={classes.label}>Total</div>
          </div>
          {cart.products?.map((product) => {
            return (
              <div className={classes.detailRow}>
                <div className={classes.value}>
                  {product.name} × {product.quantity}
                </div>
                <div className={classes.value}>
                  LKR {product.price * product.quantity}.00
                </div>
              </div>
            );
          })}
          <div className={classes.detailRow}>
            <div className={classes.label}>Subtotal:</div>
            <div className={classes.label}>${cart.total}.00</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.label}>Shipping:</div>
            <div className={classes.label}>Free</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.label}>Payment method:</div>
            <div className={classes.label}>{cart.paymentMethod}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.label}>Total:</div>
            <div className={classes.label}>LKR {cart.total}</div>
          </div>
        </div>
        <div className={classes.shippingAddress}>
          <h3>Shipping Address</h3>
          <div className={classes.addressHolder}>
            <address>
              B 35 2/2 soysapura housing scheme moratuwa srilanka soysapura
              housing scheme moratuwa srilanka Moratuwa CMB SUB 1040
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
