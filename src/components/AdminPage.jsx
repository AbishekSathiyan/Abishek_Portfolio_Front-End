import React, { useState, useEffect } from "react"; // ✅ Correct
import axios from "axios";

// ✅ Pick BASE_URL from environment variable
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

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

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contacts`);
        // Sort by date (newest first)
        const sortedSubmissions = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setSubmissions(sortedSubmissions);
      } catch (err) {
        setError(err.message || "Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/contacts/${id}`);
      setSubmissions(submissions.filter((sub) => sub._id !== id));
      if (selectedSubmission?._id === id) {
        setSelectedSubmission(null);
      }
    } catch (err) {
      setError(err.message || "Failed to delete submission");
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/contacts/${id}`, {
        isRead: true,
        updatedAt: new Date().toISOString(),
      });

      setSubmissions(
        submissions.map((sub) =>
          sub._id === id
            ? { ...sub, isRead: true, updatedAt: new Date().toISOString() }
            : sub
        )
      );

      if (selectedSubmission?._id === id) {
        setSelectedSubmission({
          ...selectedSubmission,
          isRead: true,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      setError(err.message || "Failed to mark as read");
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
                {filteredSubmissions.map((submission) => (
                  <li
                    key={submission._id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !submission.isRead ? "bg-blue-50" : ""
                    } ${
                      selectedSubmission?._id === submission._id
                        ? "bg-gray-100"
                        : ""
                    }`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {submission.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {submission.email}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDate(
                          submission.updatedAt || submission.createdAt
                        )}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 truncate">
                      {submission.message.substring(0, 60)}...
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {submission.subject}
                      </span>
                      {!submission.isRead && (
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
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedSubmission.subject}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        From: {selectedSubmission.name} &lt;
                        {selectedSubmission.email}&gt;
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(
                        selectedSubmission.updatedAt ||
                          selectedSubmission.createdAt
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">
                      {selectedSubmission.message}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
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
