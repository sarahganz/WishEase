import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";

export default function AchievedWishDetailsPage() {
  const { id } = useParams();
  const [achievedWish, setAchievedWish] = useState(null);

  useEffect(() => {
    console.log("Fetching achieved wish details...");
    fetchAchievedWishDetails();
  }, [id]);

  const fetchAchievedWishDetails = async () => {
    try {
      const response = await usersAPI.getAchievedWishDetails(id);
      console.log("Fetched achieved wish details response:", response);
      setAchievedWish(response);

      // Check if the response contains the country and state properties
      if (response && response.country && response.state) {
        console.log("Country:", response.country);
        console.log("State:", response.state);
      } else {
        console.log("Country and/or state not found in response.");
      }
    } catch (error) {
      console.error("Error fetching achieved wish details:", error);
    }
  };

  if (!achievedWish) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Achieved Wish Details</h2>
      <p>Country: {achievedWish.country}</p>
      <p>State: {achievedWish.state}</p>
    </div>
  );
}
