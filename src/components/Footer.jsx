export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 text-center flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Abishek S. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="#"
            className="hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}