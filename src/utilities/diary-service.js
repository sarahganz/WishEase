import sendRequest from "./send-request";
import axios from "axios";

export async function createDiaryEntry(diaryEntryData) {
  const url = "/api/diary";
  const method = "POST";

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const options = {
      method,
      headers,
      body: diaryEntryData,
    };

    const response = await sendRequest(
      url,
      method,
      options.body,
      options.headers
    );
    return response;
  } catch (error) {
    console.error("Error creating diary entry:", error);
    throw error;
  }
}

export async function deleteDiaryEntry(entryId) {
  const token = localStorage.getItem("token");
  await axios.delete(`/api/diary/${entryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
