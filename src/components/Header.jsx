import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed w-full bg-dark text-light shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <p className="text-2xl font-bold">
          <span className="text-white">Abishek S</span>{" "}
          <span className="text-primary">Portfolio</span>
        </p>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-xl"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {navOpen && (
        <div className="md:hidden bg-dark py-4">
          <nav className="flex flex-col space-y-4 px-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors py-2"
                onClick={() => setNavOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
