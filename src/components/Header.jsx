import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Mine from "./assets/Mine.jpeg";

/* =========================================================
   NAVIGATION LINKS
   Keep this outside the component so it remains stable.
========================================================= */

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  /* =======================================================
     DROPDOWN
  ======================================================= */

  const toggleDropdown = (index) => {
    setActiveDropdown((current) =>
      current === index ? null : index
    );
  };

  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const handleNavClick = (e, href) => {
    e.preventDefault();

    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      const offset = 80;

      const bodyRect =
        document.body.getBoundingClientRect().top;

      const elementRect =
        element.getBoundingClientRect().top;

      const elementPosition =
        elementRect - bodyRect;

      const offsetPosition =
        elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(id);
    }
  };

  /* =======================================================
     HIGHLIGHT NAVIGATION ON SCROLL
     
     FIX:
     `links` is now outside the component, so the dependency
     array can safely remain empty.
  ======================================================= */

  useEffect(() => {
    const sections = links
      .map((link) =>
        document.getElementById(
          link.href.replace("#", "")
        )
      )
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });

      observer.disconnect();
    };
  }, []);

  /* =======================================================
     RESPONSIVE NAVIGATION
  ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <header
      className="
        fixed
        z-50
        w-full
        bg-white/90
        text-gray-800
        shadow-md
        backdrop-blur-sm
      "
    >
      <div
        className="
          container
          mx-auto
          flex
          items-center
          justify-between
          px-6
          py-3
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="flex items-center gap-3">
          <motion.img
            src={Mine}
            alt="Abishek Sathiyan"
            className="
              h-10
              w-10
              rounded-full
              border-2
              border-blue-400
              object-cover
              shadow-md
              md:h-12
              md:w-12
            "
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          />

          <motion.p
            className="
              flex
              cursor-pointer
              flex-wrap
              items-center
              gap-1
              text-xl
              font-bold
              md:text-2xl
            "
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <motion.span
              className="
                inline-block
                bg-gradient-to-r
                from-blue-400
                via-green-400
                to-blue-500
                bg-clip-text
                text-transparent
              "
              style={{
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Abishek Sathiyan
            </motion.span>

            <motion.span
              className="
                inline-block
                bg-gradient-to-r
                from-blue-400
                to-green-500
                bg-clip-text
                text-transparent
              "
              style={{
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
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
        </div>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center space-x-6 md:flex">
          {links.map((link, index) => {
            const sectionId =
              link.href.replace("#", "");

            const isActive =
              activeSection === sectionId;

            return (
              <div
                key={link.name}
                className="group relative"
              >
                {link.subLinks ? (
                  <>
                    <button
                      type="button"
                      className={`
                        flex
                        items-center
                        px-2
                        py-2
                        transition-colors
                        ${
                          isActive
                            ? "text-green-500"
                            : "hover:text-green-500"
                        }
                      `}
                      onClick={() =>
                        toggleDropdown(index)
                      }
                      onMouseEnter={() =>
                        setActiveDropdown(index)
                      }
                      onMouseLeave={() =>
                        setActiveDropdown(null)
                      }
                    >
                      {link.name}

                      <FaChevronDown
                        className={`
                          ml-1
                          text-xs
                          transition-transform
                          duration-200
                          ${
                            activeDropdown === index
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    </button>

                    {activeDropdown === index && (
                      <div
                        className="
                          absolute
                          right-0
                          z-50
                          mt-2
                          w-48
                          animate-slideDown
                          rounded-md
                          border
                          border-gray-200
                          bg-white/95
                          py-1
                          shadow-lg
                          backdrop-blur-sm
                        "
                        onMouseLeave={() =>
                          setActiveDropdown(null)
                        }
                      >
                        {link.subLinks.map(
                          (subLink) => (
                            <a
                              key={subLink.name}
                              href={subLink.href}
                              className="
                                block
                                px-4
                                py-2
                                text-gray-700
                                transition-colors
                                hover:bg-green-50
                                hover:text-green-500
                              "
                            >
                              {subLink.name}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) =>
                      handleNavClick(
                        e,
                        link.href
                      )
                    }
                    className={`
                      group
                      relative
                      px-2
                      py-2
                      transition-colors
                      ${
                        isActive
                          ? "font-semibold text-green-600"
                          : "hover:text-green-500"
                      }
                    `}
                  >
                    {link.name}

                    {/* Underline */}
                    <span
                      className={`
                        absolute
                        bottom-0
                        left-0
                        h-0.5
                        bg-gradient-to-r
                        from-blue-400
                        to-green-500
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }
                      `}
                    />
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          aria-label={
            navOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          className="
            rounded
            p-2
            text-xl
            transition-colors
            hover:bg-gray-100
            md:hidden
          "
          onClick={() => {
            setNavOpen((current) => !current);
            setActiveDropdown(null);
          }}
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ===================================================
          MOBILE MENU
      =================================================== */}

      {navOpen && (
        <div
          className="
            fixed
            right-0
            top-16
            z-40
            animate-slideDown
            md:hidden
          "
        >
          <div
            className="
              w-64
              rounded-l-lg
              border-l
              border-gray-200
              bg-white
              py-4
              text-gray-800
              shadow-lg
            "
          >
            <nav className="flex flex-col px-6">
              {links.map((link, index) => {
                const sectionId =
                  link.href.replace("#", "");

                const isActive =
                  activeSection === sectionId;

                return (
                  <div
                    key={link.name}
                    className="border-b border-gray-200"
                  >
                    {link.subLinks ? (
                      <>
                        <button
                          type="button"
                          className={`
                            flex
                            w-full
                            items-center
                            justify-between
                            py-3
                            transition-colors
                            ${
                              isActive
                                ? "font-semibold text-green-500"
                                : "hover:text-green-500"
                            }
                          `}
                          onClick={() =>
                            toggleDropdown(index)
                          }
                        >
                          {link.name}

                          <FaChevronDown
                            className={`
                              text-xs
                              transition-transform
                              duration-200
                              ${
                                activeDropdown ===
                                index
                                  ? "rotate-180"
                                  : ""
                              }
                            `}
                          />
                        </button>

                        {activeDropdown === index && (
                          <div className="pb-2 pr-2 text-right">
                            {link.subLinks.map(
                              (subLink) => (
                                <a
                                  key={subLink.name}
                                  href={subLink.href}
                                  className="
                                    block
                                    py-2
                                    transition-colors
                                    hover:text-green-500
                                  "
                                  onClick={() =>
                                    setNavOpen(false)
                                  }
                                >
                                  {subLink.name}
                                </a>
                              )
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          handleNavClick(
                            e,
                            link.href
                          );
                          setNavOpen(false);
                        }}
                        className={`
                          block
                          py-3
                          transition-colors
                          ${
                            isActive
                              ? "border-l-4 border-green-500 pl-2 font-semibold text-green-600"
                              : "hover:text-green-500"
                          }
                        `}
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}