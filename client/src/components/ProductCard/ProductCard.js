import React from "react";
import "./ProductCard.css";

function ProductCard({
  title,
  description,
  calories,
  allergens,
  price,
  image,
  cart,
  setCart,
}) {
  const addToCart = () => {
    const product = { title, description, calories, allergens, price, image };
    setCart([...cart, product]);
  };
  return (
    <div className="product-card">
      <img className="product-card-image" src={image} alt={title} />
      <div className="product-card-content">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>Calories: {calories} Kcal</p>
          <p>Allergens: {allergens.join(", ")}</p>
          <p id="price">{price}</p>
        </div>
        <div>
          <button onClick={addToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
