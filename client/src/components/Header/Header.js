import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
function Header() {
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
          <NavLink to="/Account">
            <PersonSharpIcon id="account-btn" />
          </NavLink>
          <ShoppingCartSharpIcon />
        </div>
      </nav>
    </div>
  );
}

export default Header;
