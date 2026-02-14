export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-teal-500/80 to-green-500 text-white py-3">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} Abishek Sathiyan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
