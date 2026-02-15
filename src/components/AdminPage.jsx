import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_API_URL;
console.log("✅ Using Backend:", BASE_URL);

// Helper to format dates
const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all submissions on mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contact/all`);
        const contacts = response.data?.contacts || [];

        const sorted = contacts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setSubmissions(sorted);
      } catch (err) {
        setError(err.message || "Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Filter submissions by search
  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // DELETE submission with SweetAlert2
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${BASE_URL}/contact/${id}`);
        if (res.data.success) {
          setSubmissions((prev) => prev.filter((c) => c._id !== id));
          if (selectedSubmission?._id === id) setSelectedSubmission(null);

          Swal.fire("Deleted!", res.data.message, "success");
        } else {
          Swal.fire("Error!", res.data.message || "Could not delete", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Server error while deleting", "error");
      }
    }
  };

  // MARK AS READ submission with SweetAlert2
  const markAsRead = async (id) => {
    const result = await Swal.fire({
      title: "Mark as read?",
      text: "This message will be marked as read.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as read",
    });

    if (result.isConfirmed) {
      try {
        const updatedAt = new Date().toISOString();
        const res = await axios.patch(`${BASE_URL}/contact/${id}`, {
          isRead: true,
          updatedAt,
        });

        if (res.data.success) {
          const updated = submissions.map((sub) =>
            sub._id === id ? { ...sub, isRead: true, updatedAt } : sub
          );
          setSubmissions(updated);

          if (selectedSubmission?._id === id) {
            setSelectedSubmission({
              ...selectedSubmission,
              isRead: true,
              updatedAt,
            });
          }

          Swal.fire({
            icon: "success",
            title: "Marked as read",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire("Error!", res.data.message || "Could not mark as read", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Server error while updating", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading submissions...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Contact Form Submissions
          </h1>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search submissions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Messages ({filteredSubmissions.length})
              </h2>
            </div>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              <ul className="divide-y divide-gray-200">
                {filteredSubmissions.map((sub) => (
                  <li
                    key={sub._id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !sub.isRead ? "bg-blue-50" : ""
                    } ${
                      selectedSubmission?._id === sub._id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{sub.name}</h3>
                        <p className="text-sm text-gray-500">{sub.email}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDate(sub.updatedAt || sub.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 truncate">
                      {sub.message.substring(0, 60)}...
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {sub.subject}
                      </span>
                      {!sub.isRead && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Unread
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
            {selectedSubmission ? (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedSubmission.subject}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      From: {selectedSubmission.name} &lt;{selectedSubmission.email}&gt;
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(
                      selectedSubmission.updatedAt || selectedSubmission.createdAt
                    )}
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                  <p className="whitespace-pre-line">{selectedSubmission.message}</p>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDelete(selectedSubmission._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    {!selectedSubmission.isRead && (
                      <button
                        onClick={() => markAsRead(selectedSubmission._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Reply
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No message selected
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a message from the list to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;