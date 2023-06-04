import React from "react";
import classes from "./orderSuccess.module.scss";
import orderSuccessImage from "assets/images/order.svg";
import { useNavigate, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className={classes.orderSuccess}>
      <div className={classes.wrapper}>
        <h2>Thank you for your purchase!</h2>
        <img src={orderSuccessImage} alt="successful order" />
        <p className={classes.thankYouNote}>
          Thanks for placing order <span>{id}</span>
        </p>
        <p className={classes.thankYouNote}>
          If you have any question or queries then fell to get in contact us.
        </p>
        <p className={classes.thankYouNote}>All the best :)</p>
        <div className={classes.continueShopping}>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
