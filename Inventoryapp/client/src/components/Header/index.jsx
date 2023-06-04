import React, { useState } from "react";
import classes from "./Header.module.scss";
import logo from "../../assets/images/BlackLogo.svg";
import CartIcon from "../../assets/images/CartIcon.svg";
import userIcon from "../../assets/images/user.png";
import SearchIcon from "../../assets/images/SearchIcon.svg";
import NavMenuButton from "../../assets/images/NavMenuButton.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cart from "../Cart";
import { useSelector } from "react-redux";


const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/shop"> SHOP</NavLink>
            </li>
            {/* <li onClick={() => setShowDropDown((prevState) => !prevState)}>
              SOLUTIONS <img src={downArrow} alt="down arrow" />
              {showDropDown && <MegaDropDown />}
            </li> */}
            <li>
              <NavLink to="/shop"> MENS </NavLink>
            </li>
            <li>
              <NavLink to="/shop"> WOMEN </NavLink>
            </li>
            <li>
              <NavLink to="/shop"> KIDS </NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes.navIcons}>
          <div className={classes.cartIconWrapper}>
            <img
              src={CartIcon}
              alt="cart icon"
              onClick={() => setShowCart(!showCart)}
            />
            {quantity > 0 && (
              <div className={classes.cartCount}>{quantity}</div>
            )}
          </div>
          {user.currentUser ? (
            <div className={classes.userProfilePic} onClick={() => navigate('/my-account')}>
              {user.currentUser.user.firstName[0]}
            </div>
          ) : (
            <Link to="login">
              <img src={userIcon} alt="user icon" />
            </Link>
          )}
        </div>
      </div>
      {showCart && <Cart setShowCart={setShowCart} />}
    </header>
  );
};

export default Header;
