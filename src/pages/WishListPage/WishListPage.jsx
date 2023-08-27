// WishListPage.jsx
import React, { useState, useEffect } from "react";
// import { getUser } from "../../utilities/users-service";
import * as usersAPI from "../../utilities/users-api";

export default function WishListPage() {
  //   const user = getUser();
  const [wishlist, setWishlist] = useState([]);
  const [achievedWishes, setAchievedWishes] = useState([]);

  const [newDestination, setNewDestination] = useState({
    country: "",
    state: "",
  });

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const wishlist = await usersAPI.getWishlist();
      console.log("Fetched wishlist:", wishlist);
      setWishlist(wishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleCheckboxChange = async (itemId) => {
    try {
      await usersAPI.markAsAchieved(itemId);
      setWishlist((prevWishlist) =>
        prevWishlist.map((item) =>
          item._id === itemId ? { ...item, achieved: true } : item
        )
      );
    } catch (error) {
      console.error("Error marking item as achieved:", error);
    }
  };

  const handleAddDestination = async () => {
    console.log("Adding destination:", newDestination);
    try {
      if (!newDestination.country || !newDestination.state) {
        console.error("Country and state are required.");
        return;
      }

      await usersAPI.addToWishlist(newDestination);
      setNewDestination({ country: "", state: "" });
      fetchWishlist();
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  const handleDeleteDestination = async (itemId) => {
    try {
      console.log("Deleting destination:", itemId);
      await usersAPI.deleteFromWishlist(itemId);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Add a Destination to Wishlist</h2>
        <input
          type="text"
          placeholder="Country"
          value={newDestination.country}
          onChange={(e) =>
            setNewDestination((prevDestination) => ({
              ...prevDestination,
              country: e.target.value,
            }))
          }
        />

        <input
          type="text"
          placeholder="State"
          value={newDestination.state}
          onChange={(e) =>
            setNewDestination((prevDestination) => ({
              ...prevDestination,
              state: e.target.value,
            }))
          }
        />
        <button onClick={handleAddDestination}>Add</button>
      </div>
      <h2>Your Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item._id}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item._id)}
              disabled={item.achieved}
              checked={item.achieved}
            />
            Country: {item.country}, State: {item.state}
            <button onClick={() => handleDeleteDestination(item._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
