import API from "api";
import ProductSkeleton from "components/ProductSkeleton";
import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import ItemCard from "../../components/ItemCard";
import ResultsCount from "../../components/ResultsCount";
import SelectedFilters from "../../components/SelectedFilters";
import Pagination from "@mui/material/Pagination";
import classes from "./allProducts.module.scss";
// import arrowIcon from "../../assets/images/down-arrow.png";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [filters, setFilters] = useState({
    price: "",
    gender: "",
    sort: ""
  });

  const [isProductsLoading, setIsProductsLoading] = useState(false);

  const [categories, setCategories] = useState({
    shorts: false,
    tanks: false,
    shoes: false,
  });

  //extracting only the selected categories
  const categoryQueryParams = Object.keys(categories)
    .filter((value) => !!categories[value])
    .join();

  const queryParams = {
    category: categoryQueryParams,
    page: page,
    minPrice: "",
    maxPrice: "",
    gender: ""
  };

  //Setting up the price query
  if (filters.price) {
    const priceRange = filters.price?.split("-");
    queryParams.minPrice = priceRange[0] && priceRange[0];
    queryParams.maxPrice = priceRange[1] && priceRange[1];
  }

  if (filters.gender) {
    queryParams.gender = filters.gender;
  }

  if (filters.sort) {
    queryParams.sort = filters.sort;
  }

  //fetching products
  const getAllProduct = async () => {
    setIsProductsLoading(true);
    await API.get("/products", { params: queryParams })
      .then((res) => {
        setIsProductsLoading(false);
        setProducts(res.data.data);
        setTotalResults(res.data.productsCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle pagination

  const handlePagination = (event, value) => {
    console.log("event", event);
    console.log("value", value);
    setPage(value);
  };

  useEffect(() => {
    getAllProduct();
  }, [filters, categories, page]);

  const productsList = products?.map((product) => {
    return <ItemCard product={product} key={product._id} />;
  });

  const skeletonLoaders = [1, 2, 3, 4, 5, 6].map((number) => {
    return <ProductSkeleton key={number} />;
  });

  return (
    <div className={classes.allProducts}>
      <div className={classes.wrapper}>
        <aside>
          <Filter
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            setCategories={setCategories}
          />
        </aside>
        <div>
          <ResultsCount productsCount={totalResults} setFilters={setFilters} />
          {/* <SelectedFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            setCategories={setCategories}
          /> */}
          <div className={classes.productsGrid}>
            {!isProductsLoading ? productsList : skeletonLoaders}
          </div>
        </div>
      </div>
      <div className={classes.pagination}>
        {totalResults > 10 && (
          <div className={classes.paginationHolder}>
            <Pagination
              count={totalResults / 10}
              page={page}
              onChange={handlePagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
