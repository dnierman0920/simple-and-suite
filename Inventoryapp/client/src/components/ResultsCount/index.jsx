import React, { useState } from "react";
import classes from "./ResultsCount.module.scss";
import Select from "react-select";

const ResultsCount = ({ productsCount, setFilters }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const selectOptions = [
    { value: "latest", label: "Newest First" },
    { value: "1", label: "Price Low to High" },
    { value: "-1", label: "Price High to Low" },
  ];
  const handleChange = (e) => {
    console.log(e);
    setSelectedOption(e);
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        sort: e.value,
      };
    });
  };
  return (
    <div className={classes.resultsCount}>
      <div className={classes.count}>
        Showing:{" "}
        <span>
          1-{productsCount < 10 ? productsCount : 10} products of{" "}
          {productsCount} results
        </span>{" "}
      </div>
      <div className={classes.sortBy}>
        Sort by
        <Select
          placeholder=""
          className={classes.customSelect}
          defaultValue={selectedOption}
          value={selectedOption}
          onChange={handleChange}
          options={selectOptions}
        />
      </div>
    </div>
  );
};

export default ResultsCount;
