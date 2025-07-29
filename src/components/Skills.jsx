import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { UilHtml5, UilCss3Simple, UilReact, UilGitlab, UilJavaScript } from '@iconscout/react-unicons';
import { SiTailwindcss, SiNodedotjs, SiMongodb, SiFigma } from 'react-icons/si';

export default function Skills() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const skillsRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const skills = [
    { name: "HTML", level: 95, icon: <UilHtml5 size="24" />, color: "#E44D26" },
    { name: "CSS", level: 90, icon: <UilCss3Simple size="24" />, color: "#264DE4" },
    { name: "JS", level: 85, icon: <UilJavaScript size="24" />, color: "#F0DB4F" },
    { name: "React", level: 80, icon: <UilReact size="24" />, color: "#61DAFB" },
    { name: "Tailwind", level: 85, icon: <SiTailwindcss size="24" />, color: "#38B2AC" },
    { name: "Node", level: 70, icon: <SiNodedotjs size="24" />, color: "#68A063" },
    { name: "MongoDB", level: 65, icon: <SiMongodb size="24" />, color: "#4DB33D" },
    { name: "Git", level: 80, icon: <UilGitlab size="24" />, color: "#F34F29" },
    { name: "Figma", level: 75, icon: <SiFigma size="24" />, color: "#A259FF" },
  ];

  // Double the array for seamless looping
  const doubledSkills = [...skills, ...skills];

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const skillsWidth = skillsRef.current?.offsetWidth || 0;
    const duration = skills.length * 3; // Adjust speed here

    if (!isPaused) {
      controls.start({
        x: [-skillsWidth, 0],
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    } else {
      controls.stop();
    }
  }, [controls, isPaused]);

  return (
    <section id="skills" className="py-20 bg-light overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Skills</span>
        </h2>
        
       

        <div 
          ref={containerRef} 
          className="relative h-40 overflow-hidden"
        >
          <motion.div
            ref={skillsRef}
            className="absolute flex items-center gap-8"
            animate={controls}
            style={{ left: '100%' }}
          >
            {doubledSkills.map((skill, index) => (
              <motion.div 
                key={`${skill.name}-${index}`} 
                className="flex-shrink-0 flex flex-col items-center"
                style={{ width: '120px' }}
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
              >
                <div className="relative">
                  {/* Logo with circular progress */}
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
                        stroke="#e5e7eb"
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
                        strokeDashoffset={283 - (283 * skill.level / 100)}
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 - (283 * skill.level / 100) }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {skill.icon}
                    </div>
                  </div>
                  
                  {/* Percentage text */}
                  <div 
                    className="absolute -bottom-6 left-0 right-0 text-center font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </div>
                </div>
                
                {/* Skill name */}
                <div className="mt-8 text-sm font-medium text-gray-700">
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