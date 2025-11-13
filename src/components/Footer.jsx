export default function Footer() {
  return (
    <footer className="bg-gray-900 text-light py-8">
      <div className="container mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} Abishek S All rights reserved.</p>
      </div>
    </footer>
  );
}