import { getToken } from "./users-service";

export default async function sendRequest(
  url,
  method = "GET",
  payload = null,
  headers = null
) {
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
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);

  if (res.ok) {
    if (res.status === 204) return null;
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}
