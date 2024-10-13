import React from "react";
import Navbar from "./shared/Navbar";
import Hero from "./shared/Hero";
import Cards from "./Cards";
import Footer from "./shared/Footer";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Cards/>
      <Footer/>
    </div>
  );
};
export default Home;
