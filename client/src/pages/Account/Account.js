import React, { useState, useContext, useEffect } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import axios from "axios";
import "./Account.css";
import { CartContext } from "../../CartContext";
import CartItem from "../../components/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import OrderTable from "../../components/OrderTable/OrderTable";

function Account() {
  const { cart, setCart } = useContext(CartContext);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", 0);
    navigate("/");
    window.location.reload();
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
    const orderData = {
      user_id: user.id,
      order_date: new Date().toISOString(),
      total: calculateTotal(),
      items: cart.map((item) => {
        if (item.id) {
          return {
            item_id: item.id,
            quantity: item.quantity,
          };
        } else {
          return {
            item_id: 1,
            quantity: item.quantity,
          };
        }
      }),
    };

    axios
      .post("http://localhost:8800/orders", orderData)
      .then((response) => {
        alert("Thank you for your order!");
        setCart([]);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  return (
    <div className="account-page-container">
      <div className="account-details">
        <div className="account-img-container">
          <img
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
            alt="User"
          />
        </div>
        <div>
          {user && <h1 id="username">{user.name}</h1>}
          <p id="email">johnsmith@appleseed.com</p>
        </div>
      </div>
      <div className="account-list-options">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          allowScrollButtonsMobile
          className="tab-options"
        >
          <Tab label="Current Cart" />
          <Tab label="Previous Orders" />
          <Tab id="logout" label="Logout" onClick={handleLogout} />
        </Tabs>
        {tabValue === 0 && (
          <Box className="cart-item-box" p={3}>
            <div className="items-container">
              {cart.map((item, index) => (
                <div key={index} className="cart-items-box-list">
                  <CartItem key={index} index={index} {...item} />
                </div>
              ))}
            </div>
            <div className="complete-order">
              <div className="order-summary">
                <div>{calculateTotalQuantity()} Items</div>
                <div>£{calculateTotal().toFixed(2)}</div>
              </div>
              <div id="complete-order-btn" onClick={handleCheckout}>
                COMPLETE ORDER
              </div>
            </div>
          </Box>
        )}
        {tabValue === 1 && (
          <Box className="cart-item-box" p={3}>
            {user && <OrderTable />}
          </Box>
        )}
      </div>
    </div>
  );
}

export default Account;
