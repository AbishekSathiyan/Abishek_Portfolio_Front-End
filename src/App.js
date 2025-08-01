import { Routes, Route } from "react-router-dom";
import Seo from "./Seo";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";
import NotFound from "./components/NotFound"; // 👈 Import

function HomePage() {
  return (
    <div className="font-sans">
      <Seo
        title="Abishek S | MERN Stack Developer"
        description="Showcasing my projects, skills, and experience as a full-stack React developer."
        url="https://abishek-portfolio-front-end.vercel.app/"
        image="https://abishek-portfolio-front-end.vercel.app/images/social-preview.jpg"
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} /> {/* 👈 Catch-all */}
    </Routes>
  );
}

export default App;
