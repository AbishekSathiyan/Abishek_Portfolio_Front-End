const API_BASE_URL = process.env.REACT_APP_API_URL; // e.g. http://localhost:5000

export const submitContactForm = async (formData) => {
  try {
    const { createdAt, updatedAt, ...submitData } = formData;
    const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors) {
        const errorMessages = data.errors.map((err) => err.msg).join(", ");
        throw new Error(errorMessages);
      }
      throw new Error(data.message || "Failed to send message");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getContacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch contacts");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
