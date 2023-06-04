import React, { useState } from "react";
import classes from "./change-password.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "api";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.oldPassword || !input.newPassword) {
      toast.error("Please fill all required fields");
      return;
    }

    await API.patch(`/${user.currentUser.user.userId}`, input)
      .then((res) => {
        console.log(res);
        setInput({
          oldPassword: "",
          newPassword: "",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <form className={classes.changePassword} onSubmit={handleSubmit}>
      <div className={classes.twoCol}>
        <div className={classes.inputGroup}>
          <label htmlFor="">Old Password</label>
          <input
            type="text"
            value={input.oldPassword}
            name="oldPassword"
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="">New Password</label>
          <input
            type="text"
            name="newPassword"
            value={input.newPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <button className={classes.saveBtn}>Save Changes</button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default ChangePassword;
