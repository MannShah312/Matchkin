# 💬 Matchkin — Smart Chat & Collaboration Platform

Welcome to **Matchkin**, a powerful full-stack real-time communication platform that connects clients with consultants, powered by **Socket.IO**, **MongoDB Atlas**, **Redis Cloud**, and **Google OAuth**.

---

## 🚀 Tech Stack

**Frontend:**
- ⚛️ React.js (with TailwindCSS & CRACO)
- 🌐 Deployed on [Vercel](https://vercel.com/)
- 🔐 Google Sign-In via OAuth 2.0
- 🔌 Socket.IO Client for real-time communication

**Backend:**
- 🧠 Node.js + Express.js
- 🌍 MongoDB Atlas (NoSQL database)
- ⚡ Redis Cloud (Pub/Sub & session management)
- 🧩 JWT Authentication + OTP Verification
- 🧵 Socket.IO Server for real-time messaging
- 🚀 Deployed on [Render](https://render.com/)

---

## ✨ Features

- 🔐 Secure Signup/Login with OTP verification and Google Auth
- 📱 Role-based dashboards (Client / Consultant)
- 💬 Real-time 1-on-1 and Group Chat
- 🧠 Consultant Skill & Project Matching
- 🧾 Dynamic profile management
- 🔁 Socket.IO-powered instant messaging
- 📡 REST APIs for full backend operations
- ☁️ Redis Pub/Sub for scalable real-time features

---

🧠 Important Concepts
---------------------

### 🔐 Auth Flow

-   Signup/Login → OTP via backend (Redis stores OTP temporarily)

-   Verified → JWT token returned and stored in cookies

-   JWT used in every subsequent authenticated request

### 💬 Real-time Messaging

-   Users connect via Socket.IO on login

-   Rooms are created dynamically per chat ID

-   Messages are instantly updated in frontend and saved to DB

### 🧠 Role-Based Dashboard

-   Clients see consultants and project options

-   Consultants see recent clients, messages, and profile

---
## 🔧 Project Structure

Matchkin/

├── backend/ # Express backend (Node.js)

│ ├── controllers/ # Logic for auth, chat, messages, profile

│ ├── models/ # Mongoose schemas: User, Chat, Message

│ ├── routes/ # API endpoints (auth, chat, user, profile)

│ ├── sockets/ # Socket.IO event handling

│ ├── utils/ # OTP service, Google Auth, JWT utils

│ ├── config/ # Redis and DB configuration

│ └── index.js # Server entry point

│

├── frontend/ # React.js frontend (CRACO + TailwindCSS)

│ ├── routes/ # Pages: Login, Signup, Profile, Chat, etc.

│ ├── components/ # Reusable UI (ChatBox, Sidebar, TextInput)

│ ├── assets/ # Lottie animations, logos

│ ├── utils/ # API request helpers (serverHelpers.js)

│ ├── App.js # Main routing + layout logic

│ ├── index.js # React entry point

│ └── .env # Environment variables (Vercel)

│

├── .gitignore

├── README.md # Project documentation 📘

└── package.json # Root config (if monorepo style)
--

☁️ Deployment Notes
-------------------

### Frontend

-   Hosted on **Vercel**

-   Environment variables set via Vercel dashboard

### Backend

-   Hosted on **Render / Railway / EC2 / Docker**

-   Set `.env` securely via deployment dashboard

* * * * *

📸 Screenshots (Optional)
-------------------------

You can add screenshots of:

-   Login/Signup with animation

-   Consultant & Client dashboards

-   Real-time chat with WebSocket console logs

* * * * *

🧑‍💻 Author
------------

**Mann Shah**\
🔗 [GitHub](https://github.com/MannShah312)\
📬 Contact available upon request

* * * * *

⭐️ Show Your Support
--------------------

If you like this project, consider giving it a ⭐ on [GitHub](https://github.com/MannShah312/Matchkin)!

