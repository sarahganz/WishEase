import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAchievedWishDetails } from "../../utilities/users-service";
import CreateDiaryEntryForm from "../../components/CreateDiaryEntryForm/CreateDiaryEntryForm";

function AchievedWishDetailsPage({ user }) {
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
      {achievedWish && (
        <div>
          <p>Country: {achievedWish.country}</p>
          <p>State: {achievedWish.state}</p>
          {/* Other details */}
        </div>
      )}
      <h2>Create Diary Entry</h2>
      <CreateDiaryEntryForm user={user} destination={achievedWish} />
    </div>
  );
}

export default AchievedWishDetailsPage;
