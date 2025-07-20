import { GraduationCap, FileBadge, Briefcase } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Banner from "./assets/Banner.png";

export default function About() {
  return (
    <section id="about" className="py-20 bg-light text-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={Banner} 
                alt="Abishek S" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="mb-4">
              I'm a passionate frontend developer with 3 years of experience building responsive and
              user-friendly web applications. I specialize in React, JavaScript, and modern CSS frameworks.
            </p>
            <p className="mb-6">
              My approach combines technical expertise with an eye for design to create seamless digital
              experiences that users love.
            </p>

            {/* Personal Info Table */}
            <table className="w-full text-left table-auto mb-6 border-collapse">
              <tbody className="divide-y divide-gray-300">
                <tr>
                  <th className="pr-4 py-2 font-semibold">Name</th>
                  <td className="py-2">Abishek S</td>
                </tr>
                <tr>
                  <th className="pr-4 py-2 font-semibold">Email</th>
                  <td className="py-2">
                    <a 
                      href="mailto:abishek.sathiyan.2002@gmail.com" 
                      className="text-blue-600 hover:underline"
                    >
                      abishek.sathiyan.2002@gmail.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <th className="pr-4 py-2 font-semibold">From</th>
                  <td className="py-2">Methalodai, Ramanathapuram, TamilNadu, India</td>
                </tr>
                <tr>
                  <th className="pr-4 py-2 font-semibold">Experience</th>
                  <td className="py-2">
                    Fresher with Hands‑on Experience in Real‑World Projects and Modern Web Technologies.
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Education Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-primary" /> Education
              </h3>
              <table className="w-full text-left table-auto border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Program</th>
                    <th className="py-2">Institution</th>
                    <th className="py-2">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  <tr>
                    <td className="py-2">MCA – Master of Computer Applications</td>
                    <td className="py-2">Karpagam University</td>
                    <td className="py-2">2023 – 2025</td>
                  </tr>
                  <tr>
                    <td className="py-2">BCA – Bachelor of Computer Applications</td>
                    <td className="py-2">Caussanel College of Arts & Science</td>
                    <td className="py-2">2020 – 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Certifications Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <FileBadge className="w-5 h-5 text-primary" /> Certifications
              </h3>
              <table className="w-full text-left table-auto border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Certification</th>
                    <th className="py-2">Issued By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  <tr>
                    <td className="py-2">MERN Stack Developer</td>
                    <td className="py-2">Error Makes Clever</td>
                  </tr>
                  <tr>
                    <td className="py-2">Mastering Python</td>
                    <td className="py-2">Infosys</td>
                  </tr>
                  <tr>
                    <td className="py-2">National Conference on Data Science & Analytics</td>
                    <td className="py-2">TCS iON</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Internship Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-primary" /> Internships
              </h3>
              <table className="w-full text-left table-auto border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Role</th>
                    <th className="py-2">Duration</th>
                    <th className="py-2">Technologies</th>
                    <th className="py-2">Company</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  <tr>
                    <td className="py-2">MERN Stack Intern – Full Stack Projects</td>
                    <td className="py-2">Aug 2024 – Sep 2024</td>
                    <td className="py-2">React.js, Next.js, Tailwind CSS</td>
                    <td className="py-2">
                      <a
                        href="https://skillmate.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Skillmate.ai
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Resume Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <motion.a
                href="/Abishek_S_Resume.pdf"
                download="Abishek_S_Resume.pdf"
                className="inline-flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="text-lg" />
                Download Resume
              </motion.a>
              <p className="mt-2 text-sm text-gray-600">
                Includes complete work history, skills, and references
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}