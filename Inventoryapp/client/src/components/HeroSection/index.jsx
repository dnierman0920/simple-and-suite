import React from "react";
import classes from "./HeroSection.module.scss";
import { Link } from "react-router-dom";

const HeroSection = () => {

  return (
    <div className={classes.heroSection}>
      <div className={classes.heroSection__content}>
        
        <p className={classes.subTitle}>
          UA HOVR<sup>TM</sup> Phantom 3 Running Shoes{" "}
        </p>
        <h1>
          MORE UA HOVER<sup>TM</sup>.
        </h1>
        <h1>MORE DRIVE.</h1>
        <h1>MORE WINS.</h1>
        <small>
          Get ready for your biggest season yet, hit those intervals hard with
          explosive, energy-returning cushioning.
        </small>
        <Link to="/shop">Shop Now</Link>
      </div>
    </div>
  );
};

export default HeroSection;
