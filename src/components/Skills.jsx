import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  UilHtml5,
  UilCss3Simple,
  UilReact,
  UilGitlab,
  UilJavaScript,
} from "@iconscout/react-unicons";
import {
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiExpress,
  SiFirebase,
  SiRazorpay,
  SiCloudinary,
  SiJsonwebtokens,
  SiVite,
} from "react-icons/si";
import { FaEnvelope, FaLock, FaCloudUploadAlt } from "react-icons/fa"; // fixed Nodemailer + Multer replacements

export default function Skills() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const skillsRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const skills = [
    { name: "HTML", level: 95, icon: <UilHtml5 size="24" />, color: "#E44D26" },
    { name: "CSS", level: 90, icon: <UilCss3Simple size="24" />, color: "#264DE4" },
    { name: "JavaScript", level: 85, icon: <UilJavaScript size="24" />, color: "#F0DB4F" },
    { name: "React", level: 90, icon: <UilReact size="24" />, color: "#61DAFB" },
    { name: "Tailwind CSS", level: 85, icon: <SiTailwindcss size="24" />, color: "#38B2AC" },
    { name: "Node.js", level: 80, icon: <SiNodedotjs size="24" />, color: "#68A063" },
    { name: "Express", level: 80, icon: <SiExpress size="24" />, color: "#828282" },
    { name: "MongoDB", level: 75, icon: <SiMongodb size="24" />, color: "#4DB33D" },
    { name: "Firebase Auth", level: 70, icon: <SiFirebase size="24" />, color: "#FFA611" },
    { name: "NodeMailer", level: 70, icon: <FaEnvelope size="24" />, color: "#009688" },
    { name: "Razorpay", level: 65, icon: <SiRazorpay size="24" />, color: "#2B8DFE" },
    { name: "Cloudinary", level: 70, icon: <SiCloudinary size="24" />, color: "#4285F4" },
    { name: "JWT", level: 75, icon: <SiJsonwebtokens size="24" />, color: "#D63AFF" },
    { name: "Multer", level: 70, icon: <FaCloudUploadAlt size="24" />, color: "#FF7A00" },
    { name: "Vite", level: 80, icon: <SiVite size="24" />, color: "#646CFF" },
    { name: "Git", level: 85, icon: <UilGitlab size="24" />, color: "#F34F29" },
    { name: "Figma", level: 75, icon: <SiFigma size="24" />, color: "#A259FF" },
  ];

  const doubledSkills = [...skills, ...skills];

useEffect(() => {
  const skillsWidth = skillsRef.current?.offsetWidth || 0;
  const duration = skills.length * 3;

  if (!isPaused) {
    controls.start({
      x: [-skillsWidth, 0],
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  } else {
    controls.stop();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [controls, isPaused, skills.length]);


  return (
    <section id="skills" className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-center">
          My <span className="text-blue-400">Skills</span>
        </h2>

        <div ref={containerRef} className="relative h-44 overflow-hidden mt-10">
          <motion.div
            ref={skillsRef}
            className="absolute flex items-center gap-8"
            animate={controls}
            style={{ left: "100%" }}
          >
            {doubledSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center"
                style={{ width: "120px" }}
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
              >
                <div className="relative w-20 h-20">
                  <svg
                    className="absolute top-0 left-0 w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={skill.color}
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * skill.level) / 100}
                      initial={{ strokeDashoffset: 283 }}
                      animate={{
                        strokeDashoffset: 283 - (283 * skill.level) / 100,
                      }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {skill.icon}
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 left-0 right-0 text-center font-bold text-sm"
                  style={{ color: skill.color }}
                >
                  {skill.level}%
                </div>

                <div className="mt-10 text-sm font-medium text-gray-300">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
