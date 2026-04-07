<div align="center">
  <h1>🚀 Proximity Space</h1>
  <p>A beautiful, fully real-time multiplayer 2D proximity chat application.</p>

  <img src="./assets/demo.webp" alt="Application Recording" width="800" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" />
  <br /><br />
  <img src="./assets/demo.png" alt="Application Screenshot" width="800" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" />
</div>

<br />

## 🌟 Core Features

1. **Real-Time 2D World**
  - Built with **React** + **PixiJS** for buttery smooth 60fps canvas rendering.
  - Users are represented as glowing orbs and can navigate freely via `W A S D` keyboard traversal.
2. **Proximity-Gated Connections**
  - **Socket.IO** server tracks geospatial data and mathematically groups users.
  - Dynamic **Radar Rings** visually project your 100-unit connection range.
  - When users overlap ranges, glowing laser **Connection Beams** physically link the avatars across the screen.
3. **Smart Chat Mechanics**
  - Chat access is cleanly governed by physical distance.
  - Connecting automatically opens socket.IO chat channels, lighting up the Glassmorphic UI to "Active". Moving away instantly severs communication!
4. **Premium Aesthetics**
  - Custom deep space linear gradients and frosted `backdrop-filter` glass panels.
  - Bubble-based messaging architecture with randomized Sci-Fi Usernames (e.g., "Cosmic Voyager 491") generated on spawn.


## 🛠️ Technology Stack
* **Frontend**: React (Vite), PixiJS (`@pixi/react`), Vanilla CSS Variables (Glassmorphism).
* **Backend**: Node.js, Express, Socket.IO.


## 🚀 Getting Started

### Prerequisites
* Node.js (v16+)
* npm

### 1. Initialize the Backend
```bash
cd server
npm install
npm start
```
*The Socket.IO server will start securely on port `3001`.*

### 2. Initialize the Frontend
*In a new terminal window:*
```bash
cd client
npm install
npm run dev
```
*Your frontend will launch on `localhost:5173`.*

### 3. Test It Out
Open up two different browser windows to `http://localhost:5173`. Move them closer using W,A,S,D and watch the magic happen!


## 📝 Project Details
Engineered specifically to solve complex geospatial routing over sockets whilst providing a stunning presentation layer. No databases are required; all temporary state manages itself elegantly in-memory!
