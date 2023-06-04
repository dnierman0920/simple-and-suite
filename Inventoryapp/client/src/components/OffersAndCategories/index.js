import React from "react";
import classes from "./OffersAndCategories.module.scss";
import { Link } from "react-router-dom";
import categoryImageLaptop from "assets/images/categoryImageLaptop.png";
import phoneCategory from "assets/images/phoneCategory.png";
import tabletCategory from "assets/images/tabletCategory.png";
import categoryWatch from "assets/images/categoryWatch.png";
import woman from "assets/images/home/woman.png";
import shoes from "assets/images/home/shoes.png";
import mens from "assets/images/home/mens.png";
import kids from "assets/images/home/kids.png";

const OffersAndCategories = () => {
  return (
    <section className={classes.offersAndCategories}>
      <h2 className={classes.sectionTitle}>
      Put Our Newest Gear To Work
      </h2>
      <div className={classes.categoriesGrid}>
        <Link to="">
          <div className={classes.category}>
            <img src={mens} alt="" />
            <small>Shop Men</small>
          </div>
        </Link>
        <Link to="">
          <div className={classes.category}>
            <img src={woman} alt="" />
            <small>Shop Women</small>
          </div>
        </Link>
        <Link to="">
          <div className={classes.category}>
            <img src={kids} alt="" />
            <small>Shop Kids</small>
          </div>
        </Link>
        <Link to="">
          <div className={classes.category}>
            <img src={shoes} alt="" />
            <small>Shop Shoes</small>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default OffersAndCategories;
