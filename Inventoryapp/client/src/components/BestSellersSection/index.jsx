import API from "api";
import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard";
import classes from "./BestSellersSection.module.scss";

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    await API.get("/products")
      .then((res) => {
        const bestSellers = res.data.data.slice(0, 4);
        setProducts(bestSellers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className={classes.bestSellersSection}>
      <h2 className={classes.sectionTitle}>Save on our best sellers</h2>
      <p className={classes.sectionDesc}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi,
        modi.
      </p>

      <div className={classes.productsWrapper}>
        {products.map((product) => {
          return <ItemCard product={product} key={product._id} />;
        })}
      </div>
    </section>
  );
};

export default BestSellersSection;
