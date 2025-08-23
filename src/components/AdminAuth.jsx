import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Use environment variable with fallback
const API_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Factory warning sound with looping capability
const playFactoryWarningSound = (loop = false) => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Main alarm sound (low frequency)
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    oscillator1.type = "sawtooth";
    oscillator1.frequency.setValueAtTime(180, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(
      120,
      audioContext.currentTime + 0.8
    );
    gainNode1.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode1.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.1);
    gainNode1.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 3.8
    );
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);

    // High frequency alarm
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    oscillator2.type = "square";
    oscillator2.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(
      600,
      audioContext.currentTime + 0.8
    );
    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.1);
    gainNode2.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.8
    );
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);

    // Pulsing effect
    const oscillator3 = audioContext.createOscillator();
    const gainNode3 = audioContext.createGain();
    oscillator3.type = "sine";
    oscillator3.frequency.setValueAtTime(4, audioContext.currentTime); // pulsing
    gainNode3.gain.setValueAtTime(0.5, audioContext.currentTime);
    oscillator3.connect(gainNode3);

    // Modulate oscillator1 with pulsing
    gainNode3.connect(gainNode1.gain);

    oscillator1.start();
    oscillator2.start();
    oscillator3.start();

    oscillator1.stop(audioContext.currentTime + 0.8);
    oscillator2.stop(audioContext.currentTime + 0.8);
    oscillator3.stop(audioContext.currentTime + 0.8);

    // Add a second burst
    setTimeout(() => {
      const oscillator4 = audioContext.createOscillator();
      const gainNode4 = audioContext.createGain();
      oscillator4.type = "sawtooth";
      oscillator4.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator4.frequency.exponentialRampToValueAtTime(
        150,
        audioContext.currentTime + 0.6
      );
      gainNode4.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode4.gain.linearRampToValueAtTime(
        0.6,
        audioContext.currentTime + 0.1
      );
      gainNode4.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.6
      );
      oscillator4.connect(gainNode4);
      gainNode4.connect(audioContext.destination);

      const oscillator5 = audioContext.createOscillator();
      const gainNode5 = audioContext.createGain();
      oscillator5.type = "square";
      oscillator5.frequency.setValueAtTime(900, audioContext.currentTime);
      oscillator5.frequency.exponentialRampToValueAtTime(
        700,
        audioContext.currentTime + 0.6
      );
      gainNode5.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode5.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.1
      );
      gainNode5.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.6
      );
      oscillator5.connect(gainNode5);
      gainNode5.connect(audioContext.destination);

      oscillator4.start();
      oscillator5.start();
      oscillator4.stop(audioContext.currentTime + 0.6);
      oscillator5.stop(audioContext.currentTime + 0.6);

      if (loop) {
        setTimeout(() => playFactoryWarningSound(true), 1200);
      }
    }, 400);
  } catch (error) {
    console.error("Error playing warning sound:", error);
  }
};

const AdminAuth = ({ onSuccess }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [step, setStep] = useState("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isListening, setIsListening] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [isManualStop, setIsManualStop] = useState(false);
  const [securityAlertActive, setSecurityAlertActive] = useState(false);

  const inputsRef = useRef([]);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(null);
  const warningSoundIntervalRef = useRef(null);

  // Initialize speech recognition & synthesis
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.replace(/\D/g, "");
        if (transcript.length === 6) {
          const newOtp = transcript.split("");
          setOtp(newOtp);
          speakText(
            "Verification code received. Please click verify to continue."
          );
        } else {
          speakText("Please speak a 6 digit code clearly.");
        }
        setIsManualStop(false);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsManualStop(false);
        setIsListening(false);
        if (event.error === "not-allowed") {
          speakText(
            "Microphone access is not allowed. Please enable microphone permissions in your browser settings."
          );
        }
      };

      recognitionRef.current.onend = () => {
        if (!isManualStop && isListening) {
          speakText("Voice input stopped. Please type your code or try again.");
        }
        setIsListening(false);
        setIsManualStop(false);
      };
    }

    if ("speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const voices = speechSynthesisRef.current.getVoices();
        if (!voices.length) setTimeout(loadVoices, 100);
      };
      loadVoices();
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (speechSynthesisRef.current) speechSynthesisRef.current.cancel();
      if (warningSoundIntervalRef.current)
        clearInterval(warningSoundIntervalRef.current);
    };
  }, []);

  // Text-to-speech
  const speakText = (text, isWarning = false) => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = isWarning ? 0.9 : 1.0;
      speech.pitch = isWarning ? 0.8 : 1.0;
      speech.volume = isWarning ? 1.0 : 0.9;

      const voices = speechSynthesisRef.current.getVoices();
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Woman") ||
          voice.name.includes("Zira") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Karen") ||
          voice.name.includes("Tessa") ||
          voice.name.includes("Veena") ||
          voice.name.includes("Fiona")
      );

      if (femaleVoice) speech.voice = femaleVoice;
      else if (voices.length > 0) speech.voice = voices[0];

      speechSynthesisRef.current.speak(speech);
    }
  };

  // Countdown
  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === "otp" && timeLeft === 0) {
      speakText("Your verification code has expired. Please request a new one.");
    }
  }, [timeLeft, step]);

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => {
        speakText(
          "Please enter the 6 digit verification code sent to your email address. You can also use the microphone button to speak your code."
        );
      }, 1000);
    }
  }, [step]);

  // Voice input handlers
  const startListening = () => {
    if (recognitionRef.current) {
      setIsManualStop(false);
      setIsListening(true);
      recognitionRef.current.start();
      speakText("Listening for your verification code. Please speak clearly.");
    } else {
      speakText(
        "Speech recognition is not supported in your browser. Please type your code instead."
      );
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsManualStop(true);
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Security breach warning
  const speakSecurityBreach = () => {
    speakText(
      "Security breach! Unauthorized access attempt detected. Security breach!",
      true
    );
    if (securityAlertActive) setTimeout(speakSecurityBreach, 5000);
  };

  const showAccessDeniedWarning = () => {
    setShowAccessDenied(true);
    setSecurityAlertActive(true);
    playFactoryWarningSound(true);
    setTimeout(speakSecurityBreach, 1000);
  };

  const closeSecurityAlert = () => {
    setShowAccessDenied(false);
    setSecurityAlertActive(false);
    if (warningSoundIntervalRef.current) {
      clearInterval(warningSoundIntervalRef.current);
      warningSoundIntervalRef.current = null;
    }
    if (speechSynthesisRef.current) speechSynthesisRef.current.cancel();
  };

  // OTP sending
  const sendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/admin/send-otp`);
      if (res.data.success) {
        setMessage("Verification code sent to your email!");
        speakText(
          "A verification code has been sent to your registered email address. Please check your inbox."
        );
        setStep("otp");
        setTimeLeft(60);
        setOtp(Array(6).fill(""));
        inputsRef.current[0]?.focus();
      } else {
        setMessage(res.data.message);
        speakText("Unable to send verification code. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error sending verification code");
      speakText(
        "We encountered an error while sending your verification code. Please check your internet connection and try again."
      );
    }
    setLoading(false);
  };

  // OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);
    if (index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // OTP verification
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setMessage("Please enter all 6 digits");
      speakText("Please complete the 6 digit verification code.");
      return;
    }
    if (timeLeft <= 0) {
      setMessage("Verification code expired");
      speakText("Your verification code has expired. Please request a new one.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/admin/verify-otp`, {
        otp: enteredOtp,
      });
      if (res.data.success) {
        setMessage("Verification successful! Redirecting...");
        speakText(
          "Verification successful. You will now be redirected to the admin dashboard."
        );
        setTimeout(() => onSuccess(), 2000);
      } else {
        setMessage("Invalid verification code");
        showAccessDeniedWarning();
      }
    } catch (err) {
      console.error(err);
      setMessage("Error verifying code");
      speakText(
        "We encountered an error while verifying your code. Please check your connection and try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative">
      {/* Access Denied Popup - This will persist until explicitly closed */}
      {showAccessDenied && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 animate-fadeIn">
          <div className="bg-red-600 text-white rounded-xl p-8 max-w-md mx-4 shadow-2xl transform scale-105 transition-all duration-300 border-4 border-red-800">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-red-800 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-md">
                SECURITY BREACH
              </h2>
              <p className="text-2xl mb-6 font-semibold">ACCESS DENIED</p>
              <p className="text-red-100 mb-6 text-lg">
                Unauthorized access attempt detected. System security
                compromised.
              </p>
              <button
                onClick={closeSecurityAlert}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-lg"
              >
                ACKNOWLEDGE ALERT
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 md:p-8 transition-all duration-300 border border-gray-200">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Admin Portal</h2>
          <p className="text-gray-500 mt-2">Secure access for administrators</p>

          {/* Voice control buttons */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() =>
                speakText(
                  step === "email"
                    ? "Click the Send OTP button to receive a one-time verification code on your registered email address."
                    : "Enter the 6 digit verification code sent to your email address. You can use the microphone button to speak your code instead of typing."
                )
              }
              className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Repeat Instructions"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-极V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </button>

            {step === "otp" && (
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 ${
                  isListening
                    ? "bg-red-100 hover:bg-red-200 focus:ring-red-500"
                    : "bg-green-100 hover:bg-green-200 focus:ring-green-500"
                }`}
                aria-label={
                  isListening ? "Stop listening" : "Start voice input"
                }
              >
                {isListening ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-极"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {step === "email" ? (
          <div className="space-y-6">
            <p className="text-gray-600 text-center">
              Click the button below to receive a one-time verification code on
              your registered email address.
            </p>
            <button
              onClick={sendOtp}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending Verification Code...
                </div>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-600 text-center">
              Enter the 6-digit verification code sent to your email address.
            </p>

            <div className="flex justify-between space-x-2 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e极) => handleKeyDown(e, idx)}
                  className="w-10 h-12 md:w-12 md:h-14 text-center text-xl md:text-2xl font-semibold bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              ))}
            </div>

            <div className="flex items-center justify-center mb-4">
              <div
                className={`text-sm font-medium ${
                  timeLeft < 10 ? "text-red-500" : "text-gray-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Time remaining: {timeLeft}s
              </div>
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading || securityAlertActive}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                loading || securityAlertActive
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c极 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                "Verify Code"
              )}
            </button>

            <div className="text-center">
              <button
                onClick={sendOtp}
                disabled={securityAlertActive}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Resend Verification Code
              </button>
            </div>
          </div>
        )}

        {message && (
          <div
            className={`mt-6 p-3 rounded-lg text-center font-medium ${
              message.includes("sent") ||
              message.includes("verified") ||
              message.includes("successful")
                ? "bg-green-100 text-green-700"
                : message.includes("expired") ||
                  message.includes("Please enter")
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Voice input status indicator */}
        {isListening && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-lg text-center font-medium flex items-center justify-center animate-pulse">
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01极7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8极4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Listening... Speak your 6-digit code now
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAuth;