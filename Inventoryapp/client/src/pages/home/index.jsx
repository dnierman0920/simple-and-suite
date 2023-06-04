import HeroSection from "components/HeroSection";
import OfferStripe from "components/OfferStripe";
import React from "react";
import BestSellersSection from "../../components/BestSellersSection";
import EmailSubSection from "../../components/EmailSubSection";
import OffersAndCategories from "../../components/OffersAndCategories";

const Home = () => {
  return (
    <div>
      <OfferStripe />
      <HeroSection />
      <OffersAndCategories />
      <BestSellersSection />
      <EmailSubSection />
    </div>
  );
};

export default Home;
