import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Menu.css";
import ProductCard from "../../components/ProductCard/ProductCard";

function Menu({ cart, setCart }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((response) => setContent(response.data))
      .catch((error) => console.error("Axios error:", error));
  }, []);

  return (
    <div className="menu-container">
      {content.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          calories={item.calories}
          allergens={item.allergens ? item.allergens.split("") : []}
          price={item.price}
          image={item.image}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}

export default Menu;
