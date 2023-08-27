import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";
import "./WelcomePage.css"; // Import the custom CSS for additional styling

export default function WelcomePage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="page-container">
      <div className="welcome-page">
        <h1 className="welcome-message">
          Turning Dreams into Reality, One Wish at a Time.
        </h1>
        <p className="subtitle">Discover amazing destinations.</p>
        <div className="auth-buttons">
          {showSignUp ? (
            <SignUpForm setUser={setUser} />
          ) : (
            <LoginForm setUser={setUser} />
          )}
        </div>
        <div className="welcomeButtons">
          <button
            className="auth-button"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            {showSignUp ? "LOG IN" : "SIGN UP"}
          </button>
          <Link to="/about" className="learn-more-link">
            <button>LEARN MORE</button>
          </Link>
        </div>
      </div>
      <footer className="footer"> {/* Your Footer Component Here */}</footer>
    </div>
  );
}
