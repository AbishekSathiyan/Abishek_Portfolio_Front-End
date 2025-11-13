import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light text-dark px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}