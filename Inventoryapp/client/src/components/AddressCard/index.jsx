import React from "react";
import classes from "./AddressCard.module.scss";
const AddressCard = ({ setOrder, setCheckoutStep, address }) => {

  const selectAddress = () => {
    setOrder((prevState) => {
      return {
        ...prevState,
        shippingAddress: address,
      };
    });
    setCheckoutStep(3);
  };

  return (
    <div className={classes.address}>
      <div className={classes.addressDetails}>
        <p className={classes.name}>{address.name}</p>
        <address className={classes.completeAddress}>
          {address?.street},
          <br />
          {address?.city && address?.city}
          <br />
          {address?.state && address?.state}
          <br />
          {address?.postalCode && address?.postalCode}
        </address>
        {/* <p className={classes.contact}>365-374-4961</p> */}
      </div>
      <div className={classes.addressButtons}>
        <button onClick={selectAddress}>Deliver to this Address</button>
      </div>
    </div>
  );
};

export default AddressCard;
