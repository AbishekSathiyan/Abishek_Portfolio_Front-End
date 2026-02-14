import React, { useState, useEffect } from "react"; // ✅ Correct
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed w-full bg-dark/90 backdrop-blur-sm text-light shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Animated Name with Blue+Green Gradient */}
        <motion.p 
          className="text-2xl font-bold cursor-pointer flex items-center flex-wrap gap-1"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.span 
            className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent inline-block"
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
            Abishek Sathiyan
          </motion.span>{" "}
          
          {/* Portfolio with Blue to Purple Gradient (matching Full Stack Developer) */}
          <motion.span 
            className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block"
            style={{
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Portfolio
          </motion.span>
        </motion.p>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {links.map((link, index) => (
            <div key={link.name} className="relative group">
              {link.subLinks ? (
                <>
                  <button
                    className="flex items-center px-2 py-2 hover:text-primary transition-colors"
                    onClick={() => toggleDropdown(index)}
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.name}
                    <FaChevronDown
                      className={`ml-1 text-xs transition-transform duration-200 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === index && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-dark/95 backdrop-blur-sm rounded-md shadow-lg py-1 z-50 animate-slideDown"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.subLinks.map((subLink) => (
                        <a
                          key={subLink.name}
                          href={subLink.href}
                          className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {subLink.name}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={link.href}
                  className="relative group px-2 py-2 hover:text-primary transition-colors"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-xl p-2 rounded hover:bg-gray-800 transition-colors"
          onClick={() => {
            setNavOpen(!navOpen);
            setActiveDropdown(null);
          }}
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Right Corner Menu */}
      {navOpen && (
        <div className="md:hidden fixed top-16 right-0 z-40 animate-slideDown">
          <div className="bg-dark w-64 rounded-l-lg shadow-lg py-4 border-l border-gray-800">
            <nav className="flex flex-col px-6">
              {links.map((link, index) => (
                <div key={link.name} className="border-b border-gray-800">
                  {link.subLinks ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full py-3 hover:text-primary transition-colors"
                        onClick={() => toggleDropdown(index)}
                      >
                        {link.name}
                        <FaChevronDown
                          className={`text-xs transition-transform duration-200 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === index && (
                        <div className="text-right pr-2 pb-2">
                          {link.subLinks.map((subLink) => (
                            <a
                              key={subLink.name}
                              href={subLink.href}
                              className="block py-2 hover:text-primary transition-colors"
                              onClick={() => setNavOpen(false)}
                            >
                              {subLink.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={link.href}
                      className="block py-3 hover:text-primary transition-colors"
                      onClick={() => setNavOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}