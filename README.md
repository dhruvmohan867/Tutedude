# 🚀 Proximity Space

A high-performance, real-time multiplayer 2D proximity-based chat application that simulates spatial interaction in a virtual environment.

---

## 🌟 Overview

**Proximity Space** enables users to move freely within a shared 2D world and interact with others based on spatial distance. Communication is dynamically established or terminated depending on user proximity, closely mimicking real-world interactions in a digital space.

---

## ✨ Core Features

### 1. Real-Time 2D Environment
- Built using **React** and **PixiJS** for high-performance canvas rendering (~60 FPS).
- Users are represented as animated orbs.
- Smooth movement via **W, A, S, D** controls.

---

### 2. Proximity-Based Interaction Engine
- Real-time position tracking powered by **Socket.IO**.
- Dynamic proximity detection using distance calculations.
- Visual indicators:
  - **Radar Rings** (interaction radius)
  - **Connection Beams** (active links between users)

---

### 3. Intelligent Chat System
- Chat is **automatically enabled** when users enter proximity.
- Chat is **automatically disabled** when users move apart.
- Socket.IO rooms dynamically manage communication channels.

---

### 4. Modern UI/UX Design
- Glassmorphic UI panels using `backdrop-filter`.
- Space-themed gradients and visual effects.
- Dynamic username generation (e.g., *Cosmic Voyager 491*).
- Clean and minimal interface focused on interaction clarity.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **PixiJS (`@pixi/react`)**
- CSS (Glassmorphism + Custom Styling)

### Backend
- **Node.js**
- **Express.js**
- **Socket.IO**

---

## ⚙️ System Architecture

- **Client** handles rendering, movement, and UI interactions.
- **Server** maintains real-time user state (position, connections).
- **Socket.IO** enables bidirectional event-driven communication.
- **In-memory state management** ensures ultra-fast updates without database overhead.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

---

### 1. Start Backend Server
\`\`\`bash
cd server
npm install
npm start
\`\`\`

Server runs on: http://localhost:3001

---

### 2. Start Frontend
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

Frontend runs on: http://localhost:5173

---

### 3. Run Application
- Open multiple browser tabs/windows.
- Navigate using **W, A, S, D**.
- Move close to another user → Chat activates.
- Move away → Chat disconnects.

---

## 🧠 Key Engineering Highlights

- Efficient **geospatial proximity detection** using distance formulas.
- Scalable **real-time event architecture** with Socket.IO.
- Clean separation of **rendering, networking, and logic layers**.
- Optimized for **low latency and smooth user experience**.

---

## 📌 Design Decisions

- **In-memory data storage** chosen for speed and simplicity.
- Avoided database integration to prioritize real-time performance.
- Modular architecture enables easy future extension (e.g., persistence, authentication).

---

## 🚧 Future Improvements

- Add persistent storage (MongoDB / Redis)
- User authentication system
- Voice/video proximity chat
- Custom avatars and environments
- Deployment (Docker + Cloud hosting)

---

## 🎯 Conclusion

Proximity Space demonstrates a strong understanding of:
- Real-time systems
- Event-driven architecture
- Frontend rendering performance
- Spatial interaction design

It is designed not just as a functional system, but as an immersive user experience.
