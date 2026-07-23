import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaTrash,
} from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { getBotResponse } from "../data/chatbotData";
import { submitContactForm } from "../services/api";

/* ─── message formatter (unchanged) ─── */
const formatMessage = (text) => {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line
        .split(
          /(\*\*.*?\*\*|https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+\d{1,3}\s?\d{4,14}(?:\s?\d{2,14})*)/,
        )
        .map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("http://") || part.startsWith("https://")) {
            return (
              <a
                key={j}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {part}
              </a>
            );
          }
          if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
            return (
              <a
                key={j}
                href={`mailto:${part}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                {part}
              </a>
            );
          }
          if (/^\+?\d[\d\s]{5,}$/.test(part.replace(/\s/g, ""))) {
            return (
              <a
                key={j}
                href={`tel:${part.replace(/\s/g, "")}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                {part}
              </a>
            );
          }
          return part;
        })}
    </span>
  ));
};

const INITIAL_MESSAGE = {
  sender: "bot",
  text: `Hi! I'm **Abishek Sathiyan**'s virtual assistant. 👋\n\nI can tell you about his **Skills**, **Projects**, **Internship**, or share his **Contact Details**. You can also send him a direct message by clicking **Message Now**.\n\nJust use the buttons below or type your question!`,
};

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Project Proposal",
  "Freelance Work",
  "Collaboration",
  "Other",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [formMode, setFormMode] = useState(false);
  const [formStep, setFormStep] = useState("name"); // name → email → contact → subject → message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "General Inquiry",
    message: "",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ── Quick‑reply handler ──
  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    switch (reply) {
      case "Contact Details":
        addBotMessage(
          "📞 **Contact Details**\n\n" +
            "📧 **Email:** abishek.sathiyan.2002@gmail.com\n" +
            "📱 **Phone (UAE):** +971 52 290 4847  ([Call](tel:+971522904847) | [WhatsApp](https://wa.me/971522904847))\n" +
            "📱 **Phone (India):** +91 70920 85864  ([Call](tel:+917092085864) | [WhatsApp](https://wa.me/917092085864))\n" +
            "📍 **Location:** Chennai,TamilNadu,India\n\n" +
            "Feel free to reach out anytime!",
        );
        break;
      case "Message Now":
        startFormMode();
        break;
      default:
        // For Skills, Projects, Internship, etc.
        getBotReply(reply);
        break;
    }
  };

  // ── enter form mode ──
  const startFormMode = () => {
    setFormMode(true);
    setFormStep("name");
    setFormData({
      name: "",
      email: "",
      contact: "",
      subject: "General Inquiry",
      message: "",
    });
    addBotMessage("Sure! Let's get your details. What's your **full name**?");
  };

  // ── handle each step of the form ──
  const processFormStep = (userText) => {
    switch (formStep) {
      case "name":
        if (!userText.trim()) {
          addBotMessage("Please enter a valid name.");
          return;
        }
        setFormData((prev) => ({ ...prev, name: userText.trim() }));
        setFormStep("email");
        addBotMessage(
          `Thanks, ${userText.trim()}! What's your **email address**?`,
        );
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userText)) {
          addBotMessage(
            "Hmm, that doesn't look like a valid email. Please try again.",
          );
          return;
        }
        setFormData((prev) => ({ ...prev, email: userText.trim() }));
        setFormStep("contact");
        addBotMessage("Got it! What's your **phone number**? (10 digits)");
        break;

      case "contact":
        const digits = userText.replace(/\D/g, "");
        if (digits.length < 10) {
          addBotMessage("Please provide a valid 10‑digit phone number.");
          return;
        }
        setFormData((prev) => ({ ...prev, contact: digits.slice(0, 10) }));
        setFormStep("subject");
        addBotMessage("What is the **subject** of your message?");
        // Show subject options as quick replies
        setSubjectQuickReplies(true);
        break;

      case "subject":
        // If user typed a custom subject (not from buttons), accept it
        const trimmedSubject = userText.trim();
        if (!trimmedSubject) {
          addBotMessage("Please select or type a subject.");
          return;
        }
        // Check if it matches one of the predefined options; if not, use "Other"
        const matchedSubject = SUBJECT_OPTIONS.find(
          (opt) => opt.toLowerCase() === trimmedSubject.toLowerCase(),
        );
        setFormData((prev) => ({
          ...prev,
          subject: matchedSubject || trimmedSubject,
        }));
        setSubjectQuickReplies(false);
        setFormStep("message");
        addBotMessage("Almost done! What **message** would you like to send?");
        break;

      case "message":
        if (!userText.trim()) {
          addBotMessage("Message cannot be empty. Please type something.");
          return;
        }
        setFormData((prev) => ({ ...prev, message: userText.trim() }));
        // all fields collected → submit
        submitForm({ ...formData, message: userText.trim() });
        break;

      default:
        break;
    }
  };

  // ── Submit the form via API (shows real errors) ──
  const submitForm = async (data) => {
    setLoading(true);
    addBotMessage("Sending your message...");
    try {
      const res = await submitContactForm(data); // expects { success, message, errors? }

      if (res.success) {
        addBotMessage(
          "✅ Your message has been sent! **Abishek Sathiyan** will get back to you soon.",
        );
      } else {
        let errorText = res.message || "Something went wrong.";
        if (res.errors && res.errors.length > 0) {
          errorText += "\n\n" + res.errors.map((e) => "• " + e).join("\n");
        }
        addBotMessage(`❌ ${errorText}`);
      }
    } catch (error) {
      addBotMessage(
        "❌ Connection error. Please check your internet and try again.",
      );
    } finally {
      setLoading(false);
      setFormMode(false);
      setSubjectQuickReplies(false);
      setFormStep("name");
      setFormData({
        name: "",
        email: "",
        contact: "",
        subject: "General Inquiry",
        message: "",
      });
    }
  };

  // ── Helpers ──
  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const getBotReply = (userText) => {
    const reply = getBotResponse(userText);
    if (!reply) {
      addBotMessage(
        "I'm not sure about that. You can ask about **Skills**, **Projects**, **Internship**, **Contact Details**, or send a message by clicking **Message Now**.",
      );
    } else {
      addBotMessage(reply);
    }
  };

  // ── Subject quick reply flag ──
  const [subjectQuickReplies, setSubjectQuickReplies] = useState(false);

  // ── Send message (unified entry point) ──
  const sendMessage = async (messageText = input) => {
    if (!messageText.trim() || loading) return;
    setInput("");
    addUserMessage(messageText);

    if (formMode) {
      processFormStep(messageText);
    } else {
      const lower = messageText.toLowerCase().trim();
      if (lower === "contact details" || lower === "contact") {
        handleQuickReply("Contact Details");
      } else if (
        lower === "message now" ||
        lower === "message" ||
        lower === "send message"
      ) {
        handleQuickReply("Message Now");
      } else {
        getBotReply(messageText);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setFormMode(false);
    setSubjectQuickReplies(false);
    setFormStep("name");
    setFormData({
      name: "",
      email: "",
      contact: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  // ── Quick reply buttons for main menu ──
  const quickReplies = [
    "Skills",
    "Projects",
    "Internship",
    "Contact Details",
    "Message Now",
  ];

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
              <FaRobot size={20} />
              <div className="flex-1">
                <h4 className="font-semibold">Abishek Sathiyan's Assistant</h4>
                <p className="text-xs opacity-90">
                  Ask me anything or send a message
                </p>
              </div>
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200 mr-2"
                title="Clear chat"
              >
                <FaTrash size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <FaRobot className="text-blue-600 text-sm" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-lg"
                        : "bg-white text-gray-800 rounded-bl-lg border border-gray-200"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">
                      {msg.sender === "bot"
                        ? formatMessage(msg.text)
                        : msg.text}
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                      <FaUser className="text-gray-500 text-sm" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-lg">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies – hidden when formMode is active (except subject step) */}
            {(!formMode || subjectQuickReplies) && (
              <div className="flex flex-wrap gap-2 px-4 py-2 bg-white border-t border-gray-200">
                {(subjectQuickReplies ? SUBJECT_OPTIONS : quickReplies).map(
                  (reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (subjectQuickReplies) {
                          // When selecting subject, treat as a quick reply
                          addUserMessage(reply);
                          processFormStep(reply);
                        } else {
                          handleQuickReply(reply);
                        }
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ),
                )}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    formMode
                      ? subjectQuickReplies
                        ? "Or type a custom subject..."
                        : `Enter your ${formStep}...`
                      : "Type your question..."
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  <FaPaperPlane size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
