import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaFileAlt,
  FaMapMarkerAlt,
  FaGlobeAsia,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import Mine from "./assets/Mine.jpeg";

export default function Hero() {
  const [nameText, setNameText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [showLocationSplit, setShowLocationSplit] = useState(false);
  const fullName = "Abishek Sathiyan";
  const fullTitle = "Full Stack Developer (MERN)";

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Array of images to cycle through
  const images = [Mine];

  // Animation orchestration
  useEffect(() => {
    if (isInView) {
      const sequence = async () => {
        await controls.start("visible");

        // Name typing effect
        for (let i = 0; i <= fullName.length; i++) {
          setNameText(fullName.substring(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Title typing effect
        for (let i = 0; i <= fullTitle.length; i++) {
          setTitleText(fullTitle.substring(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      sequence();
    }
  }, [isInView, controls]);

  // Split location effect - shows after some time
  useEffect(() => {
    if (isInView) {
      // After name and title are typed, show split location
      const timer = setTimeout(() => {
        setShowLocationSplit(true);
      }, 4000); // Show split after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const textItem = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      rotate: -5,
      filter: "blur(4px)",
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        duration: 1.2,
        delay: 0.4,
      },
    },
  };

  const imageTransitionVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const gradientVariants = {
    hidden: { backgroundPosition: "0% 50%" },
    visible: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.8 + i * 0.1,
        type: "spring",
        stiffness: 150,
        damping: 10,
      },
    }),
    hover: {
      y: -3,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const socialVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 2.2 + i * 0.15,
        type: "spring",
        stiffness: 200,
        damping: 12,
      },
    }),
    hover: {
      y: -5,
      scale: 1.15,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    },
  };

  const scrollIndicator = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.8,
        duration: 0.8,
      },
    },
    bounce: {
      y: [0, 10, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const imageContainerVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const splitLocationVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const locationItemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const arrowVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    bounce: {
      x: [0, 8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Add image rotation effect
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isInView, images.length]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 pt-20 overflow-hidden relative"
      ref={ref}
    >
      {/* Decorative elements with subtle animations */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-500 opacity-10 blur-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
        >
          <motion.div className="mb-8" variants={textItem}>
            <motion.div className="mb-2">
              <motion.p
                className="text-lg text-blue-400 font-medium inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hello, My Name is
              </motion.p>
              <motion.div
                className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.div>

            {/* Name with Blue+Green Gradient */}
            <motion.div className="flex flex-col gap-2">
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent"
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {nameText}
                </motion.span>
                {isInView && (
                  <motion.span
                    className="inline-block h-10 w-1 bg-gradient-to-r from-blue-400 to-green-400 ml-1"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0, 1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 0,
                      ease: "linear",
                      delay: 0.5,
                    }}
                    style={{ verticalAlign: "middle" }}
                  />
                )}
              </motion.h1>

              {/* Split Location - Methalodai → Al Ain (Same Size) */}
              {showLocationSplit ? (
                <motion.div
                  className="flex items-center justify-start gap-2 sm:gap-3 md:gap-4 flex-wrap"
                  variants={splitLocationVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Methalodai - Starting Point */}
                  <motion.div
                    className="flex items-center gap-1.5 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30"
                    variants={locationItemVariants}
                    custom={0}
                    whileHover="hover"
                  >
                    <FaMapMarkerAlt className="text-purple-400 text-sm" />
                    <span className="text-sm font-medium text-purple-300">
                      Methalodai, India
                    </span>
                  </motion.div>

                  {/* Single Animated Arrow */}
                  <motion.div
                    variants={arrowVariants}
                    initial="hidden"
                    animate={["visible", "bounce"]}
                    className="text-blue-400"
                  >
                    <FiArrowRight className="text-xl" />
                  </motion.div>

                  {/* Al Ain - Destination (Same Size) */}
                  <motion.div
                    className="flex items-center gap-1.5 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/30"
                    variants={locationItemVariants}
                    custom={1}
                    whileHover="hover"
                  >
                    <FaGlobeAsia className="text-blue-400 text-sm" />
                    <span className="text-sm font-medium text-blue-300">
                      Al Ain, UAE
                    </span>
                  </motion.div>
                </motion.div>
              ) : (
                /* Initial Full Location */
                <motion.div
                  className="flex items-center gap-1.5 text-gray-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  <FaMapMarkerAlt className="text-blue-400 text-xs sm:text-sm" />
                  <span className="text-xs sm:text-sm font-light tracking-wide">
                    Methalodai, Ramanathapuram, Tamil Nadu, India
                  </span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-8"
            variants={textItem}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              variants={gradientVariants}
              initial="hidden"
              animate="visible"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              {titleText}
              {isInView && (
                <motion.span
                  className="inline-block h-6 w-1 bg-purple-500 ml-1"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0, 1, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: "linear",
                    delay: 1.5,
                  }}
                  style={{ verticalAlign: "middle" }}
                />
              )}
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed"
            variants={textItem}
          >
            I specialize in building responsive, high-performance web
            applications using modern technologies. I am passionate about
            creating elegant solutions to complex problems.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mb-12">
            <motion.a
              href="#contact"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              variants={buttonVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <HiOutlineMail className="text-xl" />
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              className="flex items-center gap-2 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors"
              variants={buttonVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <FaFileAlt />
              View Projects
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div className="flex gap-6 text-xl">
            <motion.a
              href="https://github.com/AbishekSathiyan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-text-gray-300 transition-colors"
              variants={socialVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/abishek04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              variants={socialVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="md:w-2/5 flex justify-center relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative cursor-pointer"
            variants={imageContainerVariants}
            initial="normal"
            whileHover="hover"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-400/30 shadow-xl relative">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt="Abishek S"
                className="w-full h-full object-cover"
                initial="enter"
                animate="center"
                exit="exit"
                variants={imageTransitionVariants}
              />
            </div>

            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              animate={{
                borderColor: [
                  "rgba(96, 165, 250, 0)",
                  "rgba(96, 165, 250, 0.3)",
                  "rgba(96, 165, 250, 0)",
                ],
                scale: [1, 1.05, 1.1],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -z-10 inset-0 bg-blue-400 rounded-full blur-md opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-blue-400"
        variants={scrollIndicator}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={scrollIndicator} animate="bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
        <motion.p
          className="text-sm mt-2 font-mono"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
}
