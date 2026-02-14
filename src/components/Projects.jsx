import React from "react";
import { motion } from "framer-motion";
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
  FiFeather,
  FiBox,
  FiLayers,
} from "react-icons/fi";
import Village from "../components/assets/Village.png";

// Technology logos mapping - all working URLs
const techLogos = {
  // Databases
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",

  // Backend
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  JWT: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",

  // Frontend
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Material UI":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",

  // Authentication & Services
  Firebase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Firebase Authentication":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  OAuth:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg",

  // Cloud & Storage
  Cloudinary:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg",

  // Tools & Libraries
  "Node Mailer":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Nodemailer:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Multer:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/multer/multer-original.svg",

  // Payment
  Razorpay: "https://www.vectorlogo.zone/logos/razorpay/razorpay-icon.svg",

  // APIs & Utilities
  API: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/api/api-original.svg",
  LocalStorage:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/localstorage/localstorage-original.svg",
  "Notifications API":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notifications/notifications-original.svg",

  // Weather APIs
  "OpenWeatherMap API":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openweathermap/openweathermap-original.svg",

  // Fun APIs
  "Chuck Norris API":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chucknorris/chucknorris-original.svg",

  // Additional
  "Puter.JS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
};

// Fallback icons for all technologies (guaranteed to show)
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
  "OpenWeatherMap API": <FiCloud className="w-4 h-4 text-blue-300" />,
  "Chuck Norris API": <FiSmile className="w-4 h-4 text-yellow-400" />,
  "Puter.JS": <FiCpu className="w-4 h-4 text-blue-400" />,
};

// Technology component with logo + fallback
const TechBadge = ({ tech }) => {
  const logo = techLogos[tech];
  const fallbackIcon = techFallbackIcons[tech] || (
    <FiBox className="w-4 h-4 text-gray-400" />
  );

  const [useFallback, setUseFallback] = React.useState(!logo);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-1.5 bg-gray-700/50 text-gray-300 text-xs px-2 py-1.5 sm:px-3 rounded-full border border-gray-600/50 backdrop-blur-sm hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-200 group"
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    title: "Portfolio (MERN + OTP)",
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
    demoLink: "https://abishek-portfolio-front-end.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FiCode className="text-cyan-400 w-4 h-4" />,
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
  // ✅ ADD THIS - State for tracking logo errors
  const [logoErrors, setLogoErrors] = React.useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Technology stack for display (unique technologies only)
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

  return (
    <section
      id="projects"
      className="min-h-screen py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <FiMonitor className="text-blue-400 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-blue-400 text-xs sm:text-sm font-medium">
              My Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-2">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
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
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
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
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-600/50 flex items-center justify-center">
                <div className="text-blue-400 text-sm sm:text-base">
                  {project.icon}
                </div>
              </div>

              {/* Image Container */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies with Logos */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.technologies.map((tech, index) => (
                    <TechBadge key={`${project.id}-${index}`} tech={tech} />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <motion.a
                    href={project.githubLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center flex-1 gap-1 sm:gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-200 border border-gray-600/50 backdrop-blur-sm group/btn text-xs sm:text-sm"
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
                    className="flex items-center justify-center flex-1 gap-1 sm:gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-white py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-200 border border-blue-500/30 backdrop-blur-sm group/btn text-xs sm:text-sm"
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

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack Summary - Fully Visible with Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technology Stack
          </h3>

          {/* Mobile: 3 columns, Tablet: 4 columns, Desktop: 6 columns */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto px-2">
            {uniqueTechStack.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
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

                <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-300 font-medium text-center">
                  {tech.name.includes(" ")
                    ? tech.name.split(" ")[0]
                    : tech.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Additional Tech Row for remaining items */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto mt-3 sm:mt-4 px-2">
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
            >
              <img
                src={techLogos["API"]}
                alt="API"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.parentElement
                    .querySelector(".fallback")
                    ?.classList.remove("hidden");
                }}
              />
              <span className="hidden fallback">
                {techFallbackIcons["API"]}
              </span>
              <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-300 font-medium">
                API
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
            >
              <img
                src={techLogos["LocalStorage"]}
                alt="Storage"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.parentElement
                    .querySelector(".fallback")
                    ?.classList.remove("hidden");
                }}
              />
              <span className="hidden fallback">
                {techFallbackIcons["LocalStorage"]}
              </span>
              <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-300 font-medium">
                Storage
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
            >
              <img
                src={techLogos["OpenWeatherMap API"]}
                alt="Weather"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.parentElement
                    .querySelector(".fallback")
                    ?.classList.remove("hidden");
                }}
              />
              <span className="hidden fallback">
                {techFallbackIcons["OpenWeatherMap API"]}
              </span>
              <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-300 font-medium">
                Weather
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
            >
              <img
                src={techLogos["Chuck Norris API"]}
                alt="Chuck"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.parentElement
                    .querySelector(".fallback")
                    ?.classList.remove("hidden");
                }}
              />
              <span className="hidden fallback">
                {techFallbackIcons["Chuck Norris API"]}
              </span>
              <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-300 font-medium">
                Chuck
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
            >
              <img
                src={techLogos["Puter.JS"]}
                alt="Puter"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.parentElement
                    .querySelector(".fallback")
                    ?.classList.remove("hidden");
                }}
              />
              <span className="hidden fallback">
                {techFallbackIcons["Puter.JS"]}
              </span>
              <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-300 font-medium">
                Puter
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
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
    </section>
  );
}