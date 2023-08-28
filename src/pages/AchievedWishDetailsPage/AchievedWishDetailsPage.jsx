import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as usersService from "../../utilities/users-service";
import CreateDiaryEntryForm from "../../components/CreateDiaryEntryForm/CreateDiaryEntryForm";

function AchievedWishDetailsPage({ user }) {
  const { id } = useParams();
  const [achievedWish, setAchievedWish] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    restaurants: "",
    information: "",
    photos: [],
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await usersService.fetchAchievedWishDetails(id);
      setAchievedWish(response);
    };

    const fetchDiaries = async () => {
      try {
        const diaries = await usersService.fetchDiaryEntries(id);
        setDiaryEntries(diaries);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };

    fetchDetails();
    fetchDiaries();
  }, [id]);

  const handleNewDiaryEntry = async (newEntry) => {
    try {
      const diaries = await usersService.fetchDiaryEntries(id);
      setDiaryEntries(diaries);
      setFormData({
        fromDate: "",
        toDate: "",
        restaurants: "",
        information: "",
        photos: [],
      });
    } catch (error) {
      console.error("Error fetching new diary entries:", error);
    }
  };

  const handleDeleteDiaryEntry = async (entryId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/diary/${entryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the diary entries in state by removing the deleted entry
      setDiaryEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== entryId)
      );
    } catch (error) {
      console.error("Error deleting diary entry:", error);
    }
  };

  return (
    <div>
      <h2>Achieved Wish Details</h2>
      {achievedWish && (
        <div>
          <p>Country: {achievedWish.country}</p>
          <p>City: {achievedWish.city}</p>
        </div>
      )}
      <h2>Create Diary Entry</h2>
      <CreateDiaryEntryForm
        user={user}
        destination={achievedWish}
        initialFormData={{
          fromDate: "",
          toDate: "",
          restaurants: "",
          information: "",
          photos: [],
        }}
        setFormData={setFormData}
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

            {entry.photos && (
              <div>
                {/* <h4>Photos:</h4> */}
                {entry.photos.map((photoUrl, index) => (
                  <img
                    key={index}
                    src={photoUrl}
                    alt={`Diary entry photo ${index + 1}`}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                ))}
              </div>
            )}
            <button onClick={() => handleDeleteDiaryEntry(entry._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AchievedWishDetailsPage;
