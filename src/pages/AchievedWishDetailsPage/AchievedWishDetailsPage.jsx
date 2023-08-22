import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as usersService from "../../utilities/users-service";
import CreateDiaryEntryForm from "../../components/CreateDiaryEntryForm/CreateDiaryEntryForm";

function AchievedWishDetailsPage({ user }) {
  const { id } = useParams();
  const [achievedWish, setAchievedWish] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const handleNewDiaryEntry = (newEntry) => {
    setDiaryEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await usersService.fetchAchievedWishDetails(id);
      setAchievedWish(response);
    };

    const fetchDiaries = async () => {
      const diaries = await usersService.fetchDiaryEntries(id); // Modify this function to fetch diary entries
      setDiaryEntries(diaries);
    };

    fetchDetails();
    fetchDiaries();
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
      <CreateDiaryEntryForm
        user={user}
        destination={achievedWish}
        onNewDiaryEntry={handleNewDiaryEntry}
      />
      <h2>Diary Entries</h2>
      <ul>
        {diaryEntries.map((entry) => (
          <li key={entry._id}>
            <h4>Entry</h4>
            {entry.fromDate && (
              <p>From: {new Date(entry.fromDate).toLocaleDateString()}</p>
            )}
            {entry.toDate && (
              <p>To: {new Date(entry.toDate).toLocaleDateString()}</p>
            )}
            {entry.restaurants && <p>Restaurants: {entry.restaurants}</p>}
            {entry.information && <p>Information: {entry.information}</p>}
            {/* Display other diary entry details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AchievedWishDetailsPage;
