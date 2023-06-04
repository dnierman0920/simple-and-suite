import React, { useEffect, useState } from "react";
import classes from "./login.module.scss";
import showIcon from "../../assets/images/login/show.png";
import hideIcon from "../../assets/images/login/hide.png";
import exclamationMark from "../../assets/images/login/exclamation-mark.png";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { loginStart, loginSuccess, loginFailure } from "features/userSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [userInput, setUserInput] = useState({
    email: "janith@gmail.com",
    password: "janith123456",
  });

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart);
    console.log("submitted");
    if (!userInput.email || !userInput.password) {
      return;
    }
    setLoading(true);
    await API.post("/login", userInput)
      .then((res) => {
        dispatch(loginSuccess(res.data.data));
        setLoading(false);
        console.log(res);
        localStorage.setItem("token", res.data);
        navigate("/");
      })
      .catch((error) => {
        dispatch(loginFailure);
        setLoading(false);
        setErrorMessage(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <main className={classes.login}>
      <div className={classes.loginRight}>
        <div className={classes.loginWrapper}>
          <h4>Login</h4>
          {errorMessage !== "" && (
            <small className={classes.validationError}>
              <img src={exclamationMark} alt="exclamation mark" />
              {errorMessage}
            </small>
          )}
          <form action="" onSubmit={handleSubmit}>
            <div className={classes.inputHolder}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                name="email"
                value={userInput.email}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputHolder}>
              <label htmlFor="password">Password</label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={userInput.password}
                onChange={handleChange}
              />
              <img
                src={showPassword ? hideIcon : showIcon}
                onClick={() => setShowPassword((prevState) => !prevState)}
                alt="password reveal icon"
              />
            </div>
            <button type="submit">{loading ? <Spinner /> : "Login"}</button>
          </form>
          <p className={classes.newAccount}>
            New to California ? <Link to="/sign-up">Create an Account</Link>{" "}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
