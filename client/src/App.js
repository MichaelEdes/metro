import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Menu from "./pages/Menu/Menu";

function App() {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  console.log(cart);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/Menu" element={<Menu cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
