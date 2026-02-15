// services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const submitContactForm = async (formData) => {
    try {
        // Remove any fields that shouldn't be sent to backend
        const { createdAt, updatedAt, ...submitData } = formData;
        
        const response = await fetch(`${API_BASE_URL}/contact/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData)
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle validation errors
            if (data.errors) {
                const errorMessages = data.errors.map(err => err.msg).join(', ');
                throw new Error(errorMessages);
            }
            throw new Error(data.message || 'Failed to send message');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Optional: Add function to get all contacts (for admin panel)
export const getContacts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch contacts');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};