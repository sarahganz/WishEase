// AuthPage.jsx
import React, { useState } from "react";
import "./WelcomePage.css"; // Import the stylesheet
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="welcome-page">
      <h1>Welcome to Our Website!</h1>
      <p>Discover amazing destinations.</p>
      <div className="auth-buttons">
        <button
          className="auth-button"
          onClick={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? "Log In" : "Sign Up"}
        </button>
        {showSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </div>
      <Link to="/about">
        <button className="about-button">Learn More</button>
      </Link>
    </div>
  );
}
