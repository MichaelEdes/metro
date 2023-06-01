import React, { useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { CartContext } from "../../CartContext";
import "./CartItem.css";

function CartItem({ index, image, title, price, quantity }) {
  const { cart, setCart } = useContext(CartContext);
  const deleteItem = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  return (
    <div className="cart-item" key={index}>
      <div>
        <img src={image} alt={title} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>
          <strong>
            <span>£{price}</span>
          </strong>{" "}
          x <strong>{quantity}</strong>
        </p>
      </div>
      <div id="delete-btn" onClick={() => deleteItem(index)}>
        <CancelIcon />
      </div>
    </div>
  );
}

export default CartItem;
