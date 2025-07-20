const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
console.log("🌐 API Base URL:", BACKEND_BASE_URL); // ✅ Should show the URL

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    throw error;
  }
};
