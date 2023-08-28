import { getToken } from "./users-service";

export default async function sendRequest(
  url,
  method = "GET",
  payload = null,
  headers = null
) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    if (!headers) {
      options.headers = { "Content-Type": "application/json" };
    }
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  // Check if the response status is within the 2xx range
  if (res.ok) {
    // If response status is 204 (No Content), return null
    if (res.status === 204) return null;
    return res.json();
  } else {
    // If response status is not in the 2xx range, throw an error with the response status text
    throw new Error(res.statusText);
  }
}
