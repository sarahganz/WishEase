// AboutPage.jsx
import React from "react";
import "./AboutPage.css"; // Import the stylesheet
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Our App</h1>
      <p>
        Welcome to our travel diary app! This app allows you to document and
        relive your travel experiences through photos and notes. Capture the
        moments that matter most to you and share your journey with others.
      </p>
      <h2>About the Creator</h2>
      <p>
        Hi there! I'm Sarah Ganz, the creator of this app. I'm passionate about
        travel and technology, and I wanted to build a platform that makes it
        easy for people to preserve their travel memories in a beautiful and
        organized way. I hope you enjoy using this app as much as I enjoyed
        creating it!
      </p>
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>
    </div>
  );
};

export default AboutPage;
