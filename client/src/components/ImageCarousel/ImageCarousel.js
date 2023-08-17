import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./ImageCarousel.css";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

function ImageCarousel({ cart, setCart }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("https://metro-sandwich-shop-df14f9a980e0.herokuapp.com/items")
      .then((response) => setContent(response.data))
      .catch((error) => console.error("Axios error:", error));
  }, []);

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => product.title === item.title);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <Slider className="slider-wrapper">
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{
            background: `url('${item.image}') no-repeat center center`,
          }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button onClick={() => addToCart(item)}>Add To Cart</button>
          </div>
          <section>
            <PriorityHighIcon id="icon" />
            <span>Price: {item.price}</span>
            <span>Calories: {item.calories}Kcals</span>
            <span>
              Allergens: {item.allergens ? item.allergens.split("") : []}
            </span>
          </section>
        </div>
      ))}
    </Slider>
  );
}

export default ImageCarousel;
