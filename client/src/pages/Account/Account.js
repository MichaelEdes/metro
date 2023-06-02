import React, { useState, useContext } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import "./Account.css";
import { CartContext } from "../../CartContext";
import CartItem from "../../components/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Account() {
  const { cart } = useContext(CartContext);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    setUser(null); // you can now call this function
    // Clear user from localStorage
    localStorage.setItem("user", 0);
    navigate("/");
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
          <h1>John Smith</h1>
          <p>johnsmith@appleseed.com</p>
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
              <div id="complete-order-btn">COMPLETE ORDER</div>
            </div>
          </Box>
        )}
        {tabValue === 1 && (
          <Box className="cart-item-box" p={3}>
            No Previous Orders
          </Box>
        )}
      </div>
    </div>
  );
}

export default Account;
