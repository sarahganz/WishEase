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
    <div className="diary-form-container">
      <h4 className="create-entry-heading">Create Diary Entry</h4>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="diary-form"
      >
        <label>From Date:</label>
        <input
          type="date"
          value={localFormData.fromDate}
          onChange={(e) =>
            setLocalFormData({ ...localFormData, fromDate: e.target.value })
          }
          className="short-input" // Add a class
        />

        <label>To Date:</label>
        <input
          type="date"
          value={localFormData.toDate}
          onChange={(e) =>
            setLocalFormData({ ...localFormData, toDate: e.target.value })
          }
          className="short-input" // Add a class
        />

        <label>Restaurants:</label>
        <textarea
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
          <div className="selected-photos">
            <p>
              {" "}
              <strong>Selected Photos:</strong>
            </p>
            <ul>
              {localFormData.photos.map((photo, index) => (
                <li key={index}>{photo.name}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="submit-button-container">
          <button type="submit" className="submit-button">
            Create Diary Entry
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDiaryEntryForm;
