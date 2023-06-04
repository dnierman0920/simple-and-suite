import React, { useState } from "react";
import classes from "./address.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "components/Spinner";
import API from "api";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const MyAddress = () => {
  const user = useSelector((state) => state.user);
  const { userId } = user.currentUser.user;

  const [allAddress, setAllAddress] = useState([]);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllAddress();
  }, []);

  //HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddressInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  //DELETE AN ADDRESS
  const deleteAddress = async (addressID) => {
    await API.delete(`/address/${addressID}`)
      .then((res) => {
        console.log(res);
        getAllAddress();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //GET ALL ADDRESSES
  const getAllAddress = async () => {
    await API.get(`/address/${userId}`).then((res) => {
      console.log(res);
      setAllAddress(res.data.allAddress);
    });
  };

  //CREATE A NEW ADDRESS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const noEmptyFields = Object.values(addressInfo).every(
      (value) => value !== ""
    );

    if (!noEmptyFields) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    await API.post("/address", {
      ...addressInfo,
      userId: user.currentUser.user.userId,
    })
      .then((res) => {
        console.log(res);
        setAddressInfo({
          name: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
        });
        getAllAddress();
        toast.success("Address created");
        setIsSubmitting(false);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className={classes.myAddress}>
      <div className={classes.addressCardWrapper}>
        {allAddress?.map((address) => {
          return (
            <div className={classes.addressCard} key={address._id}>
              <h6 className={classes.name}>{address.name}</h6>{" "}
              <address>
                <p>{address.street} </p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.postalCode}</p>
              </address>
              <button onClick={() => deleteAddress(address._id)}>Remove</button>
            </div>
          );
        })}
      </div>
      <form className={classes.wrapper} onSubmit={handleSubmit}>
        <div className={classes.twoCol}>
          <div className={classes.inputGroup}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              id=""
              name="name"
              value={addressInfo.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="">Address/Street</label>
          <input
            type="text"
            name="street"
            value={addressInfo.street}
            id=""
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.twoCol}>
          <div className={classes.inputGroup}>
            <label htmlFor="">City</label>
            <input
              type="text"
              name="city"
              value={addressInfo.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.inputGroup}>
            <label htmlFor="">State/Province</label>
            <input
              type="text"
              name="state"
              value={addressInfo.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={classes.twoCol}>
          <div className={classes.inputGroup}>
            <label htmlFor="">Postal Code</label>
            <input
              type="text"
              value={addressInfo.postalCode}
              name="postalCode"
              onChange={handleChange}
              required
            />
          </div>
          <div></div>
        </div>
        <button className={classes.saveBtn}>
          {isSubmitting ? <Spinner color="blue" /> : "Add Address"}{" "}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyAddress;
