import { GraduationCap, FileBadge, Briefcase } from "lucide-react";
import {
  FaDownload,
  FaReact,
  FaNodeJs,
  FaJs,
  FaCss3Alt,
  FaGitAlt,
  FaPython,
  FaGraduationCap,
  FaCertificate,
  FaLaptopCode,
  FaFilePdf,
  FaBookOpen,
  FaMedal,
  FaBriefcase as FaBriefcaseIcon,
  FaUserGraduate,
  FaStar,
  FaTrophy,
  FaAward,
  FaCheckCircle,
  FaCode,
  FaServer,
  FaDatabase,
  FaCloud,
  FaFileAlt,
  FaFileWord,
  FaFileArchive,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiRedux,
  SiFirebase,
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import Banner from "./assets/Banner.png";

export default function About() {
  // Tech stack data with colors
  const techStack = [
    { icon: <FaReact className="text-[#61DAFB]" />, name: "React" },
    { icon: <FaNodeJs className="text-[#68A063]" />, name: "Node.js" },
    { icon: <FaJs className="text-[#F7DF1E]" />, name: "JavaScript" },
    { icon: <FaCss3Alt className="text-[#2965F1]" />, name: "CSS3" },
    { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: "Tailwind" },
    { icon: <SiMongodb className="text-[#47A248]" />, name: "MongoDB" },
    { icon: <FaGitAlt className="text-[#F05032]" />, name: "Git" },
    { icon: <SiRedux className="text-[#764ABC]" />, name: "Redux" },
    { icon: <SiFirebase className="text-[#FFCA28]" />, name: "Firebase" },
    { icon: <FaPython className="text-[#3776AB]" />, name: "Python" },
  ];

  // Background animations for different sections
  const sectionBackgrounds = {
    whoIAm: "https://assets1.lottiefiles.com/packages/lf20_5tkzkblw.json",
    education: "https://assets1.lottiefiles.com/packages/lf20_gn0tojcq.json",
    certifications:
      "https://assets1.lottiefiles.com/packages/lf20_obhph3sh.json",
    internships: "https://assets1.lottiefiles.com/packages/lf20_2naa2t2e.json",
    profile: "https://assets1.lottiefiles.com/packages/lf20_6wutsrox.json",
  };

  // Floating tech icons data
  const floatingTechIcons = [
    {
      icon: <FaReact className="text-[#61DAFB]" size={24} />,
      initialX: -50,
      initialY: -30,
    },
    {
      icon: <SiTypescript className="text-[#3178C6]" size={20} />,
      initialX: -30,
      initialY: -50,
    },
    {
      icon: <SiTailwindcss className="text-[#06B6D4]" size={18} />,
      initialX: -60,
      initialY: -10,
    },
    {
      icon: <FaNodeJs className="text-[#68A063]" size={22} />,
      initialX: -20,
      initialY: -40,
    },
    {
      icon: <SiMongodb className="text-[#47A248]" size={20} />,
      initialX: -40,
      initialY: -20,
    },
    {
      icon: <FaPython className="text-[#3776AB]" size={20} />,
      initialX: -10,
      initialY: -60,
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-20 bg-light dark:bg-dark text-dark dark:text-light relative overflow-hidden"
    >
      {/* Global background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Binary code background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <Player
            autoplay
            loop
            speed={0.3}
            src="https://assets1.lottiefiles.com/packages/lf20_6wutsrox.json"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Floating tech bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-primary/10 dark:bg-secondary/10"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* Floating tech particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${
                Math.random() > 0.5 ? "97, 218, 251" : "104, 160, 99"
              }, ${Math.random() * 0.3 + 0.1})`,
            }}
            animate={{
              y: [0, Math.random() * 200 - 100],
              x: [0, Math.random() * 200 - 100],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating tech icons */}
        {floatingTechIcons.map((tech, i) => (
          <motion.div
            key={`tech-icon-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {tech.icon}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated title section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
          className="mb-16 text-center relative"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold relative z-10">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Me
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-4 mx-auto w-32"
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 xl:gap-16 relative">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="w-full lg:w-1/3 flex justify-center relative"
          >
            {/* Tech orbit animation */}
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20 dark:border-secondary/20 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {techStack.slice(0, 6).map((tech, i) => (
                <motion.div
                  key={i}
                  className="absolute -top-3 -left-3 bg-white dark:bg-dark p-2 rounded-full shadow-md dark:shadow-gray-800/50"
                  style={{
                    transform: `rotate(${
                      (360 / 6) * i
                    }deg) translateX(100px) rotate(-${(360 / 6) * i}deg)`,
                  }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                >
                  {tech.icon}
                </motion.div>
              ))}
            </motion.div>

            {/* Profile image container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-gray-800/30 group isolate">
              <motion.img
                src={Banner}
                alt="Abishek S"
                className="w-full h-full object-cover object-top"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

          {/* About Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-2/3 space-y-12"
          >
            {/* Who I Am section with floating code animation */}
            <WhoIAmCard backgroundAnimation={sectionBackgrounds.whoIAm} />

            {/* Education Section with book opening animation and left side animation */}
            <EducationCard backgroundAnimation={sectionBackgrounds.education} />

            {/* Certifications Section with badge animation and left side animation */}
            <CertificationsCard
              backgroundAnimation={sectionBackgrounds.certifications}
            />

            {/* Internship Section with laptop animation and left side animation */}
            <InternshipsCard
              backgroundAnimation={sectionBackgrounds.internships}
            />

            {/* Resume Download Section with document animation and left side animation */}
            <ResumeCard backgroundAnimation={sectionBackgrounds.profile} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Who I Am Card with Floating Code Animation
const WhoIAmCard = ({ backgroundAnimation }) => {
  // Floating code snippets animation
  const codeSnippets = [
    { text: "console.log('Hello World')", x: -20, y: -30, delay: 0 },
    { text: "function create() {}", x: 30, y: -40, delay: 1 },
    { text: "const app = express()", x: -40, y: 20, delay: 2 },
    { text: "import React from 'react'", x: 50, y: 30, delay: 1.5 },
    { text: "export default App", x: -30, y: 50, delay: 2.5 },
    { text: "<div>Hello</div>", x: 40, y: -20, delay: 0.5 },
  ];

  return (
    <motion.div
      className="relative p-8 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)" }}
    >
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 -z-10">
        <Player
          autoplay
          loop
          speed={0.5}
          src={backgroundAnimation}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Floating code snippets */}
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={`code-${i}`}
          className="absolute text-xs sm:text-sm font-mono bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary px-3 py-1 rounded-full backdrop-blur-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            left: `${snippet.x}%`,
            top: `${snippet.y}%`,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: snippet.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {snippet.text}
        </motion.div>
      ))}

      <motion.h3
        className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200 inline-block relative"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Who I Am
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary origin-left"
        />
      </motion.h3>

      <div className="space-y-4">
        <motion.p
          className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          I'm a passionate Full-Stack Developer from Methalodai, Ramanathapuram,
          Tamil Nadu, India, with 1 year of hands-on experience building
          responsive and user-friendly web applications. I specialize in React,
          JavaScript, AI-based chatbots, and modern CSS frameworks, creating
          elegant solutions and seamless user experiences.
        </motion.p>
        <motion.p
          className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          My approach combines technical expertise with an eye for design to
          create seamless digital experiences that users love.
        </motion.p>
      </div>
    </motion.div>
  );
};

// Education Card with Left Side Animation
const EducationCard = ({ backgroundAnimation }) => {
  // Left side education icons animation
  const educationIcons = [
    {
      icon: <FaBookOpen className="text-2xl text-blue-400" />,
      delay: 0,
      y: -20,
    },
    {
      icon: <FaGraduationCap className="text-2xl text-green-400" />,
      delay: 1,
      y: 10,
    },
    {
      icon: <FaUserGraduate className="text-2xl text-purple-400" />,
      delay: 2,
      y: -30,
    },
    { icon: <SiReact className="text-2xl text-cyan-400" />, delay: 3, y: 20 },
    {
      icon: <SiJavascript className="text-2xl text-yellow-400" />,
      delay: 4,
      y: -10,
    },
    { icon: <SiPython className="text-2xl text-blue-500" />, delay: 5, y: 15 },
  ];

  // Floating books animation
  const floatingBooks = [
    { color: "from-blue-400 to-purple-400", rotate: -5, left: 0, top: 10 },
    { color: "from-green-400 to-teal-400", rotate: 8, left: 20, top: 40 },
    { color: "from-yellow-400 to-orange-400", rotate: -3, left: -10, top: 70 },
  ];

  return (
    <motion.div
      className="relative p-8 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)" }}
    >
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 -z-10">
        <Player
          autoplay
          loop
          speed={0.5}
          src={backgroundAnimation}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Left Side Animation - Education Icons Column */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pointer-events-none">
        {educationIcons.map((item, i) => (
          <motion.div
            key={`edu-icon-${i}`}
            className="bg-white/90 dark:bg-gray-700/90 p-2 rounded-full shadow-lg backdrop-blur-sm border border-primary/20"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: item.delay * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            animate={{
              y: [0, item.y, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Left Side - Floating Books */}
      <div className="absolute left-4 top-0 bottom-0 w-20 pointer-events-none hidden lg:block">
        {floatingBooks.map((book, i) => (
          <motion.div
            key={`book-${i}`}
            className={`absolute w-12 h-12 bg-gradient-to-br ${book.color} rounded-lg shadow-xl opacity-30`}
            style={{
              left: `${book.left}px`,
              top: `${book.top}%`,
              rotate: book.rotate,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [
                book.rotate,
                book.rotate + 10,
                book.rotate - 5,
                book.rotate,
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="ml-16">
        <motion.h3
          className="text-xl sm:text-2xl font-semibold flex items-center gap-3 mb-6 text-gray-800 dark:text-gray-200 group"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-300"
            whileHover={{ rotate: [0, 15, -10, 0] }}
            transition={{ duration: 0.6 }}
          >
            <FaGraduationCap className="w-5 h-5 text-primary" />
          </motion.span>
          <span>Education</span>
          <motion.div
            className="h-px bg-gradient-to-r from-primary to-transparent flex-1 ml-2"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.h3>

        <motion.div className="space-y-4">
          {[
            {
              title: "MCA – Master of Computer Applications",
              subtitle: "Karpagam University, Coimbatore, Tamil Nadu, India",
              meta: "2023 – 2025",
            },
            {
              title: "BCA – Bachelor of Computer Applications",
              subtitle:
                "Caussanel College of Arts & Science, Muthupettai, Ramanathapuram, Tamil Nadu, India",
              meta: "2020 – 2023",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, type: "spring" }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group/item"
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover/item:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
                <motion.span
                  className="text-sm sm:text-base font-medium text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full whitespace-nowrap group-hover/item:bg-primary/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.meta}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Certifications Card with Left Side Animation
const CertificationsCard = ({ backgroundAnimation }) => {
  // Left side certification icons
  const certIcons = [
    {
      icon: <FaMedal className="text-2xl text-yellow-400" />,
      delay: 0,
      y: -20,
    },
    {
      icon: <FaCertificate className="text-2xl text-green-400" />,
      delay: 1,
      y: 15,
    },
    { icon: <FaStar className="text-2xl text-purple-400" />, delay: 2, y: -25 },
    {
      icon: <FaTrophy className="text-2xl text-orange-400" />,
      delay: 3,
      y: 10,
    },
    { icon: <FaAward className="text-2xl text-blue-400" />, delay: 4, y: -15 },
    {
      icon: <FaCheckCircle className="text-2xl text-cyan-400" />,
      delay: 5,
      y: 20,
    },
  ];

  // Floating badges
  const badges = [
    { icon: "🏆", color: "text-yellow-400", left: 10, top: 20 },
    { icon: "⭐", color: "text-blue-400", left: -5, top: 45 },
    { icon: "🎯", color: "text-red-400", left: 15, top: 70 },
    { icon: "💡", color: "text-green-400", left: 0, top: 90 },
  ];

  return (
    <motion.div
      className="relative p-8 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)" }}
    >
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 -z-10">
        <Player
          autoplay
          loop
          speed={0.5}
          src={backgroundAnimation}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Left Side Animation - Certification Icons Column */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pointer-events-none">
        {certIcons.map((item, i) => (
          <motion.div
            key={`cert-icon-${i}`}
            className="bg-white/90 dark:bg-gray-700/90 p-2 rounded-full shadow-lg backdrop-blur-sm border border-primary/20"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: item.delay * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            animate={{
              y: [0, item.y, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Left Side - Floating Badges */}
      <div className="absolute left-4 top-0 bottom-0 w-20 pointer-events-none hidden lg:block">
        {badges.map((badge, i) => (
          <motion.div
            key={`badge-${i}`}
            className={`absolute text-3xl ${badge.color} opacity-30`}
            style={{
              left: `${badge.left}px`,
              top: `${badge.top}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              delay: i * 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {badge.icon}
          </motion.div>
        ))}
      </div>

      <div className="ml-16">
        <motion.h3
          className="text-xl sm:text-2xl font-semibold flex items-center gap-3 mb-6 text-gray-800 dark:text-gray-200 group"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-300"
            whileHover={{ rotate: [0, 15, -10, 0] }}
            transition={{ duration: 0.6 }}
          >
            <FaCertificate className="w-5 h-5 text-primary" />
          </motion.span>
          <span>Certifications</span>
          <motion.div
            className="h-px bg-gradient-to-r from-primary to-transparent flex-1 ml-2"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.h3>

        <motion.div className="space-y-4">
          {[
            { title: "Introduction to AI Agents", subtitle: "Microsoft" },
            { title: "Claude Code in Action", subtitle: "Anthropic" },
            {
              title: "AI Vibe Coding Workshop",
              subtitle: "Digital India | Intel",
            },
            {
              title: "Full-Stack Developer (MERN Stack)",
              subtitle: "Error Makes Clever",
            },
            { title: "Namaste JavaScript Completion", subtitle: "NamasteDev" },
            { title: "Mastering Python", subtitle: "Infosys" },
            {
              title: "National Conference on Data Science & Analytics",
              subtitle: "TCS iON",
            },
            { title: "AI for All", subtitle: "Digital India | Intel" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, type: "spring" }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group/item"
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              <div>
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover/item:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Internships Card with Left Side Animation
const InternshipsCard = ({ backgroundAnimation }) => {
  // Left side internship icons
  const internshipIcons = [
    {
      icon: <FaLaptopCode className="text-2xl text-blue-400" />,
      delay: 0,
      y: -20,
    },
    {
      icon: <FaBriefcaseIcon className="text-2xl text-green-400" />,
      delay: 1,
      y: 15,
    },
    { icon: <FaCode className="text-2xl text-purple-400" />, delay: 2, y: -25 },
    {
      icon: <FaServer className="text-2xl text-orange-400" />,
      delay: 3,
      y: 10,
    },
    {
      icon: <FaDatabase className="text-2xl text-cyan-400" />,
      delay: 4,
      y: -15,
    },
    { icon: <FaCloud className="text-2xl text-blue-300" />, delay: 5, y: 20 },
  ];

  return (
    <motion.div
      className="relative p-8 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)" }}
    >
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 -z-10">
        <Player
          autoplay
          loop
          speed={0.5}
          src={backgroundAnimation}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Left Side Animation - Internship Icons Column */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pointer-events-none">
        {internshipIcons.map((item, i) => (
          <motion.div
            key={`intern-icon-${i}`}
            className="bg-white/90 dark:bg-gray-700/90 p-2 rounded-full shadow-lg backdrop-blur-sm border border-primary/20"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: item.delay * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            animate={{
              y: [0, item.y, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Left Side - Laptop Animation */}
      <motion.div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 pointer-events-none hidden lg:block"
        animate={{
          y: [0, -10, 0],
          rotateZ: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-12 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border-2 border-gray-600 opacity-30">
          <motion.div
            className="w-full h-1 bg-gradient-to-r from-primary to-secondary mt-1"
            animate={{
              width: ["30%", "70%", "50%", "90%", "30%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

      <div className="ml-16">
        <motion.h3
          className="text-xl sm:text-2xl font-semibold flex items-center gap-3 mb-6 text-gray-800 dark:text-gray-200 group"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-300"
            whileHover={{ rotate: [0, 15, -10, 0] }}
            transition={{ duration: 0.6 }}
          >
            <FaLaptopCode className="w-5 h-5 text-primary" />
          </motion.span>
          <span>Internships</span>
          <motion.div
            className="h-px bg-gradient-to-r from-primary to-transparent flex-1 ml-2"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.h3>

        <motion.div className="space-y-4">
          {[
            {
              title: "MERN Stack Intern – Full Stack Projects",
              subtitle: "Skillmate.ai",
              meta: "Aug 2024 – Sep 2024",
              description: "React.js, Next.js, Tailwind CSS",
              link: "https://skillmate.ai/",
            },
            {
              title: "Data Structures and Algorithms – Learning DSA",
              subtitle: "kaashiv Infotech",
              meta: "April 2025",
              description: "Programming, DataStructures, Algorithms",
              link: "www.kaashivinfotech.com/",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, type: "spring" }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group/item"
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover/item:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline transition-all duration-300 hover:tracking-wide"
                      >
                        {item.subtitle}
                      </a>
                    ) : (
                      item.subtitle
                    )}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
                <motion.span
                  className="text-sm sm:text-base font-medium text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full whitespace-nowrap group-hover/item:bg-primary/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.meta}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Resume Card with Left Side Animation
const ResumeCard = ({ backgroundAnimation }) => {
  // Left side resume icons
  const resumeIcons = [
    { icon: <FaFilePdf className="text-2xl text-red-400" />, delay: 0, y: -20 },
    {
      icon: <FaDownload className="text-2xl text-green-400" />,
      delay: 1,
      y: 15,
    },
    {
      icon: <FaFileAlt className="text-2xl text-blue-400" />,
      delay: 2,
      y: -25,
    },
    {
      icon: <FaFileWord className="text-2xl text-purple-400" />,
      delay: 3,
      y: 10,
    },
    {
      icon: <FaFileArchive className="text-2xl text-yellow-400" />,
      delay: 4,
      y: -15,
    },
    {
      icon: <FaFilePdf className="text-2xl text-orange-400" />,
      delay: 5,
      y: 20,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative p-8 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 group"
      whileHover={{ boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.4)" }}
    >
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 -z-10">
        <Player
          autoplay
          loop
          speed={0.5}
          src={backgroundAnimation}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Left Side Animation - Resume Icons Column */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pointer-events-none">
        {resumeIcons.map((item, i) => (
          <motion.div
            key={`resume-icon-${i}`}
            className="bg-white/90 dark:bg-gray-700/90 p-2 rounded-full shadow-lg backdrop-blur-sm border border-primary/20"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: item.delay * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            animate={{
              y: [0, item.y, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Left Side - Floating Documents */}
      <motion.div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 pointer-events-none hidden lg:block"
        animate={{
          rotateZ: [0, 5, -5, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaFilePdf className="text-6xl text-primary opacity-20" />
      </motion.div>

      <motion.div
        className="absolute left-8 bottom-4 w-16 pointer-events-none hidden lg:block"
        animate={{
          rotateZ: [0, -5, 5, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <FaFilePdf className="text-4xl text-secondary opacity-20" />
      </motion.div>

      {/* Content */}
      <div className="ml-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold mb-6 dark:text-gray-200 flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📄
            </motion.span>
            Get My Full Profile
          </h4>

          <motion.a
            href="Abishek Sathiyan UAE Fresher Mern Stack Developer Resume.pdf"
            download="Abishek Sathiyan UAE Fresher Mern Stack Developer Resume.pdf"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 group relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px -5px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaDownload className="text-lg" />
            </motion.span>
            <span>Download Resume</span>
            <motion.span
              className="ml-1 transition-all duration-300 group-hover:translate-x-1"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.p
            className="mt-3 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Includes complete work history, skills, and references
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};
