import React, { useState } from "react";
import classes from "./PaymentOptions.module.scss";
import Radio from "@mui/material/Radio";
import paypal from "assets/images/paypal.png";
import mastercard from "assets/images/mastercard.png";
import visa from "assets/images/visa.png";
import backArrow from "assets/images/back.png";

const PaymentOptions = ({ setCheckoutStep, setOrder }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const selectPaymentMethod = (method) => {
    setSelectedValue(method);
    setOrder((prevState) => {
      return {
        ...prevState,
        paymentMethod: method,
      };
    });
  };

  return (
    <div className={classes.paymentOptions}>
      <div className={classes.card}>
        <h3>Payment Options</h3>
        <div
          className={classes.option}
          onClick={() => selectPaymentMethod("card")}
        >
          <div className={classes.optionContent}>
            <div>
              <Radio
                checked={selectedValue === "card"}
                onChange={handleChange}
                value="card"
                name="payment-option"
                inputProps={{ "aria-label": "card" }}
              />
            </div>
            <div>
              <p>Credit / Debit Card</p>
              <p>We support Mastercard, Visa, Discover and Stripe</p>
            </div>
          </div>
          <div className={classes.optionImage}>
            <img src={mastercard} alt="mastercard logo" />
            <img src={visa} alt="visa logo" />
          </div>
        </div>
        <div
          className={classes.option}
          onClick={() => selectPaymentMethod("paypal")}
        >
          <div className={classes.optionContent}>
            <div>
              <Radio
                checked={selectedValue === "paypal"}
                onChange={handleChange}
                value="paypal"
                name="payment-option"
                inputProps={{ "aria-label": "paypal" }}
              />
            </div>
            <div>
              <p>Pay with Paypal</p>
              <p>
                You will be redirected to PayPal website to complete your
                purchase securely.
              </p>
            </div>
          </div>
          <div className={classes.optionImage}>
            <img src={paypal} alt="paypal logo" />
          </div>
        </div>
        <div
          className={classes.option}
          onClick={() => selectPaymentMethod("cod")}
        >
          <div className={classes.optionContent}>
            <div>
              <Radio
                checked={selectedValue === "cod"}
                onChange={handleChange}
                value="cod"
                name="payment-option"
                inputProps={{ "aria-label": "cod" }}
              />
            </div>
            <div>
              <p>Cash on CheckoutDelivery</p>
              <p>Pay with cash when your order is delivered.</p>
            </div>
          </div>
          <div className={classes.optionImage}></div>
        </div>
      </div>
      <div className={classes.backButton} onClick={() => setCheckoutStep(2)}>
        <img src={backArrow} alt="back arrow" />
        Back
      </div>
    </div>
  );
};

export default PaymentOptions;
