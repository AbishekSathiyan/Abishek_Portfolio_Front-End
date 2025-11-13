// services/api.js
export async function submitContactForm(formData) {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  try {
    console.log("📤 Sending contact form data:", formData);

    const response = await fetch(`${BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("🌐 Response status:", response.status);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("✅ Form submitted successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error in submitContactForm:", error);

    // Enhanced error messages
    if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        "Network error: Unable to connect to server. Please check your internet connection."
      );
    }

    if (error.message.includes("CORS")) {
      throw new Error("CORS error: Please check backend CORS configuration.");
    }

    throw error;
  }
}
