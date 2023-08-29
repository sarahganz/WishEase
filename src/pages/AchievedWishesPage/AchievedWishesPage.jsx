import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";
import "./AchievedWishesPage.css";

export default function AchievedWishesPage() {
  const [achievedWishes, setAchievedWishes] = useState([]);

  useEffect(() => {
    fetchAchievedWishes();
  }, []);

  const fetchAchievedWishes = async () => {
    try {
      const response = await usersAPI.getAchievedWishes();
      setAchievedWishes(response);
    } catch (error) {
      console.error("Error fetching achieved wishes:", error);
    }
  };

  return (
    <div className="achieved-wishes-container">
      <h2>Your Achieved Wishes</h2>
      <h2 className="achieved-wishes-header">
        <span className="achieved-wishes-header-item country-column">
          Country
        </span>
        <span className="achieved-wishes-header-item city-column">City</span>
      </h2>
      <ul>
        {achievedWishes.map((item) => (
          <li key={item._id} className="achieved-wishes-item">
            <span className="country-column">{item.country}</span>
            <span className="city-column">{item.city}</span>
            <Link to={`/achieved-wishes/${item._id}`} className="link-button">
              <button>View Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
