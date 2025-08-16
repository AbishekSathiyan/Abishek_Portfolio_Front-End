import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_BASE_URL; // use env variable

const AdminAuth = ({ onSuccess }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [step, setStep] = useState("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const inputsRef = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, step]);

  const sendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/admin/send-otp`);
      if (res.data.success) {
        setMessage("✅ OTP sent to admin email!");
        setStep("otp");
        setTimeLeft(60); // reset timer
        setOtp(Array(6).fill(""));
        inputsRef.current[0].focus();
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch {
      setMessage("❌ Error sending OTP");
    }
    setLoading(false);
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);
    if (index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) inputsRef.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setMessage("⚠️ Please enter all 6 digits");
      return;
    }
    if (timeLeft <= 0) {
      setMessage("⌛ OTP expired. Please resend.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/admin/verify-otp`, {
        otp: enteredOtp,
      });
      if (res.data.success) {
        setMessage("✅ OTP verified! Redirecting...");
        setTimeout(() => onSuccess(), 1000);
      } else {
        setMessage("❌ Invalid OTP");
      }
    } catch {
      setMessage("❌ Error verifying OTP");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Portal</h2>
      {step === "email" ? (
        <button style={styles.button} onClick={sendOtp} disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <>
          <p style={styles.instruction}>
            Enter the 6-digit OTP sent to your email
          </p>
          <div style={styles.otpBox}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={styles.otpInput}
              />
            ))}
          </div>
          <p style={styles.timer}>Time left: {timeLeft}s</p>
          <button style={styles.button} onClick={verifyOtp} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
  },
  instruction: { marginBottom: "20px", fontSize: "16px", color: "#555" },
  otpBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  otpInput: {
    width: "40px",
    height: "50px",
    fontSize: "24px",
    textAlign: "center",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  timer: { marginBottom: "20px", color: "#555", fontSize: "14px" },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: { marginTop: "15px", color: "#333", fontWeight: "500" },
};

export default AdminAuth;
