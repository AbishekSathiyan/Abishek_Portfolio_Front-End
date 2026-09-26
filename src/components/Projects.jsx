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
  FiShield,
  FiHome,
  FiFilm,
  FiCheckCircle,
} from "react-icons/fi";

/* =========================================================
   PROJECT IMAGES
   Replace these URLs with your actual project screenshots
========================================================= */

const projectImages = {
  "AI Launch Kit":
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Founder AI - Intelligent Business Assistant":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "ChatBot-Aura Mind":
    "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "AS Ecommerce":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Methalodai Village Community":
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Campus Lost & Found":
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Bulk Mail System":
    "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "FileShare MERN App":
    "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Portfolio - MERN":
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Weather Dashboard":
    "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Task Manager":
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Joke Generator":
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Encryption Tool":
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "House Price Prediction":
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Loan Approval Prediction":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Movie Recommendation System":
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop&crop=entropy&auto=format",
  "Smart Spam & Phishing Guard":
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop&crop=entropy&auto=format",
};

/* =========================================================
   TECHNOLOGY LOGOS
========================================================= */

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

  Nodemailer:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",

  Multer:
    "https://raw.githubusercontent.com/expressjs/multer/master/logo.png",

  Razorpay: "https://razorpay.com/favicon.ico",

  OpenAI:
    "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",

  "Puter.JS":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",

  Python:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",

  Flask:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg",

  ScikitLearn:
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",

  Pandas:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg",

  NumPy:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg",
};

/* =========================================================
   FALLBACK ICONS
========================================================= */

const techFallbackIcons = {
  MongoDB: <FiDatabase className="h-5 w-5 text-green-500" />,

  "Node.js": <FiServer className="h-5 w-5 text-green-600" />,

  Express: <FiZap className="h-5 w-5 text-gray-600" />,

  JWT: <FiLock className="h-5 w-5 text-yellow-500" />,

  React: <FiCode className="h-5 w-5 text-blue-500" />,

  "Tailwind CSS": <FiGrid className="h-5 w-5 text-cyan-500" />,

  "Material UI": <FiLayers className="h-5 w-5 text-blue-500" />,

  Vite: <FiZap className="h-5 w-5 text-purple-500" />,

  Firebase: <FiDatabase className="h-5 w-5 text-yellow-500" />,

  "Firebase Authentication": (
    <FiKey className="h-5 w-5 text-yellow-500" />
  ),

  OAuth: <FiKey className="h-5 w-5 text-green-500" />,

  Cloudinary: <FiImage className="h-5 w-5 text-purple-500" />,

  Nodemailer: <FiMail className="h-5 w-5 text-red-500" />,

  Multer: <FiFileText className="h-5 w-5 text-blue-500" />,

  Razorpay: <FiCreditCard className="h-5 w-5 text-blue-500" />,

  API: <FiCode className="h-5 w-5 text-purple-500" />,

  LocalStorage: <FiDatabase className="h-5 w-5 text-gray-500" />,

  "Notifications API": <FiBell className="h-5 w-5 text-red-500" />,

  "ChatGPT API": <FiMessageCircle className="h-5 w-5 text-green-500" />,

  OpenAI: <FiCpu className="h-5 w-5 text-green-600" />,

  "OpenWeatherMap API": <FiCloud className="h-5 w-5 text-blue-500" />,

  "Chuck Norris API": <FiSmile className="h-5 w-5 text-yellow-500" />,

  "Puter.JS": <FiCpu className="h-5 w-5 text-blue-500" />,

  Python: <FiCode className="h-5 w-5 text-blue-500" />,

  Flask: <FiServer className="h-5 w-5 text-gray-600" />,

  ScikitLearn: <FiCpu className="h-5 w-5 text-orange-500" />,

  Pandas: <FiDatabase className="h-5 w-5 text-blue-600" />,

  NumPy: <FiGrid className="h-5 w-5 text-blue-500" />,

  "Machine Learning": <FiCpu className="h-5 w-5 text-violet-600" />,

  "Data Science": <FiGrid className="h-5 w-5 text-indigo-500" />,

  "Recommendation System": (
    <FiStar className="h-5 w-5 text-yellow-500" />
  ),

  "Phishing Detection": (
    <FiShield className="h-5 w-5 text-red-500" />
  ),

  "House Price Prediction": (
    <FiHome className="h-5 w-5 text-blue-500" />
  ),

  "Loan Prediction": (
    <FiCheckCircle className="h-5 w-5 text-green-500" />
  ),
};

/* =========================================================
   TECH STACK CARD
========================================================= */

const TechStackCard = ({ name, logo, icon, logoErrors, setLogoErrors }) => {
  const showLogo = Boolean(logo) && !logoErrors[name];

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        group
        flex
        min-h-[95px]
        w-full
        flex-col
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-gray-200
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-300
        hover:border-blue-300
        hover:shadow-lg
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-gray-50
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        {showLogo ? (
          <img
            src={logo}
            alt={name}
            className="h-7 w-7 object-contain"
            onError={() =>
              setLogoErrors((prev) => ({
                ...prev,
                [name]: true,
              }))
            }
          />
        ) : (
          icon || <FiBox className="h-5 w-5 text-gray-400" />
        )}
      </div>

      <span
        className="
          w-full
          text-center
          text-[10px]
          font-semibold
          leading-tight
          text-gray-700
          sm:text-xs
        "
      >
        {name}
      </span>
    </motion.div>
  );
};

/* =========================================================
   PROJECT TECHNOLOGY BADGE
========================================================= */

const TechBadge = ({ tech }) => {
  const logo = techLogos[tech];
  const fallbackIcon =
    techFallbackIcons[tech] || (
      <FiBox className="h-4 w-4 text-gray-500" />
    );

  const [useFallback, setUseFallback] = useState(!logo);

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      className="
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-gray-200
        bg-gray-100
        px-2
        py-1.5
        text-gray-700
        transition-all
        duration-200
        hover:border-blue-300
        hover:bg-blue-100
        hover:text-blue-700
        sm:px-3
      "
    >
      {!useFallback ? (
        <img
          src={logo}
          alt={tech}
          className="h-4 w-4 object-contain"
          onError={() => setUseFallback(true)}
        />
      ) : (
        <span className="flex h-4 w-4 items-center justify-center">
          {fallbackIcon}
        </span>
      )}

      <span className="whitespace-nowrap text-[10px] font-medium sm:text-xs">
        {tech}
      </span>
    </motion.div>
  );
};

/* =========================================================
   MAIN PROJECT DATA
========================================================= */

const projects = [
  {
    id: 1,
    title: "AI Launch Kit",
    description:
      "An AI-powered launch platform designed to help users generate ideas, content and launch-ready resources using modern web technologies and AI integration.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "OpenAI",
    ],
    image: projectImages["AI Launch Kit"],
    github: "#",
    live: "#",
    featured: true,
    icon: <FiZap />,
  },

  {
    id: 2,
    title: "Founder AI - Intelligent Business Assistant",
    description:
      "An AI-powered business assistant designed to provide intelligent responses, business guidance and useful information through API-based AI integration.",
    technologies: [
      "React",
      "API",
      "OpenAI",
      "Tailwind CSS",
    ],
    image: projectImages["Founder AI - Intelligent Business Assistant"],
    github: "#",
    live: "#",
    featured: true,
    icon: <FiBriefcase />,
  },

  {
    id: 3,
    title: "ChatBot-Aura Mind",
    description:
      "A modern MERN and AI-powered chatbot application with an interactive interface and AI integration.",
    technologies: [
      "React",
      "API",
      "Puter.JS",
      "Tailwind CSS",
    ],
    image: projectImages["ChatBot-Aura Mind"],
    github:
      "https://github.com/AbishekSathiyan/AI_ChatBot_Assistant",
    live: "#",
    featured: true,
    icon: <FiMessageCircle />,
  },

  {
    id: 4,
    title: "AS Ecommerce",
    description:
      "A full-stack MERN ecommerce application with authentication, product management, email services, cloud image storage and Razorpay payment integration.",
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
    image: projectImages["AS Ecommerce"],
    github: "#",
    live: "#",
    icon: <FiShoppingCart />,
  },

  {
    id: 5,
    title: "Methalodai Village Community",
    description:
      "A community-focused web platform created to digitally connect and organize information related to the Methalodai village community.",
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
    image: projectImages["Methalodai Village Community"],
    github: "#",
    live: "#",
    icon: <FiMapPin />,
  },

  {
    id: 6,
    title: "Campus Lost & Found",
    description:
      "A campus lost-and-found platform allowing users to manage lost and found items with authentication, image uploads and email communication.",
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
    image: projectImages["Campus Lost & Found"],
    github: "#",
    live: "#",
    icon: <FiUsers />,
  },

  {
    id: 7,
    title: "Bulk Mail System",
    description:
      "A web-based bulk email management system designed to simplify sending emails to multiple recipients using a Node.js backend.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Nodemailer",
      "Tailwind CSS",
    ],
    image: projectImages["Bulk Mail System"],
    github: "#",
    live: "#",
    icon: <FiMail />,
  },

  {
    id: 8,
    title: "FileShare MERN App",
    description:
      "A file sharing platform built with MERN technologies, JWT authentication, Multer uploads and Cloudinary cloud storage.",
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
    image: projectImages["FileShare MERN App"],
    github: "#",
    live: "#",
    icon: <FiFileText />,
  },

  {
    id: 9,
    title: "Portfolio - MERN",
    description:
      "A personal full-stack developer portfolio built using MERN technologies with authentication, email communication and modern responsive UI.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Nodemailer",
      "JWT",
      "Tailwind CSS",
    ],
    image: projectImages["Portfolio - MERN"],
    github: "#",
    live: "#",
    icon: <FiMonitor />,
  },

  {
    id: 10,
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that retrieves live weather information through the OpenWeatherMap API.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "OpenWeatherMap API",
    ],
    image: projectImages["Weather Dashboard"],
    github: "#",
    live: "#",
    icon: <FiCloud />,
  },

  {
    id: 11,
    title: "Task Manager",
    description:
      "A task management application with local data persistence, notifications and a responsive interface.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Material UI",
      "LocalStorage",
      "Notifications API",
    ],
    image: projectImages["Task Manager"],
    github: "#",
    live: "#",
    icon: <FiCalendar />,
  },

  {
    id: 12,
    title: "Joke Generator",
    description:
      "A lightweight web application that retrieves jokes using the Chuck Norris API.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Chuck Norris API",
    ],
    image: projectImages["Joke Generator"],
    github: "#",
    live: "#",
    icon: <FiSmile />,
  },
];

/* =========================================================
   MACHINE LEARNING PROJECTS
========================================================= */

const machineLearningProjects = [
  {
    id: "ml-1",
    title: "Encryption Tool",
    description:
      "A security-focused encryption project designed to demonstrate data protection and secure text handling using encryption techniques.",
    technologies: [
      "Machine Learning",
      "Python",
    ],
    image: projectImages["Encryption Tool"],
    github: "#",
    live: "#",
    icon: <FiLock />,
  },

  {
    id: "ml-2",
    title: "House Price Prediction",
    description:
      "A machine learning prediction project designed to estimate house prices from relevant property features using a trained predictive model.",
    technologies: [
      "Machine Learning",
      "Python",
      "Pandas",
      "NumPy",
      "ScikitLearn",
    ],
    image: projectImages["House Price Prediction"],
    github: "#",
    live: "#",
    icon: <FiHome />,
  },

  {
    id: "ml-3",
    title: "Loan Approval Prediction",
    description:
      "A machine learning project that predicts loan approval outcomes based on applicant and financial information.",
    technologies: [
      "Machine Learning",
      "Python",
      "Pandas",
      "NumPy",
      "ScikitLearn",
    ],
    image: projectImages["Loan Approval Prediction"],
    github: "#",
    live: "#",
    icon: <FiCheckCircle />,
  },

  {
    id: "ml-4",
    title: "Movie Recommendation System",
    description:
      "A recommendation system project designed to suggest movies based on available movie information and recommendation logic.",
    technologies: [
      "Machine Learning",
      "Python",
      "Pandas",
      "NumPy",
      "ScikitLearn",
    ],
    image: projectImages["Movie Recommendation System"],
    github: "#",
    live: "#",
    icon: <FiFilm />,
  },

  {
    id: "ml-5",
    title: "Smart Spam & Phishing Guard",
    description:
      "A smart security project that analyzes potentially dangerous URLs and messages to identify spam and phishing risks using machine learning techniques.",
    technologies: [
      "Machine Learning",
      "Python",
      "ScikitLearn",
      "API",
    ],
    image: projectImages["Smart Spam & Phishing Guard"],
    github: "#",
    live: "#",
    icon: <FiShield />,
  },
];

/* =========================================================
   PROJECT CARD
========================================================= */

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-blue-300
        hover:shadow-xl
      "
    >
      {project.featured && (
        <div
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            items-center
            gap-1
            rounded-full
            bg-yellow-100
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-yellow-700
          "
        >
          <FiStar className="h-3 w-3" />
          Featured
        </div>
      )}

      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&crop=entropy&auto=format";
            }}
          />
        ) : (
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-blue-600
              shadow-md
              transition-transform
              duration-300
              group-hover:scale-110
            "
          >
            {React.cloneElement(project.icon, {
              className: "h-8 w-8",
            })}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3
          className="
            text-lg
            font-bold
            text-gray-900
            transition-colors
            group-hover:text-blue-600
          "
        >
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}

          {project.technologies.length > 4 && (
            <span
              className="
                rounded-full
                border
                border-gray-200
                bg-gray-50
                px-3
                py-1.5
                text-[10px]
                font-medium
                text-gray-500
                sm:text-xs
              "
            >
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   PROJECT MODAL
========================================================= */

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/60
          p-4
          backdrop-blur-sm
        "
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 20,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            max-h-[90vh]
            w-full
            max-w-3xl
            overflow-y-auto
            rounded-2xl
            bg-white
            shadow-2xl
          "
        >
          <button
            onClick={onClose}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-gray-600
              shadow-md
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            <FiX className="h-5 w-5" />
          </button>

          <div
            className="
              flex
              min-h-[220px]
              items-center
              justify-center
              bg-gradient-to-br
              from-blue-50
              via-white
              to-purple-50
            "
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-64 w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&crop=entropy&auto=format";
                }}
              />
            ) : (
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  text-blue-600
                  shadow-lg
                "
              >
                {React.cloneElement(project.icon, {
                  className: "h-10 w-10",
                })}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {project.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              {project.description}
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                Technologies
              </h4>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-gray-900
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-gray-700
                  "
                >
                  <FiGithub className="h-4 w-4" />
                  GitHub
                </a>
              )}

              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  <FiExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [logoErrors, setLogoErrors] = useState({});

  /* =======================================================
     CORE TECHNOLOGY STACK
  ======================================================= */

  const coreTechStack = [
    "MongoDB",
    "Node.js",
    "Express",
    "JWT",
    "React",
    "Tailwind CSS",
    "Material UI",
    "Vite",
    "Firebase",
    "Firebase Authentication",
    "OAuth",
    "Cloudinary",
    "Nodemailer",
    "Multer",
    "Razorpay",
    "Machine Learning",
  ];

  /* =======================================================
     ADDITIONAL TECHNOLOGIES
  ======================================================= */

  const additionalTechStack = [
    {
      name: "API",
      logo: null,
      icon: techFallbackIcons.API,
    },
    {
      name: "LocalStorage",
      logo: null,
      icon: techFallbackIcons.LocalStorage,
    },
    {
      name: "OpenWeatherMap",
      logo: null,
      icon: techFallbackIcons["OpenWeatherMap API"],
    },
    {
      name: "Chuck Norris API",
      logo: null,
      icon: techFallbackIcons["Chuck Norris API"],
    },
    {
      name: "Puter.JS",
      logo: techLogos["Puter.JS"],
      icon: techFallbackIcons["Puter.JS"],
    },
    {
      name: "OpenAI",
      logo: techLogos.OpenAI,
      icon: techFallbackIcons.OpenAI,
    },
  ];

  return (
    <>
      <section
        id="projects"
        className="
          relative
          overflow-hidden
          bg-gradient-to-b
          from-white
          via-blue-50/30
          to-white
          px-4
          py-20
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -left-32
              top-20
              h-72
              w-72
              rounded-full
              bg-blue-200/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -right-32
              bottom-20
              h-72
              w-72
              rounded-full
              bg-purple-200/20
              blur-3xl
            "
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* =================================================
              HEADER
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-4
                py-2
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-blue-600
              "
            >
              <FiBriefcase className="h-4 w-4" />
              My Works
            </span>

            <h2
              className="
                mt-5
                text-3xl
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              A collection of full-stack, AI-powered and modern web
              applications built with real-world technologies.
            </p>
          </motion.div>

          {/* =================================================
              WEB / FULL STACK PROJECTS
          ================================================= */}

          <div className="mt-14">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiCode className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Web & Full Stack Projects
                </h3>

                <p className="text-sm text-gray-500">
                  MERN, Firebase, AI and modern web applications
                </p>
              </div>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* =================================================
              MACHINE LEARNING PROJECTS
          ================================================= */}

          <div className="mt-20">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-7 flex items-center gap-3"
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-100
                  text-violet-600
                "
              >
                <FiCpu className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Machine Learning Projects
                </h3>

                <p className="text-sm text-gray-500">
                  Prediction, recommendation, security and data-driven
                  projects
                </p>
              </div>
            </motion.div>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {machineLearningProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* =================================================
              TECHNOLOGY STACK
          ================================================= */}

          <div className="mt-20">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mx-auto mb-8 max-w-2xl text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                Technology Stack
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Technologies and tools used across my projects
              </p>
            </motion.div>

            {/* CORE STACK */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
                xl:grid-cols-8
              "
            >
              {coreTechStack.map((tech) => (
                <TechStackCard
                  key={tech}
                  name={tech}
                  logo={techLogos[tech]}
                  icon={techFallbackIcons[tech]}
                  logoErrors={logoErrors}
                  setLogoErrors={setLogoErrors}
                />
              ))}
            </div>

            {/* ADDITIONAL STACK */}

            <div className="mt-10">
              <div className="mb-5 text-center">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                  Additional Technologies
                </h4>
              </div>

              <div
                className="
                  mx-auto
                  grid
                  max-w-5xl
                  grid-cols-2
                  gap-3
                  sm:grid-cols-3
                  md:grid-cols-6
                "
              >
                {additionalTechStack.map((tech) => (
                  <TechStackCard
                    key={tech.name}
                    name={tech.name}
                    logo={tech.logo}
                    icon={tech.icon}
                    logoErrors={logoErrors}
                    setLogoErrors={setLogoErrors}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER COUNT
          ================================================= */}

          <div className="mt-14 text-center">
            <p className="text-sm font-medium text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {projects.length + machineLearningProjects.length}
              </span>{" "}
              projects • More coming soon...
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;