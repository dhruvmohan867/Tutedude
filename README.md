<div align="center">
  <h1>🚀 Proximity Space</h1>
  <p>A high-performance, real-time multiplayer 2D proximity chat application.</p>

  <img src="./assets/demo.gif" alt="Application Recording" width="800" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" />
  <br /><br />
  <img src="./assets/demo.png" alt="Application Screenshot" width="800" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" />
</div>

---

## 🌟 Overview

**Proximity Space** enables users to move freely in a shared 2D environment and interact based on spatial proximity. Communication dynamically activates when users are near and disconnects when they move apart.

---

## ✨ Core Features

### 1. Real-Time 2D Environment
- Built using **React** and **PixiJS** for smooth 60 FPS rendering.
- Users represented as animated glowing orbs.
- Movement via **W, A, S, D** controls.

---

### 2. Proximity-Based Interaction Engine
- Real-time position tracking using **Socket.IO**.
- Distance-based connection logic.
- Visual indicators:
  - Radar rings (interaction range)
  - Connection beams (active links)

---

### 3. Intelligent Chat System
- Chat auto-enables when users are within range.
- Chat auto-disables when users move away.
- Uses Socket.IO rooms for dynamic communication.

---

### 4. Modern UI/UX
- Glassmorphism UI using `backdrop-filter`.
- Space-themed gradients and effects.
- Auto-generated sci-fi usernames.
- Clean, minimal interface.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- PixiJS (`@pixi/react`)
- CSS (Custom + Glassmorphism)

### Backend
- Node.js
- Express.js
- Socket.IO

---

## ⚙️ System Architecture

- **Client** → Handles rendering, movement, UI
- **Server** → Manages users, positions, connections
- **Socket.IO** → Real-time communication
- **In-memory state** → Fast performance without DB

---

## ⚖️ Architectural Justifications (Alternatives Used)

As per the project guidelines, alternatives to the recommended stack can be used if justified. Below are the architectural decisions made:

### 1. In-Memory State vs. MongoDB
The recommended stack suggested MongoDB for user/session storage. However, an **In-Memory State** pattern was chosen for this specific proximity chat application:
- **Nature of the App**: Users are anonymous and their connections are purely transient. Storing real-time coordinates (x/y) in an SSD/Disk-based database like MongoDB creates unnecessary latency and I/O bottlenecks.
- **Performance**: Maintaining `socket.id` hashes dynamically in Node.js memory ensures `O(1)` sub-millisecond lookup speeds, which is absolutely critical for calculating geometry distances across all users 60 times a second.

### 2. Custom CSS & Glassmorphism vs. Tailwind CSS
Tailwind CSS was suggested, but **Vanilla CSS with CSS Variables** was utilized instead:
- **Aesthetics & Glassmorphism**: Achieving the highly specific, customized "Frost Glass" (`backdrop-filter`) and deep-space radial gradients required granular CSS control.
- **Clean JSX**: By using standard BEM-oriented classes, the `react` component markup remains significantly cleaner and easier to read without utility-class bloat.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

---

### 1. Start Backend
```bash
cd server
npm install
npm start
