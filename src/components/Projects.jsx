import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiStar,
  FiMonitor,
  FiCloud,
  FiMail,
  FiLock,
  FiImage,
  FiDatabase,
  FiServer,
  FiCode,
  FiGrid,
  FiUsers,
  FiShoppingCart,
  FiMessageCircle,
  FiMapPin,
  FiCalendar,
  FiSmile,
  FiKey,
  FiCreditCard,
  FiBell,
  FiFileText,
  FiCpu,
  FiZap,
  FiBox,
  FiLayers,
  FiBriefcase,
  FiX,
} from "react-icons/fi";
import Village from "../components/assets/Village.png";

// Technology logos mapping – fixed Cloudinary URL
const techLogos = {
  MongoDB:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
  "Node.js":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  Express:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
  JWT: "https://jwt.io/img/pic_logo.svg",
  React:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  "Tailwind CSS":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
  "Material UI":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg",
  Vite: "https://vitejs.dev/logo.svg",
  Firebase:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
  "Firebase Authentication":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
  OAuth: "https://oauth.net/images/oauth-logo-square.png",
  Cloudinary: "https://cloudinary.com/favicon.ico",
  "Node Mailer":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  Nodemailer:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  Multer: "https://raw.githubusercontent.com/expressjs/multer/master/logo.png",
  Razorpay: "https://razorpay.com/favicon.ico",
  API: "https://raw.githubusercontent.com/devicons/devicon/master/icons/api/api-original.svg",
  LocalStorage:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/localstorage/localstorage-original.svg",
  "Notifications API":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/notifications/notifications-original.svg",
  "ChatGPT API":
    "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  OpenAI:
    "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "OpenWeatherMap API":
    "https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png",
  "Chuck Norris API": "https://api.chucknorris.io/img/chucknorris_logogo.png",
  "Puter.JS":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
};

// Fallback icons
const techFallbackIcons = {
  MongoDB: <FiDatabase className="w-4 h-4 text-green-400" />,
  "Node.js": <FiServer className="w-4 h-4 text-green-500" />,
  Express: <FiZap className="w-4 h-4 text-gray-400" />,
  JWT: <FiLock className="w-4 h-4 text-yellow-400" />,
  React: <FiCode className="w-4 h-4 text-blue-400" />,
  "Tailwind CSS": <FiGrid className="w-4 h-4 text-cyan-400" />,
  "Material UI": <FiLayers className="w-4 h-4 text-blue-400" />,
  Vite: <FiZap className="w-4 h-4 text-purple-400" />,
  Firebase: <FiDatabase className="w-4 h-4 text-yellow-400" />,
  "Firebase Authentication": <FiKey className="w-4 h-4 text-yellow-400" />,
  OAuth: <FiKey className="w-4 h-4 text-green-400" />,
  Cloudinary: <FiImage className="w-4 h-4 text-purple-400" />,
  "Node Mailer": <FiMail className="w-4 h-4 text-red-400" />,
  Nodemailer: <FiMail className="w-4 h-4 text-red-400" />,
  Multer: <FiFileText className="w-4 h-4 text-blue-400" />,
  Razorpay: <FiCreditCard className="w-4 h-4 text-blue-400" />,
  API: <FiCode className="w-4 h-4 text-purple-400" />,
  LocalStorage: <FiDatabase className="w-4 h-4 text-gray-400" />,
  "Notifications API": <FiBell className="w-4 h-4 text-red-400" />,
  "ChatGPT API": <FiMessageCircle className="w-4 h-4 text-green-400" />,
  OpenAI: <FiCpu className="w-4 h-4 text-green-500" />,
  "OpenWeatherMap API": <FiCloud className="w-4 h-4 text-blue-300" />,
  "Chuck Norris API": <FiSmile className="w-4 h-4 text-yellow-400" />,
  "Puter.JS": <FiCpu className="w-4 h-4 text-blue-400" />,
};

// Technology badge with fallback (used inside project cards)
const TechBadge = ({ tech }) => {
  const logo = techLogos[tech];
  const fallbackIcon = techFallbackIcons[tech] || (
    <FiBox className="w-4 h-4 text-gray-400" />
  );

  const [useFallback, setUseFallback] = React.useState(!logo);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-2 py-1.5 sm:px-3 rounded-full border border-gray-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 group"
    >
      {!useFallback ? (
        <img
          src={logo}
          alt={tech}
          className="w-4 h-4 object-contain group-hover:scale-110 transition-transform"
          onError={() => setUseFallback(true)}
        />
      ) : (
        <span className="flex items-center justify-center w-4 h-4">
          {fallbackIcon}
        </span>
      )}
      <span className="text-[10px] sm:text-xs font-medium truncate max-w-[80px] sm:max-w-none">
        {tech}
      </span>
    </motion.div>
  );
};

const projects = [
  {
    id: 1,
    title: "AI Launch Kit",
    description:
      "AI Launch Kit is an AI-powered website generation platform developed for Innovation City to help newly licensed businesses establish a professional online presence as part of a complimentary digital onboarding service. Business owners simply enter their business category, company name, tagline, contact details, preferred color theme, and desired website sections. The AI then generates a modern, fully responsive company website tailored to their brand within minutes. Users can preview the generated website, download the complete HTML source code, or deploy it directly to Vercel with a single click, making website creation fast, accessible, and code-free.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "OpenAI",
    ],
    githubLink: "https://github.com/AbishekSathiyan/",
    demoLink: "https://github.com/AbishekSathiyan/",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QUl8ZW58MHx8MHx8fDA%3D",
    featured: true,
    icon: <FiBriefcase className="text-amber-400 w-4 h-4" />,
  },
  {
    id: 2,
    title: "Founder AI - Intelligent Business Assistant",
    description:
      "An AI-powered business recommendation platform that helps entrepreneurs find the perfect free zone for their business setup with intelligent insights and real-time assistance.",
    technologies: ["React", "API", "OpenAI", "Tailwind CSS"],
    githubLink: "https://github.com/AbishekSathiyan/",
    demoLink: "https://github.com/AbishekSathiyan/",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QUl8ZW58MHx8MHx8fDA%3D",
    featured: true,
    icon: <FiBriefcase className="text-amber-400 w-4 h-4" />,
  },
  {
    id: 3,
    title: "ChatBot-Aura Mind (MERN + AI)",
    description:
      "An Intelligent AI-Powered ChatBot Web Application that provides Real-Time Conversational Responses, external JavaScript API Integration.",
    technologies: ["React", "API", "Puter.JS", "Tailwind CSS"],
    githubLink: "https://github.com/AbishekSathiyan/AI_ChatBot_Assistant",
    demoLink: "https://ai-chat-bot-assistant.vercel.app/",
    image:
      "https://ai-chat-bot-assistant.vercel.app/static/media/Logo.c4f6c10bc581dd820021.png",
    featured: true,
    icon: <FiMessageCircle className="text-blue-400 w-4 h-4" />,
  },
  {
    id: 4,
    title: "AS Ecommerce (MERN)",
    description:
      "A modern full-stack eCommerce platform with Firebase Authentication, Razorpay payments, and admin dashboard.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Firebase Authentication",
      "Nodemailer",
      "Razorpay",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/AS_Ecommerce",
    demoLink: "https://github.com/AbishekSathiyan/AS_Ecommerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    icon: <FiShoppingCart className="text-green-400 w-4 h-4" />,
  },
  {
    id: 5,
    title: "Methalodai Village Community",
    description:
      "Instagram-like community platform for village communication with posts, follows, likes, and comments.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Firebase Authentication",
      "Nodemailer",
      "Cloudinary",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/Methalodai-Community",
    demoLink: "https://github.com/AbishekSathiyan/Methalodai-Community",
    image: Village,
    featured: true,
    icon: <FiUsers className="text-purple-400 w-4 h-4" />,
  },
  {
    id: 6,
    title: "Campus Lost & Found",
    description:
      "Campus MERN app for reporting and recovering lost items with image uploads and email notifications.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Firebase Authentication",
      "Nodemailer",
      "Cloudinary",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/Campus-Lost-and-Found",
    demoLink: "https://github.com/AbishekSathiyan/Campus-Lost-and-Found",
    image:
      "https://images.unsplash.com/photo-1586769852044-5e4c91c8b5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiMapPin className="text-yellow-400 w-4 h-4" />,
  },
  {
    id: 7,
    title: "Bulk Mail System",
    description:
      "Send personalized bulk emails from Excel sheets using Nodemailer with custom templates.",
    technologies: ["React", "Node.js", "Express", "Nodemailer", "Tailwind CSS"],
    githubLink: "https://github.com/AbishekSathiyan/Bulk_Mail_Front-End",
    demoLink: "https://bulk-mail-front-end.vercel.app/login",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiMail className="text-red-400 w-4 h-4" />,
  },
  {
    id: 8,
    title: "FileShare MERN App",
    description:
      "Secure file-sharing platform with JWT authentication, file preview, and unique sharing links.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "JWT",
      "Multer",
      "Cloudinary",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/FileShare-MERN-Application",
    demoLink: "https://mern-file-share.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiLock className="text-indigo-400 w-4 h-4" />,
  },
  {
    id: 9,
    title: "Portfolio (MERN)",
    description:
      "Responsive portfolio with admin-secured contact form using OTP verification for modern recruiters.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Nodemailer",
      "JWT",
      "Tailwind CSS",
    ],
    githubLink:
      "https://github.com/AbishekSathiyan/Abishek_Portfolio_Front-End",
    demoLink: "https://abisheksathiyan-portfolio-front-end.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiCode className="text-cyan-400 w-4 h-4" />,
  },
  {
    id: 10,
    title: "Weather Dashboard",
    description:
      "Sleek weather app with real-time temperature, humidity, and conditions using OpenWeatherMap API.",
    technologies: ["React", "Vite", "Tailwind CSS", "OpenWeatherMap API"],
    githubLink: "https://github.com/AbishekSathiyan/Weather_React_App",
    demoLink: "https://weather-react-app-two-theta.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiCloud className="text-blue-300 w-4 h-4" />,
  },
  {
    id: 11,
    title: "Task Manager",
    description:
      "Productivity app with notifications, reminders, dark mode, and localStorage persistence.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Material UI",
      "LocalStorage",
      "Notifications API",
    ],
    githubLink: "https://github.com/AbishekSathiyan/Task_Manager_React",
    demoLink: "https://task-manager-react-10.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiCalendar className="text-orange-400 w-4 h-4" />,
  },
  {
    id: 12,
    title: "Joke Generator",
    description:
      "A fun and interactive web app that fetches random jokes from the Chuck Norris API.",
    technologies: ["React", "Tailwind CSS", "Chuck Norris API"],
    githubLink: "https://github.com/AbishekSathiyan/joke-generator",
    demoLink: "https://joke-generator-app.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiSmile className="text-yellow-300 w-4 h-4" />,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [logoErrors, setLogoErrors] = React.useState({});

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const uniqueTechStack = [
    {
      name: "MongoDB",
      logo: techLogos["MongoDB"],
      icon: techFallbackIcons["MongoDB"],
    },
    {
      name: "Node.js",
      logo: techLogos["Node.js"],
      icon: techFallbackIcons["Node.js"],
    },
    {
      name: "Express",
      logo: techLogos["Express"],
      icon: techFallbackIcons["Express"],
    },
    { name: "JWT", logo: techLogos["JWT"], icon: techFallbackIcons["JWT"] },
    {
      name: "React",
      logo: techLogos["React"],
      icon: techFallbackIcons["React"],
    },
    {
      name: "Tailwind CSS",
      logo: techLogos["Tailwind CSS"],
      icon: techFallbackIcons["Tailwind CSS"],
    },
    {
      name: "Material UI",
      logo: techLogos["Material UI"],
      icon: techFallbackIcons["Material UI"],
    },
    { name: "Vite", logo: techLogos["Vite"], icon: techFallbackIcons["Vite"] },
    {
      name: "Firebase",
      logo: techLogos["Firebase"],
      icon: techFallbackIcons["Firebase"],
    },
    {
      name: "OAuth",
      logo: techLogos["OAuth"],
      icon: techFallbackIcons["OAuth"],
    },
    {
      name: "Cloudinary",
      logo: techLogos["Cloudinary"],
      icon: techFallbackIcons["Cloudinary"],
    },
    {
      name: "Nodemailer",
      logo: techLogos["Nodemailer"],
      icon: techFallbackIcons["Nodemailer"],
    },
    {
      name: "Multer",
      logo: techLogos["Multer"],
      icon: techFallbackIcons["Multer"],
    },
    {
      name: "Razorpay",
      logo: techLogos["Razorpay"],
      icon: techFallbackIcons["Razorpay"],
    },
  ];

  const additionalTechs = [
    "API",
    "LocalStorage",
    "OpenWeatherMap API",
    "Chuck Norris API",
    "Puter.JS",
    "OpenAI",
  ];

  return (
    <section
      id="projects"
      className="min-h-screen py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 border border-blue-200">
            <FiMonitor className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-blue-600 text-xs sm:text-sm font-medium">
              My Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-2">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto px-4">
            Full-stack applications built with modern technologies and best
            practices
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              onClick={() => openModal(project)} // Open modal on card click
              className="group relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <div className="flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] sm:text-xs font-semibold">
                    <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Project Icon */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-300 flex items-center justify-center shadow-sm">
                <div className="text-blue-500 text-sm sm:text-base">
                  {project.icon}
                </div>
              </div>

              {/* Image */}
              <div className="h-36 sm:h-44 md:h-48 overflow-hidden relative">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.technologies.map((tech, index) => (
                    <TechBadge key={`${project.id}-${index}`} tech={tech} />
                  ))}
                </div>

                {/* Action Buttons – stop propagation so they don't open modal */}
                <div
                  className="flex gap-2 sm:gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.a
                    href={project.githubLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center flex-1 gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-200 border border-gray-300 group/btn text-xs sm:text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-medium">
                      Code
                    </span>
                  </motion.a>
                  <motion.a
                    href={project.demoLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center flex-1 gap-1 sm:gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-200 border border-blue-300 group/btn text-xs sm:text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-medium">
                      Live
                    </span>
                  </motion.a>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technology Stack
          </h3>

          {/* Main tech grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto px-2">
            {uniqueTechStack.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
              >
                {!logoErrors[tech.name] ? (
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                    onError={() =>
                      setLogoErrors((prev) => ({
                        ...prev,
                        [tech.name]: true,
                      }))
                    }
                  />
                ) : (
                  <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    {tech.icon}
                  </span>
                )}
                <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 font-medium text-center">
                  {tech.name.includes(" ")
                    ? tech.name.split(" ")[0]
                    : tech.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Additional Tech Row – fixed duplication by removing TechBadge and using same pattern */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto mt-4 px-2">
            {additionalTechs.map((tech) => {
              const logo = techLogos[tech];
              const fallbackIcon = techFallbackIcons[tech] || (
                <FiBox className="w-4 h-4 text-gray-400" />
              );
              return (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
                >
                  {!logoErrors[tech] ? (
                    <img
                      src={logo}
                      alt={tech}
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      onError={() =>
                        setLogoErrors((prev) => ({ ...prev, [tech]: true }))
                      }
                    />
                  ) : (
                    <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                      {fallbackIcon}
                    </span>
                  )}
                  <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 font-medium text-center">
                    {tech.includes(" ") ? tech.split(" ")[0] : tech}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-gray-500 text-xs sm:text-sm">
            Showing {projects.length} amazing projects • More coming soon...
          </p>
        </motion.div>
      </div>

      {/* ========== Modal Overlay ========== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-auto max-h-[90vh]"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header image */}
              <div className="h-48 sm:h-64 w-full overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{selectedProject.icon}</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {selectedProject.title}
                  </h2>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    <FiGithub className="w-5 h-5" />
                    View Code
                  </a>
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    <FiExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}