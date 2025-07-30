import { GraduationCap, FileBadge, Briefcase } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Banner from "./assets/Banner.png";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-light text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 sm:mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 sm:gap-12">
          {/* Profile Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-xl overflow-hidden shadow-lg">
              <img
                src={Banner}
                alt="Abishek S"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="w-full lg:w-2/3">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="mb-4 text-sm sm:text-base leading-relaxed">
              I'm a passionate frontend developer with 3 years of experience building responsive and user-friendly web applications. I specialize in React, JavaScript, and modern CSS frameworks.
            </p>
            <p className="mb-6 text-sm sm:text-base leading-relaxed">
              My approach combines technical expertise with an eye for design to create seamless digital experiences that users love.
            </p>

            {/* Personal Info Table */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full text-sm sm:text-base text-left table-auto border-collapse">
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
                        className="text-blue-600 hover:underline break-all"
                      >
                        abishek.sathiyan.2002@gmail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="pr-4 py-2 font-semibold">From</th>
                    <td className="py-2">
                      Methalodai, Ramanathapuram, Tamil Nadu, India
                    </td>
                  </tr>
                  <tr>
                    <th className="pr-4 py-2 font-semibold">Experience</th>
                    <td className="py-2">
                      Fresher with Hands‑on Experience in Real‑World Projects and Modern Web Technologies.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Education Section */}
            <SectionTable
              icon={<GraduationCap className="w-5 h-5 text-primary" />}
              title="Education"
              columns={["Program", "Institution", "Year"]}
              rows={[
                ["MCA – Master of Computer Applications", "Karpagam University", "2023 – 2025"],
                ["BCA – Bachelor of Computer Applications", "Caussanel College of Arts & Science", "2020 – 2023"],
              ]}
            />

            {/* Certifications Section */}
            <SectionTable
              icon={<FileBadge className="w-5 h-5 text-primary" />}
              title="Certifications"
              columns={["Certification", "Issued By"]}
              rows={[
                ["MERN Stack Developer", "Error Makes Clever"],
                ["Mastering Python", "Infosys"],
                ["National Conference on Data Science & Analytics", "TCS iON"],
              ]}
            />

            {/* Internship Section */}
            <SectionTable
              icon={<Briefcase className="w-5 h-5 text-primary" />}
              title="Internships"
              columns={["Role", "Duration", "Technologies", "Company"]}
              rows={[
                [
                  "MERN Stack Intern – Full Stack Projects",
                  "Aug 2024 – Sep 2024",
                  "React.js, Next.js, Tailwind CSS",
                  <a
                    href="https://skillmate.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Skillmate.ai
                  </a>,
                ],
              ]}
            />

            {/* Resume Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <motion.a
                href="/Abishek_S_Resume.pdf"
                download="Abishek_S_Resume.pdf"
                className="inline-flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
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

// Reusable SectionTable component
const SectionTable = ({ icon, title, columns, rows }) => (
  <div className="mb-8">
    <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-3">
      {icon} {title}
    </h3>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm sm:text-base text-left table-auto border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((col, idx) => (
              <th key={idx} className="py-2 pr-4 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, i) => (
                <td key={i} className="py-2 pr-4 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
