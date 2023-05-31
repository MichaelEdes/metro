import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Header from "./components/Header/Header";

function App() {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={<HomePage cart={cart} setCart={setCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
