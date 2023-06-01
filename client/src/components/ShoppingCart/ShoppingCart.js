import React, { useContext } from "react";
import "./ShoppingCart.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function ShoppingCart({ cart, setCart, setCartOpen, isCartOpen }) {
  const { isLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const changeQuantity = (index, event) => {
    const newCart = [...cart];
    newCart[index].quantity = event.target.value;
    setCart(newCart);
  };

  const deleteItem = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

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
    setCartOpen(true);
    if (isLoggedIn) {
      navigate("/Checkout");
    } else {
      navigate("/Login");
    }
  };

  return (
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
          <div className="cart-item" key={index}>
            <div>
              <img src={item.image} alt={item.title} />
            </div>
            <div>
              <h2>{item.title}</h2>
              <p>
                <strong>
                  <span>£{item.price}</span>
                </strong>{" "}
                x <strong>{item.quantity}</strong>
              </p>
            </div>
            <div id="delete-btn" onClick={() => deleteItem(index)}>
              <CancelIcon />
            </div>
          </div>
        ))}
      </div>
      <div className="checkout">
        <h2>Total: £{calculateTotal().toFixed(2)}</h2>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
