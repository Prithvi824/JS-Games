export async function sendPostReqJson<T>(
  endpoint: string,
  data: Record<string, string | string[]>
): Promise<T> {

  try {
    // Hit the API and ask for a response
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Check if the response was ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return JSON data
    return await response.json();
  } catch (error) {
    console.error("Error in sendPostReqJson:", error);
    throw error; // Re-throw the error after logging it
  }
}