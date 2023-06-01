import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";

function Header({ setCartOpen, isCartOpen, cart }) {
  const handleCartOpen = () => {
    setCartOpen(!isCartOpen);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    );
  };

  return (
    <div>
      <nav className="nav-bar">
        <div className="logo">
          <a href="/">
            <i>
              <span>M</span>etro
            </i>
          </a>
        </div>
        <div className="page-links">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/Menu">MENU</NavLink>
          <NavLink to="/About">ABOUT</NavLink>
        </div>
        <div className="options">
          <NavLink to="/Login">
            <PersonSharpIcon id="account-btn" />
          </NavLink>
          <div className="cart-icon">
            <ShoppingCartSharpIcon id="cart-btn" onClick={handleCartOpen} />
            {calculateTotalQuantity() > 0 && (
              <div className="cart-total">{calculateTotalQuantity()}</div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
