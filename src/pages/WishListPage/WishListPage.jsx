// WishListPage.jsx
import React, { useState, useEffect } from "react";
// import { getUser } from "../../utilities/users-service";
import * as usersAPI from "../../utilities/users-api";

export default function WishListPage() {
  //   const user = getUser();
  const [wishlist, setWishlist] = useState([]);
  const [newDestination, setNewDestination] = useState({
    country: "",
    state: "",
  });

  useEffect(() => {
    console.log("Fetching wishlist data...");
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const wishlistData = await usersAPI.getWishlist();
      console.log("Fetched wishlist data:", wishlistData); // Log the fetched data
      console.log("First item country:", wishlistData[0].country);
      console.log("First item state:", wishlistData[0].state);
      setWishlist(wishlistData); // Set wishlist state to the fetched array
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
    console.log("Country:", newDestination.country);
    console.log("State:", newDestination.state);
    try {
      if (!newDestination.country || !newDestination.state) {
        console.error("Country and state are required.");
        return;
      }

      await usersAPI.addToWishlist(newDestination);
      setNewDestination({ country: "", state: "" }); // Clear the inputs
      fetchWishlist(); // Refresh the wishlist
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <div>
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
            {/* Display country and state */}
          </li>
        ))}
      </ul>

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

      <h2>Achieved Wishes</h2>
      <ul>
        {wishlist
          .filter((item) => item.achieved)
          .map((item) => (
            <li key={item._id}>
              Country: {item.country}, State: {item.state}
            </li>
          ))}
      </ul>
    </div>
  );
}
