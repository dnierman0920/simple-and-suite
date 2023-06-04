import React, { useState } from "react";
import classes from "./Filter.module.scss";


const Filter = ({ filters, setFilters, setCategories, categories }) => {
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    if (name === "price") {
      setPrice(value);
    }
  };

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    setCategories({ ...categories, [name]: checked });
  };

  const resetAllFilters = () => {
    setFilters({
      rating: "",
      price: "",
      sort: "",
      availability: false,
    });
    setCategories({
      shorts: false,
      tanks: false,
      shoes: false,
    });
    setPrice("");
  };

  const genderTypes = ["male", "female", "unisex"];

  return (
    <div className={classes.filter}>
      <div className={classes.filterTitle}>
        Filters <button onClick={resetAllFilters}>Clear Filters</button>
      </div>
      <div className={classes.filterOption}>
        <div className={classes.filterCollapse}>Category</div>
        <ul className={classes.filtersList}>
          <li>
            <input
              type="checkbox"
              name="shorts"
              checked={categories.shorts}
              id="shorts"
              onChange={handleCheckbox}
            />
            <label htmlFor="shorts">Shorts</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="shoes"
              checked={categories.shoes}
              id="shoes"
              onChange={handleCheckbox}
            />
            <label htmlFor="shoes">Shoes</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="tanks"
              checked={categories.tanks}
              id="tanks"
              onChange={handleCheckbox}
            />
            <label htmlFor="tanks">Tanks</label>
          </li>
        </ul>
      </div>
      <div className={classes.filterOption}>
        <div className={classes.filterCollapse}>Gender</div>
        <ul className={classes.filtersList}>
          {genderTypes.map((gender, index) => {
            return (
              <li key={index}>
                <input
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value={gender}
                  id={gender}
                />
                <label htmlFor={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes.filterOption}>
        <div className={classes.filterCollapse}>Price</div>
        <ul className={classes.filtersList}>
          <li>
            <input
              type="radio"
              name="price"
              value="40-500"
              checked={price === "40-500"}
              onChange={handleChange}
              id="priceLvl1"
            />
            <label htmlFor="priceLvl1">$40 - $500</label>
          </li>
          <li>
            <input
              type="radio"
              name="price"
              value="500-1000"
              checked={price === "500-1000"}
              onChange={handleChange}
              id="priceLvl2"
            />
            <label htmlFor="priceLvl2">$500 - $1000</label>
          </li>
          <li>
            <input
              type="radio"
              name="price"
              value="1000-2000"
              checked={price === "1000-2000"}
              onChange={handleChange}
              id="priceLvl3"
            />
            <label htmlFor="priceLvl3">$1000 - $2000</label>
          </li>
          <li>
            <input
              type="radio"
              name="price"
              value="2000-3000"
              checked={price === "2000-3000"}
              onChange={handleChange}
              id="priceLvl4"
            />
            <label htmlFor="priceLvl4">$2000 - $3000</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
