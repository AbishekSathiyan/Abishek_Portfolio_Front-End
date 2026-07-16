// src/data/chatbotData.js

// --------------------------------------------------------------
//  DATA STORE – edit these arrays to add/update content
// --------------------------------------------------------------

const projects = [
  {
    name: "Founder AI",
    description:
      "AI-powered business recommendation platform that helps entrepreneurs choose the perfect free zone for their business. Built with React, Tailwind, and OpenAI integration.",
    tech: "React, OpenAI, Tailwind CSS",
  },
  {
    name: "ChatBot-Aura Mind",
    description:
      "Intelligent AI ChatBot web application providing real‑time conversational responses via external JavaScript API integration (Puter.JS).",
    tech: "React, API, Puter.JS, Tailwind CSS",
  },
  {
    name: "AS Ecommerce",
    description:
      "Full‑stack eCommerce platform with Firebase Authentication, Razorpay payments, admin dashboard, and Nodemailer.",
    tech: "MongoDB, Express, React, Node.js, Firebase, Razorpay, Tailwind",
  },
  {
    name: "Methalodai Village Community",
    description:
      "Instagram‑like community platform for village communication – posts, follows, likes, comments, and media uploads with Cloudinary.",
    tech: "MongoDB, Express, React, Node.js, Firebase, Nodemailer, Cloudinary, Tailwind",
  },
  {
    name: "Campus Lost & Found",
    description:
      "MERN app for reporting and recovering lost items on campus, with image uploads and email notifications.",
    tech: "MongoDB, Express, React, Node.js, Firebase, Nodemailer, Cloudinary, Tailwind",
  },
  {
    name: "Bulk Mail System",
    description:
      "Send personalised bulk emails from Excel sheets using Nodemailer and custom templates.",
    tech: "React, Node.js, Express, Nodemailer, Tailwind",
  },
  {
    name: "FileShare MERN App",
    description:
      "Secure file‑sharing platform with JWT authentication, file preview, and unique sharing links.",
    tech: "MongoDB, Express, React, Node.js, JWT, Multer, Cloudinary, Tailwind",
  },
  {
    name: "Portfolio (MERN)",
    description:
      "Responsive portfolio website with admin‑secured contact form using OTP verification.",
    tech: "React, Node.js, Express, MongoDB, Nodemailer, JWT, Tailwind",
  },
  {
    name: "Weather Dashboard",
    description:
      "Sleek weather app showing real‑time temperature, humidity, and conditions via OpenWeatherMap API.",
    tech: "React, Vite, Tailwind CSS, OpenWeatherMap API",
  },
  {
    name: "Task Manager",
    description:
      "Productivity app with notifications, reminders, dark mode, and localStorage persistence.",
    tech: "React, Tailwind, Material UI, LocalStorage, Notifications API",
  },
  {
    name: "Joke Generator",
    description:
      "Fun interactive app that fetches random jokes from the Chuck Norris API.",
    tech: "React, Tailwind, Chuck Norris API",
  },
];

const internships = [
  {
    company: "Innovation City, Government of Ras Al Khaimah",
    role: "Full Stack Developer Intern",
    period: "Current",
    description:
      "Building modern web applications and contributing to digital transformation initiatives.",
  },
  {
    company: "Skillmate.ai",
    role: "MERN Stack Intern",
    period: "Aug 2024 – Sep 2024",
    description:
      "Worked on full‑stack projects using React.js, Next.js, and Tailwind CSS.",
  },
  {
    company: "Kaashiv Infotech",
    role: "Data Structures & Algorithms Intern",
    period: "April 2025",
    description:
      "Learned and practiced DSA, programming, and algorithm problem‑solving.",
  },
];

const education = [
  {
    degree: "MCA (Master of Computer Applications)",
    school: "Karpagam University, Coimbatore, Tamil Nadu",
    year: "2023 – 2025",
  },
  {
    degree: "BCA (Bachelor of Computer Applications)",
    school: "Caussanel College of Arts & Science, Ramanathapuram, Tamil Nadu",
    year: "2020 – 2023",
  },
];

// --------------------------------------------------------------
//  HELPER FUNCTIONS
// --------------------------------------------------------------

function findProject(query) {
  const q = query.toLowerCase();
  return projects.find(
    (p) => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q),
  );
}

function listAllProjects() {
  return projects
    .map((p, i) => `${i + 1}. **${p.name}** – ${p.tech}`)
    .join("\n");
}

function listAllInternships() {
  return internships
    .map(
      (intern, i) =>
        `${i + 1}. **${intern.company}** – ${intern.role} (${intern.period})\n   ${intern.description}`,
    )
    .join("\n\n");
}

// --------------------------------------------------------------
//  QUICK REPLIES (buttons)
// --------------------------------------------------------------
export const quickReplies = [
  "List all projects",
  "All internships",
  "What are your skills?",
  "Contact details",
  "Education",
];

// --------------------------------------------------------------
//  MAIN RESPONSE LOGIC
// --------------------------------------------------------------
export const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase().trim();

  // ----- 1. SPECIFIC PROJECT BY NAME -----
  const project = findProject(msg);
  if (project) {
    return `**${project.name}**\n${project.description}\n\nTechnologies: ${project.tech}`;
  }

  // ----- 2. LIST ALL PROJECTS -----
  if (
    msg.includes("all project") ||
    msg.includes("list project") ||
    msg.includes("every project") ||
    msg.includes("show project")
  ) {
    return `Here are all my projects:\n\n${listAllProjects()}\n\nAsk me about any specific project for more details!`;
  }

  // ----- 3. GENERIC PROJECT KEYWORD -----
  if (
    msg.includes("project") ||
    msg.includes("portfolio") ||
    msg.includes("build")
  ) {
    return `I've completed ${projects.length} projects. You can ask "list all projects" to see them, or type a project name like "Founder AI" for details.`;
  }

  // ----- 4. ALL INTERNSHIPS -----
  if (
    msg.includes("all intern") ||
    msg.includes("list intern") ||
    msg.includes("every intern") ||
    msg.includes("internship")
  ) {
    return `Here are all my internships:\n\n${listAllInternships()}`;
  }

  // ----- 5. CURRENT INTERNSHIP -----
  if (
    msg.includes("current") ||
    msg.includes("working now") ||
    msg.includes("ras al khaimah") ||
    msg.includes("innovation city")
  ) {
    const current = internships.find((i) => i.period === "Current");
    return `**${current.company}**\nRole: ${current.role}\n${current.description}`;
  }

  // ----- 6. EXPERIENCE / JOB HISTORY -----
  if (
    msg.includes("experience") ||
    msg.includes("job") ||
    msg.includes("work history")
  ) {
    return `I have ${internships.length} professional experiences. You can ask "all internships" for a complete list.`;
  }

  // ----- 7. EDUCATION -----
  if (
    msg.includes("education") ||
    msg.includes("degree") ||
    msg.includes("study") ||
    msg.includes("university")
  ) {
    const eduList = education
      .map((e) => `**${e.degree}** – ${e.school} (${e.year})`)
      .join("\n\n");
    return `My education:\n\n${eduList}`;
  }

  // ----- 8. SKILLS / TECHNOLOGIES -----
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack")) {
    return "I work with the **MERN stack** (MongoDB, Express, React, Node.js) and **Tailwind CSS**. I also use Firebase, Razorpay, Cloudinary, JWT, and AI tools like ChatGPT, Claude, and GitHub Copilot.";
  }

  // ----- 9. CONTACT (with clickable links, now includes WhatsApp) -----
  if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("phone") ||
    msg.includes("reach")
  ) {
    return "Email: abishek.sathiyan.2002@gmail.com\nLinkedIn: https://linkedin.com/in/abishek04\nGitHub: https://github.com/AbishekSathiyan\nPhone: +91 7092085864\nWhatsApp: https://wa.me/917092085864\nOr use the contact form on this site!";
  }

  // ----- 10. LOCATION -----
  if (
    msg.includes("location") ||
    msg.includes("where") ||
    msg.includes("based")
  ) {
    return "I'm currently based in **Al Ain, UAE**. Originally from Tamil Nadu, India.";
  }

  // ----- 11. GREETINGS -----
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! How can I help you today?";
  }

  // ----- 12. HOBBIES -----
  if (
    msg.includes("hobby") ||
    msg.includes("free time") ||
    msg.includes("interests")
  ) {
    return "Beyond coding, I enjoy exploring new AI tools, photography, and watching tech documentaries.";
  }

  // ----- FALLBACK -----
  return "I'm not sure about that. You can ask about my **projects**, **internships**, **education**, **skills**, or **contact details**.";
};
