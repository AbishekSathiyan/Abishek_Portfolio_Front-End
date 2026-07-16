// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaTrash } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { getBotResponse, quickReplies } from "../data/chatbotData";

// ─── helper to convert **bold**, \n, URLs, emails, and phone numbers into JSX ───
const formatMessage = (text) => {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line
        .split(
          /(\*\*.*?\*\*|https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+\d{1,3}\s?\d{4,14}(?:\s?\d{2,14})*)/
        )
        .map((part, j) => {
          // Bold
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          // URL (http / https)
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
          // Email address
          if (
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)
          ) {
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
          // Phone number (international or 10-digit)
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
  text: "Hi! I'm Abishek Sathiyan's virtual assistant. Ask me about his skills, projects, internship, or contact info.",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = (reply) => {
    setInput(reply);
    sendMessage(reply);
  };

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim() || loading) return;

    const userMsg = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const botReply = getBotResponse(messageText);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please use the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
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
  };

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
                <p className="text-xs opacity-90">Ask me anything</p>
              </div>
              {/* Clear chat button */}
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200 mr-2"
                title="Clear chat"
              >
                <FaTrash size={16} />
              </button>
              {/* Close button */}
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

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 px-4 py-2 bg-white border-t border-gray-200">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
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