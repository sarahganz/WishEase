import React, { useState, useEffect } from "react";
import * as usersAPI from "../../utilities/users-api";
import "./WishListPage.css";

export default function WishListPage() {
  const [wishlist, setWishlist] = useState([]);
  const [newDestination, setNewDestination] = useState({
    country: "",
    city: "",
  });

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const wishlist = await usersAPI.getWishlist();
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
    try {
      if (!newDestination.country || !newDestination.city) {
        console.error("Country and city are required.");
        return;
      }

      await usersAPI.addToWishlist(newDestination);
      setNewDestination({ country: "", city: "" });
      fetchWishlist();
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  const handleDeleteDestination = async (itemId) => {
    try {
      await usersAPI.deleteFromWishlist(itemId);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  return (
    <div className="wishlist-container">
      <div className="add-destination">
        <h2>Add a Destination to Wishlist</h2>
        <input
          className="space"
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
          className="space"
          type="text"
          placeholder="City"
          value={newDestination.city}
          onChange={(e) =>
            setNewDestination((prevDestination) => ({
              ...prevDestination,
              city: e.target.value,
            }))
          }
        />
        <button className="add-button space" onClick={handleAddDestination}>
          Add
        </button>
      </div>

      <ul className="wishlist">
        <br />
        <h2>Your Wishlist</h2>
        <li className="wishlist-header">
          <span className="wishlist-header-itema">Country</span>
          <span className="wishlist-header-itemb">City</span>
        </li>
        {wishlist.map((item) => (
          <li key={item._id} className="wishlist-item">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item._id)}
              disabled={item.achieved}
              checked={item.achieved}
            />
            <span className="wishlist-details">
              <span className="country-column">{item.country}</span>
              <span className="city-column">{item.city}</span>
            </span>
            <button
              className="delete-button"
              onClick={() => handleDeleteDestination(item._id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
