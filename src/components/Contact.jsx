import React, { useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaWhatsapp,
  FaSpinner,
} from "react-icons/fa";
import { submitContactForm } from "../services/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const showSuccess = () => {
    MySwal.fire({
      title: "✨ Message Received!",
      text: "Thanks for reaching out! I'll respond within 24 hours.",
      icon: "success",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonText: "OK",
      confirmButtonColor: "#3B82F6",
      customClass: {
        popup: "rounded-2xl border border-gray-600",
        confirmButton: "px-6 py-2 rounded-lg font-semibold",
        title: "text-2xl font-bold",
      },
    });
  };

  const showError = (message) => {
    MySwal.fire({
      title: "⚠️ Something Went Wrong",
      text: message,
      icon: "error",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonText: "Try Again",
      confirmButtonColor: "#EF4444",
      customClass: {
        popup: "rounded-2xl border border-gray-600",
        confirmButton: "px-6 py-2 rounded-lg font-semibold",
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, contact, message } = formData;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!contact.trim()) newErrors.contact = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(contact.replace(/\D/g, "")))
      newErrors.contact = "Invalid 10-digit phone number";

    if (!message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      MySwal.fire({
        icon: "error",
        title: "Validation Failed",
        text: "Please check your inputs and try again.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f9fafb",
        customClass: {
          popup: "rounded-2xl border border-gray-600",
          timerProgressBar: "bg-primary",
        },
      });
      return;
    }

    setIsSubmitting(true);

    // In the loading alert
    const loadingAlert = MySwal.fire({
      title: "Sending message",
      html: `
    <div class="flex flex-col items-center gap-6 py-4">
      <!-- Rocket with flying animation -->
      <div class="relative rocket-container">
        <style>
          .rocket-container {
            animation: float 2s ease-in-out infinite;
          }
          .rocket {
            animation: rocketShake 0.5s ease-in-out infinite;
          }
          .flame {
            animation: flameFlicker 0.2s ease-in-out infinite;
          }
          .smoke {
            animation: smokePuff 1s ease-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes rocketShake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(2deg); }
            75% { transform: rotate(-2deg); }
          }
          @keyframes flameFlicker {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          @keyframes smokePuff {
            0% { opacity: 0.8; transform: scale(0.8) translateX(0); }
            100% { opacity: 0; transform: scale(1.5) translateX(20px); }
          }
          .trail {
            position: absolute;
            width: 4px;
            height: 20px;
            background: linear-gradient(to bottom, #3B82F6, transparent);
            left: 50%;
            transform: translateX(-50%);
            animation: trailMove 0.3s linear infinite;
          }
          @keyframes trailMove {
            0% { opacity: 1; height: 20px; }
            100% { opacity: 0; height: 40px; }
          }
        </style>
        
        <!-- Rocket -->
        <div class="relative">
          <svg class="w-20 h-20 text-blue-500 rocket" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
          
          <!-- Flame -->
          <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flame">
            <svg class="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 15.981 15.981 0 003 18.333c2.366-1.068 4.873-1.068 7.239 0a1 1 0 00.944.001 15.972 15.972 0 016.496-4.668A1 1 0 0017 12.72v-2.773a3 3 0 00-1.185-2.372 4.952 4.952 0 00-.707-.424c-.35-.182-.715-.336-1.084-.456-.713-.23-1.462-.393-2.218-.48-.222-.026-.444-.044-.666-.052a4.96 4.96 0 00-.746.059z" clipRule="evenodd" />
            </svg>
          </div>
          
          <!-- Smoke trail -->
          <div class="absolute -right-8 top-1/2 transform -translate-y-1/2">
            <div class="smoke w-2 h-2 bg-gray-400 rounded-full opacity-0"></div>
          </div>
          
          <!-- Trail lines -->
          <div class="trail" style="top: 100%; animation-delay: 0s;"></div>
          <div class="trail" style="top: 100%; animation-delay: 0.1s;"></div>
          <div class="trail" style="top: 100%; animation-delay: 0.2s;"></div>
        </div>
      </div>
      
      <!-- Flying path animation -->
      <div class="relative w-48 h-1 bg-gray-700 rounded-full overflow-hidden mt-4">
        <div class="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style="width: 30%; animation: flyPath 1.5s ease-in-out infinite;"></div>
        <style>
          @keyframes flyPath {
            0% { left: -30%; width: 30%; }
            50% { width: 60%; }
            100% { left: 100%; width: 30%; }
          }
        </style>
      </div>
      
      <p class="text-gray-300 text-lg mt-2 animate-pulse">Flying to Abishek's Inbox!</p>
      
      <!-- Stars background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <style>
          .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: twinkle 1.5s ease-in-out infinite;
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        </style>
        <div class="star w-1 h-1" style="top: 10%; left: 20%; animation-delay: 0s;"></div>
        <div class="star w-1.5 h-1.5" style="top: 30%; left: 80%; animation-delay: 0.3s;"></div>
        <div class="star w-1 h-1" style="top: 70%; left: 40%; animation-delay: 0.6s;"></div>
        <div class="star w-2 h-2" style="top: 50%; left: 90%; animation-delay: 0.9s;"></div>
        <div class="star w-1 h-1" style="top: 85%; left: 15%; animation-delay: 1.2s;"></div>
      </div>
    </div>
  `,
      allowOutsideClick: false,
      showConfirmButton: false,
      background: "#1f2937",
      color: "#f9fafb",
      customClass: {
        popup: "rounded-2xl border border-gray-600 relative overflow-hidden",
      },
    });

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await submitContactForm(submissionData);

      await loadingAlert.close();

      if (response.success) {
        showSuccess();

        setFormData({
          name: "",
          email: "",
          contact: "",
          subject: "General Inquiry",
          message: "",
        });
        setErrors({});
      } else {
        showError(
          response.message || "Unable to send message. Please try again.",
        );
      }
    } catch (error) {
      await loadingAlert.close();
      console.error("Submission error:", error);

      let errorMessage =
        "Connection error. Please check your internet and try again.";

      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "Cannot reach the server. Please ensure the backend is running.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-blue-500">Touch</span>
        </h2>
        <p className="max-w-2xl mx-auto text-center text-gray-300 mb-12 text-lg">
          Have a project in mind or want to chat? Feel free to reach out!
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all duration-300">
                <div className="text-blue-500 text-xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Location</h4>
                  <p className="text-gray-300">Al Ain, Dubai</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all duration-300">
                <div className="text-blue-500 text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <a
                    href="mailto:abishek.sathiyan.2002@gmail.com"
                    className="text-gray-300 hover:text-blue-400 transition-all duration-200 break-words"
                  >
                    abishek.sathiyan.2002@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all duration-300">
                <div className="text-blue-500 text-xl flex-shrink-0">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <a
                    href="tel:+971556053387"
                    className="text-gray-300 hover:text-blue-400 transition-all duration-200"
                  >
                    +971 556053387
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all duration-300">
                <div className="text-blue-500 text-xl flex-shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">WhatsApp</h4>
                  <a
                    href="https://wa.me/917092085864"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-all duration-200"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8">
              <h4 className="font-semibold text-white mb-4 text-center lg:text-left">
                Connect with me
              </h4>
              <div className="flex space-x-6 justify-center lg:justify-start">
                <a
                  href="https://github.com/AbishekSathiyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://linkedin.com/in/abishek04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0077b5] transition-all duration-200 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href="https://www.instagram.com/entabilogist_abi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#e2183d] transition-all duration-200 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-gray-300 font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-gray-300 font-medium"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-gray-300 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                      errors.contact ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Enter your 10-digit phone number"
                    disabled={isSubmitting}
                  />
                  {errors.contact && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-gray-300 font-medium"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Proposal">Project Proposal</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-gray-300 font-medium"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 resize-vertical ${
                    errors.message ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-3 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 w-full ${
                  isSubmitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-blue-600 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
