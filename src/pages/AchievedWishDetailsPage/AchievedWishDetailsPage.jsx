import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as usersService from "../../utilities/users-service";
import CreateDiaryEntryForm from "../../components/CreateDiaryEntryForm/CreateDiaryEntryForm";
import "./AchievedWishDetailsPage.css"; // Import the CSS file

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
    <div className="achieved-wish-details">
      {achievedWish && (
        <h2>
          {achievedWish.city} - {achievedWish.country}
        </h2>
      )}

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
      <br />
      <br />
      <ul className="diary-entries">
        {diaryEntries.map((entry) => (
          <li key={entry._id} className="diary-entry">
            <div className="diary-content">
              <div className="date-range">
                {entry.fromDate && (
                  <p>{new Date(entry.fromDate).toLocaleDateString()}</p>
                )}
                {entry.toDate && (
                  <p>- {new Date(entry.toDate).toLocaleDateString()}</p>
                )}
              </div>
              {entry.restaurants && <p>Restaurants: {entry.restaurants}</p>}
              {entry.information && <p>{entry.information}</p>}
              <br />
              {entry.photos && (
                <div className="diary-photos">
                  {entry.photos.map((photoUrl, index) => (
                    <img
                      key={index}
                      src={photoUrl}
                      alt={`Diary entry photo ${index + 1}`}
                      className="diary-photo"
                    />
                  ))}
                </div>
              )}
              <br />
              <button
                onClick={() => handleDeleteDiaryEntry(entry._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AchievedWishDetailsPage;
