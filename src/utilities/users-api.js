import sendRequest from "./send-request";
const BASE_URL = "/api/users";

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function markAsAchieved(itemId) {
  try {
    const response = await sendRequest(
      `${BASE_URL}/wishlist/${itemId}/achieved`,
      "PUT"
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getWishlist() {
  try {
    const response = await sendRequest(`${BASE_URL}/wishlist`, "GET");
    console.log("response.wishlist from users-api");
    console.log(response.wishlist);
    return response.wishlist; // Return the wishlist array from the response
  } catch (error) {
    throw error;
  }
}

export async function addToWishlist(newDestination) {
  try {
    const response = await sendRequest(
      `${BASE_URL}/wishlist`,
      "POST",
      newDestination
    );
    return response; // You might return additional data from the response
  } catch (error) {
    throw error;
  }
}
