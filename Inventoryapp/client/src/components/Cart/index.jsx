import React, { useState } from "react";
import classes from "./Cart.module.scss";
import close from "../../assets/images/cancel.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "features/cartSlice";
import CartItem from "../CartItem";
import { useNavigate } from "react-router-dom";

const Cart = ({ setShowCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  console.log("cart", cart);

  const handleNavigation = (navigateTo) => {
    if (navigateTo === "checkout") {
      navigate("/checkout");
    } else {
      navigate("/shop");
    }
    setShowCart(false);
  };
  return (
    <div className={classes.cart}>
      <div className={classes.cartOverlay}></div>
      <div className={classes.cartWrapper}>
        <div className={classes.cartHeader}>
          <div
            className={classes.clearCart}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </div>
          <p>YOUR CART</p>
          <div
            onClick={() => setShowCart((prevState) => !prevState)}
            className={classes.close}
          >
            <img src={close} alt="close icon" />
          </div>
        </div>
        <div className={classes.cartBody}>
          {cart.products.map((product, index) => {
            return <CartItem product={product} key={index} />;
          })}
          {cart.products?.length < 1 && <h3>Your Cart is Empty </h3>}
        </div>
        <div className={classes.cartFooter}>
          <div className={classes.total}>
            <p>Total</p>
            <p>${cart.total} USD</p>
          </div>
          <div className={classes.btns}>
            {cart.products.length > 0 ? (
              <button onClick={() => handleNavigation("checkout")}>Checkout</button>
            ) : (
              <button onClick={() =>  handleNavigation("shop")}>
                Continue Shopping
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
