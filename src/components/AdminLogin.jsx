import React, { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL; // your admin email

function AdminLogin() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/admin/send-otp`, {
        email: ADMIN_EMAIL,
      });
      setOtpSent(true);
      setMessage(res.data.message || "OTP sent successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move focus
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) return alert("Enter 6-digit OTP");

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/admin/verify-otp`, {
        email: ADMIN_EMAIL,
        otp: fullOtp,
      });
      setMessage(res.data.message || "OTP Verified Successfully!");

      if (res.data.success) {
        // ✅ Save session locally for ProtectedRoute
        localStorage.setItem("adminVerified", "true");
        window.location.href = "/admin";
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin Login (OTP Verification)
        </h1>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <>
            <p className="text-center text-sm mb-3">{message}</p>
            <div className="flex justify-between mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-10 h-12 text-center text-black rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {message && (
          <p className="text-center mt-3 text-sm text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
