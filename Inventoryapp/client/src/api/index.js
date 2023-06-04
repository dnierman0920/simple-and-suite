import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:rootUser"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const token = currentUser?.token;

const API = axios.create({
  // baseURL: "https://california-ecommerce.cyclic.app/api/v1",
  baseURL: "http://localhost:5050/api/v1",
  headers: {
    token: `Bearer ${token}`,
  },
});

export default API;
