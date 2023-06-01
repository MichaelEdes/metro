import React, { useState } from "react";
import "./LoginForm.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Account");
  };

  return (
    <div className="login-form-container">
      <div className="form-container">
        <div className="form-image">
          <p className="back-btn">
            <KeyboardBackspaceIcon id="back-arrow" /> <a href="/">Home</a>
          </p>
          <h1 className="logo">
            <i>
              <span>M</span>etro
            </i>
          </h1>
        </div>
        <div className="form-content">
          <div className="login-form-options">
            <h2
              className={signUp && `form-is-active`}
              onClick={() => setSignUp(true)}
            >
              Sign Up
            </h2>
            <h2
              className={!signUp && `form-is-active`}
              onClick={() => setSignUp(false)}
            >
              Login
            </h2>
          </div>
          {!signUp ? (
            <section>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </section>
          ) : (
            <section>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </section>
          )}
          <button onClick={handleLogin}>{signUp ? "Sign Up" : "Login"}</button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
