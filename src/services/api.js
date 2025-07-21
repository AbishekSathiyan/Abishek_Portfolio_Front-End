// services/api.js
export async function submitContactForm(formData) {
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseText = await response.text(); // get full response
    console.log("🌐 Response status:", response.status);
    console.log("🌐 Response body:", responseText);

    if (!response.ok) {
      // Try to parse JSON error from backend
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData?.error || "Failed to submit form");
      } catch {
        throw new Error(responseText || "Failed to submit form");
      }
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("❌ Error in submitContactForm:", error.message);
    throw error;
  }
}
