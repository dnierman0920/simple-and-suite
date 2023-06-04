import React from "react";
import classes from "./MegaDropDown.module.scss";
import phoneIcon from "../../assets/images/Phone Icon.svg";
import BlogImage from "../../assets/images/BlogImage.png";
import { Link } from "react-router-dom";

const MegaDropDown = () => {
  return (
    <div className={classes.megaDropDown}>
      <div className={classes.container}>
        <div className={classes.categoriesWrapper}>
          <div className={classes.topSection}>
            <Link to="/">
              <div className={classes.categoryHolder}>
                <div className={classes.categoryImageHolder}>
                  <svg
                    width="21"
                    height="30"
                    viewBox="0 0 21 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.2857 1H3.71429C2.21523 1 1 2.21523 1 3.71429V25.4286C1 26.9276 2.21523 28.1429 3.71429 28.1429H17.2857C18.7848 28.1429 20 26.9276 20 25.4286V3.71429C20 2.21523 18.7848 1 17.2857 1Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.5 22.7144H10.5136"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className={classes.categoryContentHolder}>
                  <div className={classes.title}>Phones</div>
                  <div className={classes.title}>Your Day To Day Life</div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className={classes.categoryHolder}>
                <div className={classes.categoryImageHolder}>
                  <svg
                    width="23"
                    height="33"
                    viewBox="0 0 23 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.42847 1H17.238"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.42847 32H17.238"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="1"
                      y="5.42847"
                      width="20.6667"
                      height="22.1429"
                      rx="3"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className={classes.categoryContentHolder}>
                  <div className={classes.title}>Watch</div>
                  <div className={classes.title}>Not Just Stylist</div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className={classes.categoryHolder}>
                <div className={classes.categoryImageHolder}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 23.3999H15.014"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="28"
                      height="28"
                      rx="2"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className={classes.categoryContentHolder}>
                  <div className={classes.title}>Tablet</div>
                  <div className={classes.title}>Empower your work</div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className={classes.categoryHolder}>
                <div className={classes.categoryImageHolder}>
                  <svg
                    width="36"
                    height="23"
                    viewBox="0 0 36 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.8823 1H8.11756C6.75309 1 5.64697 2.10612 5.64697 3.47059V15.8235C5.64697 17.188 6.75309 18.2941 8.11756 18.2941H27.8823C29.2467 18.2941 30.3529 17.188 30.3529 15.8235V3.47059C30.3529 2.10612 29.2467 1 27.8823 1Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.94116 22H34.0588"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className={classes.categoryContentHolder}>
                  <div className={classes.title}>Laptops</div>
                  <div className={classes.title}>True Laptop solution</div>
                </div>
              </div>
            </Link>
          </div>
          <div className={classes.textHolder}>
            Shop headsets and headphones for desktops, laptops, mobile devices,
            business, education, working from home, and video calls.
          </div>
        </div>
        <div className={classes.blogWrapper}>
          <div className={classes.blogImage}>
            <img src={BlogImage} alt="blog" />
          </div>
          <div className={classes.blogContent}>
            <div className={classes.subTitle}>EDITORIAL</div>
            <div className={classes.mainTitle}>
              We Make it Easy To Find The Great Design Talent,Easier...
            </div>
            <div className={classes.date}>JUNE 15,2022</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaDropDown;
