import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "api";

import UserSharedLayout from "./layouts/userSharedLayout";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/sign-up";
import MainLayout from "./layouts/mainLayout";
import Profile from "./pages/my-account/profile";
import Orders from "./pages/my-account/orders";
import ViewOrder from "./pages/my-account/view-order";
import AllProducts from "./pages/shop";
import SingleProduct from "./pages/single-product";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/order-success";
import MyAddress from "./pages/my-account/address";
import ChangePassword from "pages/my-account/change-password";

function App() {
  const user = useSelector((state) => state.user);
  API.defaults.headers.token = `Bearer ${user.currentUser?.token}`;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/shop" element={<AllProducts />} />
        <Route path="/all-products/:id" element={<SingleProduct />} />
        <Route
          path="/checkout"
          element={<Checkout user={user.currentUser} />}
        />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
      </Route>
      <Route
        path="/my-account"
        element={<UserSharedLayout user={user.currentUser} />}
      >
        <Route index element={<Profile />} />
        <Route path="/my-account/orders" element={<Orders />} />
        <Route
          path="/my-account/change-password"
          element={<ChangePassword />}
        />
        <Route path="/my-account/address" element={<MyAddress />} />
        <Route path="/my-account/view-order/:id" element={<ViewOrder />} />
      </Route>
    </Routes>
  );
}

export default App;
