import React, { useContext } from "react";
import "./ShoppingCart.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import CartItem from "../CartItem/CartItem";

function ShoppingCart({ setCartOpen, isCartOpen }) {
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/Account");
  };

  return (
    <>
      <div
        onClick={() => setCartOpen(!isCartOpen)}
        className={`overlay ${!isCartOpen && "is-active overlay-active"}`}
      />
      <div className={`cart-container ${!isCartOpen && "is-active"}`}>
        <div className="cart-header">
          <div className="cart-options">
            <h1>Cart</h1>
            <ExitToAppIcon
              id="close-cart"
              onClick={() => setCartOpen(!isCartOpen)}
            />
          </div>
          <p>You have {calculateTotalQuantity()} item(s) in your cart</p>
        </div>
        <div className="cart">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              title={item.title}
              image={item.image}
              index={index}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="checkout">
          <h2>Total: £{calculateTotal().toFixed(2)}</h2>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
