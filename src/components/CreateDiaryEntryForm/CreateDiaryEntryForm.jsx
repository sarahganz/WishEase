import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { createDiaryEntry } from "../../utilities/diary-service";
import axios from "axios";
import "./CreateDiaryEntryForm.css";

function CreateDiaryEntryForm({
  user,
  destination,
  initialFormData,
  setFormData,
  onNewDiaryEntry,
}) {
  const [localFormData, setLocalFormData] = useState(initialFormData);

  const handlePhotoChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setLocalFormData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ...newPhotos],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Creating diary entry...");
    try {
      const newDiaryEntry = new FormData();

      newDiaryEntry.append("fromDate", localFormData.fromDate);
      newDiaryEntry.append("toDate", localFormData.toDate);
      newDiaryEntry.append("restaurants", localFormData.restaurants);
      newDiaryEntry.append("information", localFormData.information);

      for (let i = 0; i < localFormData.photos.length; i++) {
        newDiaryEntry.append("photos", localFormData.photos[i]);
      }

      newDiaryEntry.append("destination", destination._id);

      console.log("Creating diary entry:", Object.fromEntries(newDiaryEntry));
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/diary", newDiaryEntry, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response) {
        console.log("Diary entry created successfully!");
      }

      if (onNewDiaryEntry) {
        onNewDiaryEntry(newDiaryEntry);
      }
      resetForm();
    } catch (error) {
      console.error("Error creating diary entry:", error);
    }
  };

  const resetForm = () => {
    setLocalFormData({
      fromDate: "",
      toDate: "",
      restaurants: "",
      information: "",
      photos: [],
    });
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <label>From Date:</label>
      <input
        type="date"
        value={localFormData.fromDate}
        onChange={(e) =>
          setLocalFormData({ ...localFormData, fromDate: e.target.value })
        }
      />

      <label>To Date:</label>
      <input
        type="date"
        value={localFormData.toDate}
        onChange={(e) =>
          setLocalFormData({ ...localFormData, toDate: e.target.value })
        }
      />

      <label>Restaurants:</label>
      <input
        type="text"
        value={localFormData.restaurants}
        onChange={(e) =>
          setLocalFormData({ ...localFormData, restaurants: e.target.value })
        }
      />

      <label>Information:</label>
      <textarea
        value={localFormData.information}
        onChange={(e) =>
          setLocalFormData({ ...localFormData, information: e.target.value })
        }
      />

      <label>Photos:</label>
      <div className="file-input-container">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          id="file-input"
        />
        <label htmlFor="file-input" className="file-input-label">
          Choose Files
        </label>
      </div>
      {localFormData.photos.length > 0 && (
        <div>
          <h4>Selected Photos:</h4>
          <ul>
            {localFormData.photos.map((photo, index) => (
              <li key={index}>{photo.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit">Create Diary Entry</button>
    </form>
  );
}

export default CreateDiaryEntryForm;
