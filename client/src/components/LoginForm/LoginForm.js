import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(true);

  return (
    <div className="form-container">
      <div className="form-image">
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
        <button>{signUp ? "Sign Up" : "Login"}</button>
      </div>
    </div>
  );
}

export default LoginForm;
