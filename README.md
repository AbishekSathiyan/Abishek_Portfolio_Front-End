## 🏥 Healthcare Management System — Client (Frontend)

### 🌐 Overview

This is the **frontend (React + Tailwind CSS)** of the **Healthcare Management System**, a digital platform for doctors and patients to manage appointments, online consultations, and health records efficiently.

---

### ⚙️ Tech Stack

| Layer                | Technology                | Purpose                              |
| -------------------- | ------------------------- | ------------------------------------ |
| **Frontend**         | React.js + Vite           | Build fast, modern UI                |
| **Styling**          | Tailwind CSS              | Responsive and clean design          |
| **State Management** | React Hooks / Context API | Manage user sessions and app state   |
| **Real-time**        | Socket.IO                 | Live consultations, chat             |
| **Notifications**    | Twilio API                | Appointment reminders via SMS        |
| **File Storage**     | Cloudinary                | Upload prescriptions & reports       |
| **Payments**         | Razorpay                  | Secure online payments               |
| **AI Assistant**     | OpenAI API                | Smart health suggestions             |
| **Auth**             | Firebase + JWT            | Secure login and persistent sessions |

---

### 📁 Folder Structure

```
client/
│
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Main pages (Login, Dashboard, etc.)
│   ├── assets/          # Images and static files
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
│
├── public/
│   └── vite.svg         # Public assets
│
├── tailwind.config.js   # Tailwind setup
└── package.json         # Project dependencies
```

---

### 🧑‍💻 Installation & Setup

```bash
# Move to client folder
cd client

# Install dependencies
npm install

# Run the app
npm run dev
```

App will be available at 👉 [http://localhost:5173](http://localhost:5173)

---

### 🚀 Features

- Patient registration & doctor profiles
- Online consultation & real-time chat
- AI health assistant (OpenAI API)
- Appointment reminders (Twilio API)
- File upload for prescriptions/reports (Cloudinary)
- Secure payment integration (Razorpay)
- Admin dashboard with analytics

---

### 📸 Screenshots

