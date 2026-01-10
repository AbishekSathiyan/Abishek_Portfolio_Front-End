import React, { useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaWhatsapp, // Added WhatsApp icon
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

  const showAlert = (icon, title, text, timer = 3000) => {
    MySwal.fire({
      icon,
      title,
      text,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      background: "#1f2937",
      color: "#f9fafb",
      customClass: {
        popup: "rounded-2xl border border-gray-600",
        title: "text-xl font-bold",
        timerProgressBar: "bg-primary",
      },
    });
  };

  const showSuccess = () => {
    MySwal.fire({
      title: "🎉 Message Sent!",
      text: "Thank you for your message! I'll get back to you soon.",
      icon: "success",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonText: "Awesome!",
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
      title: "😕 Oops...",
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

  const showWarning = (message) => {
    MySwal.fire({
      title: "⚠️ Notice",
      text: message,
      icon: "warning",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonText: "Understood",
      confirmButtonColor: "#F59E0B",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showAlert(
        "error",
        "Validation Error",
        "Please fix the errors in the form."
      );
      return;
    }

    // Show loading alert
    const loadingAlert = MySwal.fire({
      title: "Sending Message...",
      text: "Please wait while we send your message.",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
      background: "#1f2937",
      color: "#f9fafb",
      customClass: {
        popup: "rounded-2xl border border-gray-600",
      },
    });

    setIsSubmitting(true);

    try {
      const submission = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await submitContactForm(submission);

      // Close loading alert
      await loadingAlert.close();

      // Show success alert
      showSuccess();

      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        subject: "General Inquiry",
        message: "",
      });
      setErrors({});
    } catch (error) {
      // Close loading alert
      await loadingAlert.close();

      console.error("Submission error:", error);

      const msg = error?.message?.toLowerCase() || "";

      if (msg.includes("duplicate")) {
        showWarning("You've already submitted a similar message recently.");
      } else if (msg.includes("validation") || msg.includes("required")) {
        showError("Please check your information and try again.");
      } else if (
        msg.includes("network") ||
        msg.includes("failed to fetch") ||
        msg.includes("cors")
      ) {
        showError(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        showError(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
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
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                <div className="text-blue-500 text-xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Location</h4>
                  <p className="text-gray-300">Al Ain, Dubai</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
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

              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
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

              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
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
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

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
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

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
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 ${
                      errors.contact ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Enter your 10-digit phone number"
                  />
                  {errors.contact && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>

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
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Proposal">Project Proposal</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

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
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:border-blue-500 focus:outline-none transition-all duration-200 resize-vertical ${
                    errors.message ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

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
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    Send Message
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
