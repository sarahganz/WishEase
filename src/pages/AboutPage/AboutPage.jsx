// AboutPage.jsx
import React from "react";
import "./AboutPage.css"; // Import the stylesheet
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About WishEase</h1>
      <p>
        Welcome to Wishease, your personalized travel diary app designed to turn
        your wanderlust dreams into cherished memories. Capture every incredible
        moment of your adventures and relive them at any time.
        <br />
        Upload photos and write detailed notes to document your journeys.
        Whether you're a globetrotter, occasional traveler, or adventure seeker,
        Wishease offers a visually appealing and organized platform to
        commemorate your travels.
        <br />
        From vibrant city streets to serene landscapes, Wishease helps you
        encapsulate the moments that matter most. Join us on a journey to
        transform your travel dreams into lasting memories, one wish at a time.
      </p>
      <h2>About the Creator</h2>
      <p>
        Hi there! I'm Sarah Ganz, the mind behind Wishease. With a background in
        Full Stack Development and a passion for crafting innovative software
        solutions, I've created Wishease to help you transform your dreams into
        reality. Leveraging my strong foundation in computer science and
        software engineering, I bring adaptability and problem-solving acumen to
        my projects. Known for my quick learning and technological prowess, I'm
        committed to delivering high-quality solutions that make a positive
        impact. When I'm not coding, you can find me exploring new travel
        destinations and creating lasting memories!
      </p>

      <div className="creator-info">
        <div className="contact-info">
          <p>
            Email:{" "}
            <a href="mailto:sarahganzdev@gmail.com">sarahganzdev@gmail.com</a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/sarahganz"
              target="_blank"
              rel="noopener noreferrer"
            >
              /sarahganz
            </a>
          </p>
          <p>
            Github:{" "}
            <a
              href="https://github.com/sarahganz"
              target="_blank"
              rel="noopener noreferrer"
            >
              /sarahganz
            </a>
          </p>
        </div>
        <img
          src="/profile-image.png"
          alt="Sarah Ganz"
          className="profile-image"
        />
      </div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default AboutPage;
