import React, { useState } from "react";
import classes from "./AddNewAddress.module.scss";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewAddress = ({ setAvailableAddresses }) => {
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const addAddress = () => {
    const hasEmptyFields = Object.values(addressInfo).some(
      (value) => value === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill all required fields");
      return;
    }

    setAvailableAddresses((prevState) => {
      return [...prevState, addressInfo];
    });

    resetFields();
  };

  const resetFields = () => {
    setAddressInfo({
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div className={classes.addNewAddress}>
      <h3>Add New Address</h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Full Name"
            id="filled-size-small"
            size="small"
            name="name"
            value={addressInfo.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            id="filled-size-small"
            size="small"
            value={addressInfo.street}
            name="street"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Town/City"
            id="filled-size-small"
            size="small"
            fullWidth
            value={addressInfo.city}
            name="city"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="State"
            id="filled-size-small"
            size="small"
            name="state"
            value={addressInfo.state}
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Postal Code"
            id="filled-size-small"
            value={addressInfo.postalCode}
            size="small"
            name="postalCode"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          className="add-address-btn"
          size="small"
          onClick={resetFields}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          className="add-address-btn"
          onClick={addAddress}
          size="small"
        >
          Add Address
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddNewAddress;
