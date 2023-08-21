import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAchievedWishDetails } from "../../utilities/users-service";

const AchievedWishDetailsPage = () => {
  const { id } = useParams();
  const [achievedWish, setAchievedWish] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetchAchievedWishDetails(id);
      setAchievedWish(response);
    };

    fetchDetails();
  }, [id]);

  return (
    <div>
      <h2>Achieved Wish Details</h2>
      {/* Render the details of the achieved wish */}
      {achievedWish && (
        <div>
          <p>Country: {achievedWish.country}</p>
          <p>State: {achievedWish.state}</p>
          {/* Other details */}
        </div>
      )}
    </div>
  );
};

export default AchievedWishDetailsPage;
