const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Store users: socket.id -> { id, x, y, roomId }
const users = {};

const DISTANCE_THRESHOLD = 100;

function calculateDistance(u1, u2) {
  const dx = u1.x - u2.x;
  const dy = u1.y - u2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Group users into connected components based on distance
function updateRooms() {
  const userIds = Object.keys(users);
  const visited = new Set();
  
  let roomIndex = 0;
  
  for (const id of userIds) {
    if (visited.has(id)) continue;
    
    // BFS to find all connected users
    const queue = [id];
    const component = [];
    visited.add(id);
    
    while (queue.length > 0) {
      const current = queue.shift();
      component.push(current);
      
      for (const other of userIds) {
        if (!visited.has(other)) {
          if (calculateDistance(users[current], users[other]) < DISTANCE_THRESHOLD) {
            visited.add(other);
            queue.push(other);
          }
        }
      }
    }
    
    // Assign room appropriately
    // If a user is alone, they aren't close to anyone. (canChat = false)
    // If component.length > 1, they are in a group. (canChat = true)
    const roomId = `room-${roomIndex++}`;
    const canChat = component.length > 1;
    
    for (const memberId of component) {
      const user = users[memberId];
      if (user.roomId !== roomId) {
        // Find socket and update rooms
        const socket = io.sockets.sockets.get(memberId);
        if (socket) {
          if (user.roomId) {
            socket.leave(user.roomId);
          }
          socket.join(roomId);
        }
        user.roomId = roomId;
      }
      
      const socket = io.sockets.sockets.get(memberId);
      if (socket && user.canChat !== canChat) {
        user.canChat = canChat;
        socket.emit('chat_status', { canChat });
      }
    }
  }
}

function generateUsername() {
  const adjs = ['Cosmic', 'Neon', 'Quantum', 'Cyber', 'Astro', 'Galactic', 'Void', 'Hyper'];
  const nouns = ['Voyager', 'Drifter', 'Nomad', 'Ranger', 'Ghost', 'Runner', 'Pilot', 'Spark'];
  const a = adjs[Math.floor(Math.random() * adjs.length)];
  const n = nouns[Math.floor(Math.random() * nouns.length)];
  return `${a} ${n} ${Math.floor(Math.random() * 999)}`;
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Initialize user with a random position between 100 and 700
  users[socket.id] = {
    id: socket.id,
    name: generateUsername(),
    x: Math.random() * 600 + 100,
    y: Math.random() * 600 + 100,
    roomId: null,
    canChat: false
  };
  
  // Send initial state to the newly connected user
  socket.emit('init', { id: socket.id, users });
  
  // Broadcast to others that a new user joined
  socket.broadcast.emit('user_joined', users[socket.id]);
  
  updateRooms();
  
  socket.on('move', (data) => {
    if (users[socket.id]) {
      users[socket.id].x = data.x;
      users[socket.id].y = data.y;
      
      // Broadcast the movement
      io.emit('user_moved', { id: socket.id, x: data.x, y: data.y });
      
      // Update proximity rooms
      updateRooms();
    }
  });
  
  socket.on('chat_message', (msg) => {
    const user = users[socket.id];
    if (user && user.roomId && user.canChat) {
      // Broadcast message to the user's room
      io.to(user.roomId).emit('chat_message', {
        senderId: socket.id,
        senderName: user.name,
        text: msg,
        timestamp: Date.now()
      });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete users[socket.id];
    io.emit('user_left', socket.id);
    updateRooms();
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
