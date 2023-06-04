import React from "react";
import deleteIcon from "../../assets/images/delete.png";
import backArrow from "../../assets/images/back.png";
import classes from "./OrdersTable.module.scss";
import { Link } from "react-router-dom";
import { deleteItem } from "features/cartSlice";
import { useDispatch } from "react-redux";

const OrdersTable = ({ cart }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.orderTable}>
      <div className={classes.orderTable__card}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.products?.map((product) => {
              return (
                <tr key={product.productId}>
                  <td className={classes.product}>
                    <div className={classes.productImage}>
                      <img src={product?.imageUrl} alt={product?.name} />
                    </div>
                    <div className={classes.productDetails}>
                      <p>{product?.name}</p>
                    </div>
                  </td>
                  <td>${product?.price}</td>
                  <td>{product?.quantity}</td>
                  <td>${product?.price * product?.quantity}</td>
                  <td>
                    <div className={classes.deleteItem}>
                      <img
                        src={deleteIcon}
                        alt="delete icon"
                        onClick={() => dispatch(deleteItem({ product }))}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={classes.backButton}>
        <img src={backArrow} alt="back arrow" />
        <Link to="/shop">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrdersTable;
