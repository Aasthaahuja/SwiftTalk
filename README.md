# 💬 SwiftTalk — Real-Time Chat Application

![SwiftTalk Banner](https://img.shields.io/badge/SwiftTalk-Live-brightgreen?style=for-the-badge)
![MERN](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-black?style=for-the-badge)
![Deployed](https://img.shields.io/badge/Deployed-Render-purple?style=for-the-badge)

> A modern real-time chat application built with the MERN stack and Socket.io. Chat instantly, see who's online, and enjoy a seamless messaging experience.

🔗 **Live Demo:** [https://swifttalk-backend-5igr.onrender.com](https://swifttalk-backend-5igr.onrender.com)

---

## ✨ Features

- 🔐 **User Authentication** — Secure register & login with JWT cookies
- ⚡ **Real-Time Messaging** — Instant message delivery via Socket.io
- 🟢 **Online/Offline Status** — See who's currently active
- ✏️ **Typing Indicator** — Animated dots when someone is typing
- ✓✓ **Seen/Delivered Ticks** — Know when your message is read
- 🔍 **User Search** — Find and chat with any registered user
- 🎨 **Modern UI** — Clean dark sidebar with indigo gradient design
- 📱 **Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI Framework |
| Socket.io-client | Real-time communication |
| Axios | HTTP requests |
| React Router DOM | Client-side routing |
| Tailwind CSS + DaisyUI | Styling |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| Socket.io | WebSocket server |
| JWT | Authentication |
| bcryptjs | Password hashing |
| cookie-parser | Cookie management |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/Aasthaahuja/SwiftTalk.git
cd SwiftTalk
```

### 2. Set up environment variables
Create a `.env` file in the root directory:
```env
MONGODB_CONNECT=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
SECURE=development
```

### 3. Install dependencies & run
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Run backend (from root)
npm run dev

# Run frontend (in a new terminal)
cd frontend && npm run dev
```

Backend runs on `http://localhost:3000`  
Frontend runs on `http://localhost:5173`

---

## 📁 Project Structure

```
SwiftTalk/
├── backend/
│   ├── DB/              # Database connection
│   ├── middleware/      # Auth middleware
│   ├── Models/          # Mongoose schemas
│   ├── rout/            # Express routes
│   ├── routControllers/ # Route handlers
│   ├── utils/           # JWT utility
│   └── index.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context (Auth, Socket)
│   │   ├── hooks/       # Custom hooks
│   │   └── pages/       # Login, Register, Home
│   └── index.html
└── package.json
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/message/send/:id` | Send a message |
| GET | `/api/message/:id` | Get conversation messages |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/search?search=` | Search users |
| GET | `/api/user/currentchatters` | Get recent chats |

---

## 🌐 Deployment

This app is deployed on **Render**:
- Backend + Frontend served from: `https://swifttalk-backend-5igr.onrender.com`
- Database: MongoDB Atlas

---

## 👩‍💻 Author

**Aastha Ahuja**  
🔗 [GitHub](https://github.com/Aasthaahuja)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
