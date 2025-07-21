// src/services/api.js
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Failed to submit form");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error in submitContactForm:", error.message);
    throw error;
  }
}
