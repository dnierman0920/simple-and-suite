import React, { useEffect, useState } from "react";
import classes from "./SelectAddress.module.scss";
import backArrow from "assets/images/back.png";
import AddNewAddress from "../AddNewAddress";
import AddressCard from "components/AddressCard";
import { useSelector } from "react-redux";
import API from "api";

const SelectAddress = ({ setCheckoutStep, setOrder }) => {
  const user = useSelector((state) => state.user);
  const [availableAddresses, setAvailableAddresses] = useState([]);

  useEffect(() => {
    getAllAddresses();
  }, []);

  //FETCHING ALL ADDRESSES
  const getAllAddresses = async () => {
    API.get(`/address/${user.currentUser.user.userId}`).then((res) => {
      setAvailableAddresses(res.data.allAddress);
    });
  };

  return (
    <>
      <div className={classes.selectAddress}>
        <div className={classes.addressCardWrapper}>
          {availableAddresses?.map((address, index) => {
            return (
              <AddressCard
                key={index}
                setOrder={setOrder}
                setCheckoutStep={setCheckoutStep}
                address={address}
              />
            );
          })}
          {availableAddresses?.length === 0 && (
          <div className={classes.noAddress}>Please Add your shipping address</div>
          )}
        </div>
        <AddNewAddress setAvailableAddresses={setAvailableAddresses} />
        <div className={classes.backButton} onClick={() => setCheckoutStep(1)}>
          <img src={backArrow} alt="back arrow" />
          Back
        </div>
      </div>
    </>
  );
};

export default SelectAddress;
