import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar, FiCode } from "react-icons/fi";
import Village from "../components/assets/Village.png";

// Technology logos mapping - fixed Cloudinary URL
const techLogos = {
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Firebase Authentication":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "NodeMailer":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Razorpay: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/razorpay.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Cloudinary:
    "https://res.cloudinary.com/cloudinary/image/upload/v1591941977/cloudinary_logo_for_white_bg.svg",
  JWT: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jsonwebtokens.svg",
  Multer: "https://tamediacdn.techaheadcorp.com/wp-content/uploads/2023/09/16045813/Multer-js.webp",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  "OpenWeatherMap API":
    "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openweathermap.svg",
  "Material UI":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  LocalStorage:
    "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/localstorage.svg",
  "Notifications API":
    "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notifications.svg",
  "Chuck Norris API":
    "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/chucknorris.svg",
};

const projects = [
  {
    id: 1,
    title: "AS Ecommerce (MERN)",
    description:
      "A modern full-stack eCommerce platform with Firebase Authentication, Razorpay payments, and admin dashboard.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Firebase Authentication",
      "Node Mailer",
      "Razorpay",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/AS_Ecommerce",
    demoLink: "https://as-ecommerce-demo.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Methalodai Community",
    description:
      "Instagram-like community platform for village communication with posts, follows, likes, and comments.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Firebase Authentication",
      "Node Mailer",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/Methalodai-Community",
    demoLink: "https://methalodai-community.vercel.app/",
    image: Village,
    featured: true,
  },
  {
    id: 3,
    title: "Campus Lost & Found",
    description:
      "Campus MERN app for reporting and recovering lost items with image uploads and email notifications.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Firebase Authentication",
      "Node Mailer",
      "Cloudinary",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/Campus-Lost-and-Found",
    demoLink: "https://campus-lost-found.vercel.app/",
    image:
      "https://th.bing.com/th/id/OIP.GuBsosCzWL62CBbvCgyrsAHaFQ?w=254&h=180&c=7&r=0&o=7&pid=1.7",
  },
  {
    id: 4,
    title: "Bulk Mail System",
    description:
      "Send personalized bulk emails from Excel sheets using Nodemailer with custom templates.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Node Mailer",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/Bulk_Mail_Front-End",
    demoLink: "https://bulk-mail-front-end.vercel.app/login",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
  },
  {
    id: 5,
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
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AbishekSathiyan/FileShare-MERN-Application",
    demoLink: "https://mern-file-share.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Portfolio (MERN + OTP)",
    description:
      "Responsive portfolio with admin-secured contact form using OTP verification for modern recruiters.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Node Mailer",
      "Tailwind CSS",
    ],
    githubLink:
      "https://github.com/AbishekSathiyan/Abishek_Portfolio_Front-End",
    demoLink: "https://abishek-portfolio-front-end.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Weather Dashboard",
    description:
      "Sleek weather app with real-time temperature, humidity, and conditions using OpenWeatherMap API.",
    technologies: ["React", "Vite", "Tailwind CSS", "OpenWeatherMap API"],
    githubLink: "https://github.com/AbishekSathiyan/Weather_React_App",
    demoLink: "https://weather-react-app-two-theta.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Task Manager",
    description:
      "Productivity app with notifications, reminders, dark mode, and localStorage persistence.",
    technologies: ["React", "Tailwind CSS", "Material UI", "LocalStorage"],
    githubLink: "https://github.com/AbishekSathiyan/Task_Manager_React",
    demoLink: "https://task-manager-react-10.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
  },
  {
    id: 9,
    title: "Joke Generator",
    description:
      "A fun and interactive web app that fetches random jokes from the Chuck Norris API.",
    technologies: ["React", "Tailwind CSS", "Chuck Norris API"],
    githubLink: "https://github.com/AbishekSathiyan/joke-generator",
    demoLink: "https://joke-generator-app.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
  },
];

// Technology component with logo
const TechBadge = ({ tech }) => {
  const logo = techLogos[tech];

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-1.5 bg-gray-700/50 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-600/50 backdrop-blur-sm hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-200 group"
    >
      {logo && (
        <img
          src={logo}
          alt={tech}
          className="w-3 h-3 object-contain group-hover:scale-110 transition-transform"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}
      <span className="text-xs">{tech}</span>
    </motion.div>
  );
};

export default function Projects() {
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

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <FiCode className="text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">My Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
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
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold">
                    <FiStar className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}

              {/* Project Number */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-600/50 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-300">
                  {project.id}
                </span>
              </div>

              {/* Image Container */}
              <div className="h-48 overflow-hidden relative">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies with Logos */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.githubLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center flex-1 gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white py-2.5 px-4 rounded-lg transition-all duration-200 border border-gray-600/50 backdrop-blur-sm group/btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>

                  <motion.a
                    href={project.demoLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center flex-1 gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-white py-2.5 px-4 rounded-lg transition-all duration-200 border border-blue-500/30 backdrop-blur-sm group/btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </motion.a>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-white">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {Object.entries(techLogos)
              .slice(0, 12)
              .map(([tech, logo]) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
                >
                  <img
                    src={logo}
                    alt={tech}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-xs text-gray-300">
                    {tech.split(" ")[0]}
                  </span>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Showing {projects.length} amazing projects • More coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
