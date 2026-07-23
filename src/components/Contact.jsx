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

  const showSuccess = (isDuplicate) => {
    MySwal.fire({
      icon: isDuplicate ? "info" : "success",
      title: isDuplicate ? "Already Submitted" : "Message Received!",
      text: isDuplicate
        ? "Your message has already been submitted. Thank you!"
        : "Thanks for reaching out! I'll respond within 24 hours.",
      confirmButtonColor: "#3B82F6",
      customClass: {
        popup: "rounded-2xl border border-gray-200",
        confirmButton: "px-6 py-2 rounded-lg font-semibold",
      },
    });
  };

  const showError = (message) => {
    MySwal.fire({
      title: "Something Went Wrong",
      text: message,
      icon: "error",
      confirmButtonColor: "#EF4444",
      customClass: {
        popup: "rounded-2xl border border-gray-200",
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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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
      });
      return;
    }

    setIsSubmitting(true);

    // Custom loading popup with progress bar
    const loadingAlert = MySwal.fire({
      title: "Sending your message",
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <!-- Animated paper plane -->
          <div style="width: 60px; height: 60px; position: relative;">
            <svg style="animation: floatPlane 1.2s ease-in-out infinite;" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
            <style>
              @keyframes floatPlane {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-6px) rotate(3deg); }
              }
            </style>
          </div>
          <!-- Progress bar -->
          <div style="width: 80%; height: 8px; background-color: #e5e7eb; border-radius: 999px; overflow: hidden;">
            <div id="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #2563eb, #60a5fa); border-radius: 999px; transition: width 0.3s ease;"></div>
          </div>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Please wait while we deliver your message...</p>
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        // Animate progress bar
        const progressBar = document.getElementById("progress-bar");
        let width = 0;
        const interval = setInterval(() => {
          if (width >= 90) {
            clearInterval(interval);
          } else {
            width += Math.random() * 15 + 5;
            if (width > 90) width = 90;
            progressBar.style.width = width + "%";
          }
        }, 400);
        progressBar._interval = interval;
      },
    });

    try {
      const submissionData = { ...formData };
      const response = await submitContactForm(submissionData);

      // Complete progress to 100%
      const progressBar = document.getElementById("progress-bar");
      if (progressBar) {
        clearInterval(progressBar._interval);
        progressBar.style.width = "100%";
      }
      await new Promise((resolve) => setTimeout(resolve, 300)); // let the user see 100%
      await loadingAlert.close();

      if (response.success) {
        const isDuplicate = response.message?.toLowerCase().includes("already");
        showSuccess(isDuplicate);

        setFormData({
          name: "",
          email: "",
          contact: "",
          subject: "General Inquiry",
          message: "",
        });
        setErrors({});
      } else {
        showError(response.message || "Unable to send message. Please try again.");
      }
    } catch (error) {
      await loadingAlert.close();
      console.error("Submission error:", error);

      let errorMessage = "Connection error. Please check your internet and try again.";
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Cannot reach the server. Please ensure the backend is running.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-blue-500">Touch</span>
        </h2>
        <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12 text-lg">
          Have a project in mind or want to chat? Feel free to reach out!
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                <div className="text-blue-500 text-xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                <div className="text-blue-500 text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href="mailto:abishek.sathiyan.2002@gmail.com"
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 break-words"
                  >
                    abishek.sathiyan.2002@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="text-blue-500 text-xl flex-shrink-0">
                    <FaPhone />
                  </div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                </div>
                <div className="space-y-2 pl-10">
                  {/* UAE */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 font-medium">+971 52 290 4847</span>
                      <span className="ml-2 text-xs text-gray-500">(UAE)</span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="tel:+971522904847"
                        className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-blue-50"
                        title="Call UAE"
                      >
                        <FaPhone className="text-sm" />
                      </a>
                      <a
                        href="https://wa.me/971522904847"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-green-50"
                        title="WhatsApp UAE"
                      >
                        <FaWhatsapp className="text-sm" />
                      </a>
                    </div>
                  </div>
                  {/* India */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 font-medium">+91 70920 85864</span>
                      <span className="ml-2 text-xs text-gray-500">(India)</span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="tel:+917092085864"
                        className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-blue-50"
                        title="Call India"
                      >
                        <FaPhone className="text-sm" />
                      </a>
                      <a
                        href="https://wa.me/917092085864"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-green-50"
                        title="WhatsApp India"
                      >
                        <FaWhatsapp className="text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4 text-center lg:text-left">
                Connect with me
              </h4>
              <div className="flex space-x-6 justify-center lg:justify-start">
                <a
                  href="https://github.com/AbishekSathiyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://linkedin.com/in/abishek04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#0077b5] transition-all duration-200 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href="https://www.instagram.com/abishek_sathiyan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#e2183d] transition-all duration-200 transform hover:scale-110"
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
                  <label htmlFor="name" className="block mb-2 text-gray-700 font-medium">Your Name</label>
                  <input
                    type="text" id="name" name="name" value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white text-gray-900 border focus:border-blue-500 focus:outline-none transition-all duration-200 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Enter your name" disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">Your Email</label>
                  <input
                    type="email" id="email" name="email" value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white text-gray-900 border focus:border-blue-500 focus:outline-none transition-all duration-200 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Enter your email" disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact" className="block mb-2 text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="tel" id="contact" name="contact" value={formData.contact}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white text-gray-900 border focus:border-blue-500 focus:outline-none transition-all duration-200 ${errors.contact ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Enter your 10-digit phone number" disabled={isSubmitting}
                  />
                  {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-gray-700 font-medium">Subject</label>
                  <select
                    id="subject" name="subject" value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-200"
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
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-700 font-medium">Your Message</label>
                <textarea
                  id="message" name="message" rows="5" value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white text-gray-900 border focus:border-blue-500 focus:outline-none transition-all duration-200 resize-vertical ${errors.message ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Tell me about your project or inquiry..." disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className={`flex items-center justify-center gap-3 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 w-full ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
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