import React, { useState } from "react";
import "./HomePage.css";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";

function HomePage({ cart, setCart }) {
  return (
    <div className="home-page-container">
      <ImageCarousel cart={cart} setCart={setCart} />
    </div>
  );
}

export default HomePage;
