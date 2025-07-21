const API_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
