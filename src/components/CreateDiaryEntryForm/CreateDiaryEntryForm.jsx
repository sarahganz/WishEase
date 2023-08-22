import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { createDiaryEntry } from "../../utilities/diary-service";

function CreateDiaryEntryForm({ user, destination, onNewDiaryEntry }) {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    restaurants: "",
    information: "",
    photos: [],
  });

  const handleSubmit = async () => {
    console.log("Creating diary entry...");
    try {
      const newDiaryEntry = {
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        restaurants: formData.restaurants,
        information: formData.information,
        photos: formData.photos,
        destination: destination._id, // Use the _id property of the destination
      };
      console.log("Creating diary entry:", newDiaryEntry);

      await createDiaryEntry(newDiaryEntry);
      if (onNewDiaryEntry) {
        onNewDiaryEntry(newDiaryEntry);
      }
      resetForm();
    } catch (error) {
      console.error("Error creating diary entry:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      fromDate: "",
      toDate: "",
      restaurants: "",
      information: "",
      photos: [],
    });
  };

  return (
    <form>
      <label>From Date:</label>
      <input
        type="date"
        value={formData.fromDate} // Use formData.fromDate
        onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })} // Update the state with the new value
      />

      <label>To Date:</label>
      <input
        type="date"
        value={formData.toDate} // Use formData.toDate
        onChange={(e) => setFormData({ ...formData, toDate: e.target.value })} // Update the state with the new value
      />

      <label>Restaurants:</label>
      <input
        type="text"
        value={formData.restaurants} // Use formData.restaurants
        onChange={(e) =>
          setFormData({ ...formData, restaurants: e.target.value })
        } // Update the state with the new value
      />

      <label>Information:</label>
      <textarea
        value={formData.information} // Use formData.information
        onChange={(e) =>
          setFormData({ ...formData, information: e.target.value })
        } // Update the state with the new value
      />

      {/* Add input fields for photos here */}

      <Button onClick={handleSubmit}>Create Diary Entry</Button>
    </form>
  );
}

export default CreateDiaryEntryForm;
