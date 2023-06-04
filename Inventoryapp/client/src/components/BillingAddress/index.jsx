import React from "react";
import classes from "./BillingAddress.module.scss";

const BillingAddress = ({ address }) => {
  
  return (
    <div className={classes.billingAddress}>
      <h3>Billing Address</h3>
      <p className={classes.name}>
        {address?.name}
      </p>
      <address className={classes.address}>
        {address.street}
        <br />
        {address.city}
        <br />
        {address.state}
        <br />
        {address.postalCode}
      </address>
      {/* <p className={classes.contactNumber}>990-588-5716</p> */}
    </div>
  );
};

export default BillingAddress;
