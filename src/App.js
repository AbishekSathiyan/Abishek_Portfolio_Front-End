import Seo from "./Seo";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
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

export default App;
