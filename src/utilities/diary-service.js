import sendRequest from "./send-request"; // Import sendRequest function

export async function createDiaryEntry(diaryEntryData) {
  try {
    const response = await sendRequest("/api/diary", "POST", diaryEntryData);
    return response;
  } catch (error) {
    throw error;
  }
}
