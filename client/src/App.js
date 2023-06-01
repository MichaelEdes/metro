import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Menu from "./pages/Menu/Menu";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import { UserContext } from "./UserContext";
import { CartContext } from "./CartContext";
import Account from "./pages/Account/Account";

function App() {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isCartOpen, setCartOpen] = useState(true);

  console.log(cart);
  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Router>
          <Header
            setCartOpen={setCartOpen}
            isCartOpen={isCartOpen}
            cart={cart}
          />
          <ShoppingCart
            cart={cart}
            setCart={setCart}
            setCartOpen={setCartOpen}
            isCartOpen={isCartOpen}
          />
          <Routes>
            <Route
              path="/"
              element={<HomePage cart={cart} setCart={setCart} />}
            />
            <Route
              path="/Menu"
              element={<Menu cart={cart} setCart={setCart} />}
            />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Account" element={<Account />} />
          </Routes>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
