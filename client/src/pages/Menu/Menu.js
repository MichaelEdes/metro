import React from "react";
import "./Menu.css";
import { content } from "../../types/food";
import ProductCard from "../../components/ProductCard/ProductCard";

function Menu({ cart, setCart }) {
  return (
    <div className="menu-container">
      {content.map((item, index) => (
        <ProductCard
          key={index}
          title={item.title}
          description={item.description}
          calories={item.calories}
          allergens={item.allergens}
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
