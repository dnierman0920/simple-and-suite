import React from "react";
import classes from "./Sidebar.module.scss";
import addressIcon from "../../assets/images/userProfile/address.png";
import shoppingBag from "../../assets/images/userProfile/shopping-bag.png";
import user from "../../assets/images/userProfile/user.png";
import password from "../../assets/images/userProfile/password.png";
import logoutIcon from "../../assets/images/userProfile/logout.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "features/userSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <aside className={classes.sidebar}>
      <div className={classes.linksHolder}>
        <div className={classes.sideLink}>
          <Link to="/my-account">
            <img src={user} alt="user" />
            Profile
          </Link>
        </div>
        <div className={classes.sideLink}>
          <Link
            to="/my-account/orders"
          >
            <img src={shoppingBag} alt="shopping bag" />
            Orders
          </Link>
        </div>
        <div className={classes.sideLink}>
          <Link
            to="/my-account/address"
          >
            <img src={addressIcon} alt="address icon" />
            Address
          </Link>
        </div>
        <div className={classes.sideLink}>
          <Link to="/my-account/change-password">
            <img src={password} alt="password lock" />
            Change password
          </Link>
        </div>
        <div className={classes.sideLink}>
          <div onClick={logout} className={classes.logout}>
            <img src={logoutIcon} alt="shopping bag" />
            Logout
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
