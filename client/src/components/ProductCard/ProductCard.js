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
  quantity,
}) {
  const addToCart = () => {
    const productIndex = cart.findIndex((product) => product.title === title);

    if (productIndex !== -1) {
      const newCart = [...cart];
      newCart[productIndex].quantity++;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const product = {
        title,
        description,
        calories,
        allergens,
        price,
        image,
        quantity: 1,
      };
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
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
          <p id="price">£{price}</p>
          <p>{quantity}</p>
        </div>
        <div>
          <button onClick={addToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
