import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import BurgerIcon from "../BurgerIcon/BurgerIcon";

function Header({ setCartOpen, isCartOpen, cart }) {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });

  const handleCartOpen = () => {
    setCartOpen(!isCartOpen);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    );
  };

  console.log(isOpen);

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
        <div className={`page-links ${isOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            HOME
          </NavLink>
          <NavLink to="/Menu" onClick={() => setIsOpen(false)}>
            MENU
          </NavLink>
          <NavLink to="/About" onClick={() => setIsOpen(false)}>
            ABOUT
          </NavLink>
        </div>
        <div className="burger-icon">
          <BurgerIcon setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className="options">
          <NavLink to={user !== null ? "/Account" : "/Login"}>
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
