import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";

export default function AchievedWishesPage() {
  const [achievedWishes, setAchievedWishes] = useState([]);

  useEffect(() => {
    fetchAchievedWishes();
  }, []);

  const fetchAchievedWishes = async () => {
    try {
      const response = await usersAPI.getAchievedWishes();
      console.log("Fetched achieved wishes response:", response);
      setAchievedWishes(response);
    } catch (error) {
      console.error("Error fetching achieved wishes:", error);
    }
  };

  return (
    <div>
      <h2>Achieved Wishes</h2>
      <ul>
        {achievedWishes.map((item) => (
          <li key={item._id}>
            <Link to={`/achieved-wishes/${item._id}`}>
              Country: {item.country}, State: {item.state}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
