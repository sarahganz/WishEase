import * as usersAPI from "./users-api";
import sendRequest from "./send-request";
import axios from "axios";
const BASE_URL = "/api/users";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();

  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function checkToken() {
  return usersAPI
    .checkToken()

    .then((dateStr) => new Date(dateStr));
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
