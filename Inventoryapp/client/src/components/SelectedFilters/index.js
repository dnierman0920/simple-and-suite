import React from "react";
import classes from "./SelectedFilters.module.scss";
import close from "assets/images/cancel.png";
const SelectedFilters = ({
  filters,
  setFilters,
  setCategories,
  categories,
}) => {
  const allFilters = { ...filters, ...categories };

  const filterTruthyValues = Object.keys(allFilters).filter(
    (value) => !!allFilters[value]
  );
  console.log("filterTruthyValues", filterTruthyValues);
  const removeFilter = (value) => {
    const newValue =
      typeof allFilters[value] == "boolean" ? !allFilters[value] : "";
      if (allFilters[value] !== "boolean") {
      console.log('ran setFilters')
      return setFilters((prevState) => {
        return {
          ...prevState,
          [value]: newValue,
        };
      });
    } else {
      console.log('this ran')
      setCategories((prevState) => {
        return {
          ...prevState,
          [value]: newValue,
        };
      });
    }
  };

  const filtersList =
    filterTruthyValues.length !== 0 &&
    filterTruthyValues.map((option, index) => {
      return (
        <div className={classes.filter} key={index}>
          <p>
            {option === "price" || option === "rating"
              ? filters[option]
              : option}
          </p>
          <div
            className={classes.closeIcon}
            onClick={() => removeFilter(option)}
          >
            <img src={close} alt="close icon" />
          </div>
        </div>
      );
    });

  return <div className={classes.selectedFilters}>{filtersList}</div>;
};

export default SelectedFilters;
