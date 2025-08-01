import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { submitContactForm } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.contact || !formData.message) {
      toast.error("❌ All fields are required!", {
        position: "top-right",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Add timestamp to form data before submission
      const submissionWithDate = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response = await submitContactForm(submissionWithDate);

      toast.success("✅ Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        name: "",
        email: "",
        contact: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      const msg = error.message?.toLowerCase();

      if (msg?.includes("duplicate")) {
        toast.warn("⚠️ You've already submitted this message.", {
          position: "top-right",
        });
      } else if (msg?.includes("validation") || msg?.includes("required")) {
        toast.error("❌ Please complete all fields properly.", {
          position: "top-right",
        });
      } else if (msg?.includes("network")) {
        toast.error("🌐 Network error. Check your internet connection.", {
          position: "top-right",
        });
      } else {
        toast.error(`❌ Failed to send: ${error.message}`, {
          position: "top-right",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark text-light">
      <ToastContainer />
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="max-w-2xl mx-auto text-center mb-12">
          Have a project in mind or want to chat? Feel free to reach out!
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>

            <div className="flex items-start gap-4">
              <div className="text-primary text-xl">📍</div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p>Methalodai, Ramanathapuram, TamilNadu, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-primary text-xl">✉️</div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a
                  href="mailto:abishek.sathiyan.2002@gmail.com"
                  className="text-light hover:underline"
                >
                  abishek.sathiyan.2002@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-primary text-xl">📱</div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <a
                  href="https://wa.me/917092085864"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover:underline"
                >
                  +91 7092085864
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex space-x-6">
              <a
                href="https://github.com/AbishekSathiyan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/abishek04"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0077b5]"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/entabilogist_abi/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e2183d]"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Your Name", id: "name", type: "text", required: true },
                { label: "Your Email", id: "email", type: "email", required: true },
                { label: "Contact Number", id: "contact", type: "tel", required: true },
                { label: "Subject", id: "subject", type: "text", required: true },
              ].map(({ label, id, type, required }) => (
                <div key={id}>
                  <label htmlFor={id} className="block mb-2 text-gray-300">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    required={required}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-light border border-gray-700 focus:border-primary focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block mb-2 text-gray-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-light border border-gray-700 focus:border-primary focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 bg-primary text-dark px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full md:w-auto ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-opacity-90"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full border-2 border-dark border-t-transparent w-5 h-5"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}