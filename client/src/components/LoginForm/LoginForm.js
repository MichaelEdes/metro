import React, { useState, useContext } from "react";
import "./LoginForm.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

function LoginForm() {
  const [signUp, setSignUp] = useState(true);
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNameValid, setNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameValid(value !== "");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(value !== "" && validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value !== "");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (signUp) {
      return (
        isNameValid && isEmailValid && validateEmail(email) && isPasswordValid
      );
    } else {
      return isEmailValid && isPasswordValid;
    }
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8800/login", {
          email,
          password,
        });
        const { success } = response.data;
        if (success) {
          setUser(response.data.user);
          // Store the user in local storage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log("User after login:", response.data.user);
          navigate("/Account");
          window.location.reload();
        } else {
          alert("Incorrect email or password");
        }
      } catch (error) {
        console.error("Axios error:", error);
      }
    } else {
      console.error("Invalid form data");
    }
  };

  const handleRegister = async () => {
    if (validateForm() && isNameValid) {
      try {
        const response = await axios.post("http://localhost:8800/register", {
          name,
          email,
          password,
        });
        const { success } = response.data;
        if (success) {
          setUser(response.data.user);
          // Store the user in local storage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log("User after registration:", response.data.user);
          navigate("/Account");
          window.location.reload();
        } else {
          alert("Registration failed");
        }
      } catch (error) {
        if (
          (error.response && error.response.status === 409) ||
          error.response.status === 500
        ) {
          alert("Email already exists");
        } else {
          console.error("Axios error:", error);
        }
      }
    } else {
      console.error("Invalid form data");
    }
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
              className={signUp ? `form-is-active` : ""}
              onClick={() => setSignUp(true)}
            >
              Sign Up
            </h2>
            <h2
              className={signUp ? "" : `form-is-active`}
              onClick={() => setSignUp(false)}
            >
              Login
            </h2>
          </div>
          {!signUp ? (
            <section>
              <div className="placeholder" />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </section>
          ) : (
            <section>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </section>
          )}
          <button
            className="login-btn"
            disabled={
              (signUp && !(isNameValid && isEmailValid && isPasswordValid)) ||
              (!signUp && !(isEmailValid && isPasswordValid))
            }
            onClick={signUp ? handleRegister : handleLogin}
          >
            {signUp ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
