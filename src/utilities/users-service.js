// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from "./users-api";
import sendRequest from "./send-request";
import axios from "axios";
const BASE_URL = "/api/users";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export async function login(credentials) {
  // Delegate the AJAX request to the users-api.js
  // module.
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function checkToken() {
  // Just so that you don't forget how to use .then
  return (
    usersAPI
      .checkToken()
      // checkToken returns a string, but let's
      // make it a Date object for more flexibility
      .then((dateStr) => new Date(dateStr))
  );
}

export async function markAsAchieved(itemId) {
  try {
    const response = await usersAPI.markAsAchieved(itemId);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getWishlist() {
  try {
    const response = await usersAPI.getWishlist();
    return response.wishlist;
  } catch (error) {
    throw error;
  }
}

export async function addToWishlist(newDestination) {
  try {
    const response = await usersAPI.addToWishlist(newDestination);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAchievedWishes() {
  try {
    const response = await usersAPI.getAchievedWishes();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchAchievedWishDetails(id) {
  try {
    const response = await usersAPI.getAchievedWishDetails(id);
    if (response && response.country && response.city) {
      return response;
    } else {
      console.log("Country and/or city not found in response.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching achieved wish details:", error);
    throw error;
  }
}

export async function fetchDiaryEntries(destinationId) {
  const response = await sendRequest(
    `/api/diary?destination=${destinationId}`,
    "GET"
  );
  return response;
}

export async function deleteFromWishlist(itemId) {
  try {
    const response = await axios.delete(`${BASE_URL}/wishlist/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
