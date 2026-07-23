import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "./Footer";

const BASE_URL = process.env.REACT_APP_API_URL;  // e.g. http://localhost:5000
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

// Center popup helper – bright version
const showCenterPopup = (icon, title, message = "", timer = null) => {
  const config = {
    icon: icon,
    title: title,
    text: message,
    background: "#ffffff",
    color: "#111827",
    confirmButtonColor: "#3B82F6",
    customClass: {
      popup: "rounded-2xl border border-gray-200",
      title: "text-xl font-bold",
      confirmButton: "px-6 py-2 rounded-lg font-semibold",
    },
  };
  if (timer) {
    config.timer = timer;
    config.timerProgressBar = true;
    config.showConfirmButton = false;
  }
  return Swal.fire(config);
};

// Confirmation dialog – bright version
const showConfirmation = async (title, text, icon = "warning") => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3B82F6",
    cancelButtonColor: "#EF4444",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    background: "#ffffff",
    color: "#111827",
    customClass: {
      popup: "rounded-2xl border border-gray-200",
      title: "text-xl font-bold",
      confirmButton: "px-6 py-2 rounded-lg font-semibold",
      cancelButton: "px-6 py-2 rounded-lg font-semibold",
    },
  });
  return result;
};

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/contact`);
        const contacts = response.data?.contacts || [];
        const sorted = contacts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setSubmissions(sorted);
        showCenterPopup("success", "Success!", "Submissions loaded successfully", 2000);
      } catch (err) {
        setError(err.message || "Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount((prev) => prev + 1);
  };

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await showConfirmation(
      "Are you sure?",
      "You won't be able to revert this!",
      "warning"
    );
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${BASE_URL}/api/contact/${id}`);
        if (res.data.success) {
          setSubmissions((prev) => prev.filter((c) => c._id !== id));
          if (selectedSubmission?._id === id) setSelectedSubmission(null);
          showCenterPopup("success", "Deleted!", "Message has been deleted.", 2000);
        } else {
          showCenterPopup("error", "Error!", res.data.message || "Could not delete", 3000);
        }
      } catch (err) {
        console.error(err);
        showCenterPopup("error", "Error!", "Server error while deleting", 3000);
      }
    }
  };

  const markAsRead = async (id) => {
    const result = await showConfirmation(
      "Mark as read?",
      "This message will be marked as read.",
      "question"
    );
    if (result.isConfirmed) {
      try {
        const updatedAt = new Date().toISOString();
        const res = await axios.patch(`${BASE_URL}/api/contact/${id}`, {
          isRead: true,
          updatedAt,
        });
        if (res.data.success) {
          const updated = submissions.map((sub) =>
            sub._id === id ? { ...sub, isRead: true, updatedAt } : sub
          );
          setSubmissions(updated);
          if (selectedSubmission?._id === id) {
            setSelectedSubmission({ ...selectedSubmission, isRead: true, updatedAt });
          }
          showCenterPopup("success", "Marked as read", "Message has been marked as read", 1500);
        } else {
          showCenterPopup("error", "Error!", res.data.message || "Could not mark as read", 3000);
        }
      } catch (err) {
        console.error(err);
        showCenterPopup("error", "Error!", "Server error while updating", 3000);
      }
    }
  };

  // Loading state – bright version
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 overflow-hidden relative flex flex-col">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-300 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-purple-300 opacity-20 blur-xl"></div>
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center p-8 relative z-10">
            <style>{`
              .envelope {
                position: relative;
                width: 200px;
                height: 150px;
                margin: 0 auto 30px;
                animation: slideIn 1s ease-out;
              }
              .envelope-front {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #3B82F6;
                clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
                animation: bounce 2s infinite;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
              }
              .envelope-flap {
                position: absolute;
                width: 100%;
                height: 50%;
                background: #2563EB;
                clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
                animation: flapOpen 2s infinite;
                transform-origin: top;
              }
              .letter {
                position: absolute;
                width: 80%;
                height: 60%;
                background: white;
                left: 10%;
                top: 10%;
                border-radius: 5px;
                animation: letterSlide 2s infinite;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              @keyframes flapOpen {
                0%, 100% { transform: rotateX(0deg); }
                50% { transform: rotateX(30deg); }
              }
              @keyframes letterSlide {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }
              @keyframes slideIn {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .loading-text {
                overflow: hidden;
                border-right: 3px solid #3B82F6;
                white-space: nowrap;
                margin: 0 auto;
                letter-spacing: 0.15em;
                animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
                color: #111827;
              }
              @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
              }
              @keyframes blink-caret {
                from, to { border-color: transparent; }
                50% { border-color: #3B82F6; }
              }
            `}</style>
            <div className="envelope">
              <div className="envelope-front">
                <div className="envelope-flap"></div>
                <div className="letter">
                  <span className="animate-bounce text-4xl">✉️</span>
                </div>
              </div>
            </div>
            <div className="loading-text text-2xl font-bold mb-2 mx-auto">
              Loading Your Messages...
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  style={{ animation: `bounce 1s ${i * 0.2}s infinite` }}
                ></div>
              ))}
            </div>
            <p className="text-gray-600 mt-6 text-lg">
              Please wait while we fetch your messages
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state – bright version
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 overflow-hidden relative flex flex-col">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-red-300 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-orange-300 opacity-20 blur-xl"></div>
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center p-8 max-w-md mx-auto relative z-10">
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
              }
              @keyframes orbit {
                from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
                to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
              }
              @keyframes pulse-glow {
                0%, 100% { filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.4)); }
                50% { filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)); }
              }
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .float-animation { animation: float 6s ease-in-out infinite; }
              .orbit-animation { animation: orbit 8s linear infinite; }
              .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
              .slide-up { animation: slideUp 0.6s ease-out forwards; opacity: 0; }
            `}</style>
            <div className="relative mb-12 h-64 flex items-center justify-center">
              <div className="absolute inset-0">
                <div className="orbit-animation absolute left-1/2 top-1/2 -ml-6 -mt-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border border-purple-200">
                    <span className="text-2xl">📡</span>
                  </div>
                </div>
                <div
                  className="orbit-animation absolute left-1/2 top-1/2 -ml-6 -mt-6"
                  style={{ animationDelay: "-4s" }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <span className="text-2xl">🌐</span>
                  </div>
                </div>
              </div>
              <div className="relative z-10">
                <div className="float-animation">
                  <div className="relative pulse-glow">
                    <div className="text-8xl mb-4 filter drop-shadow-2xl">
                      <span className="inline-block transform -rotate-12">🔌</span>
                      <span className="inline-block transform rotate-12 ml-2 opacity-50">⚡</span>
                    </div>
                    <div className="flex justify-center gap-3 mt-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-ping"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-ping"
                        style={{ animationDelay: "0.6s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-400 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div
                className="slide-up inline-block px-6 py-2 bg-red-50 rounded-full border border-red-200"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-red-600 font-medium tracking-wider">CONNECTION ERROR</span>
              </div>
              <h2
                className="slide-up text-4xl font-bold text-gray-900 mb-4"
                style={{ animationDelay: "0.3s" }}
              >
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Lost Connection
                </span>
              </h2>
              <p
                className="slide-up text-gray-600 text-lg"
                style={{ animationDelay: "0.4s" }}
              >
                Unable to reach the server
              </p>
              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={handleRetry}
                  className="slide-up group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Try Again
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main admin panel – bright theme
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 overflow-hidden relative flex flex-col">
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-300 opacity-20 blur-xl"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-purple-300 opacity-20 blur-xl"></div>

      <div className="container mx-auto px-4 py-8 relative z-10 flex-grow">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Abishek Sathiyan Portfolio Contact Form Submissions
          </h1>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search submissions..."
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Messages ({filteredSubmissions.length})
              </h2>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
              {filteredSubmissions.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredSubmissions.map((sub) => (
                    <li
                      key={sub._id}
                      className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors ${
                        !sub.isRead ? "bg-blue-50/50" : ""
                      } ${selectedSubmission?._id === sub._id ? "bg-blue-50" : ""}`}
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
                        {sub.message?.substring(0, 60)}...
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                          {sub.subject}
                        </span>
                        {!sub.isRead && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                            Unread
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-gray-400">No messages found</div>
              )}
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {selectedSubmission ? (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSubmission.subject}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      From: {selectedSubmission.name} &lt;{selectedSubmission.email}&gt;
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatDate(selectedSubmission.updatedAt || selectedSubmission.createdAt)}
                  </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <p className="whitespace-pre-line text-gray-700">{selectedSubmission.message}</p>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDelete(selectedSubmission._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors border border-red-200"
                    >
                      Delete
                    </button>
                    {!selectedSubmission.isRead && (
                      <button
                        onClick={() => markAsRead(selectedSubmission._id)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors border border-green-200"
                  >
                    Reply
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
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
                  <h3 className="mt-2 text-lg font-medium text-gray-500">No message selected</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Select a message from the list to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;