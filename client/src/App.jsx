import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Viewport from './components/Viewport';
import Chat from './components/Chat';

const SERVER_URL = 'http://localhost:3001';

function App() {
  const [socket, setSocket] = useState(null);
  const [myId, setMyId] = useState(null);
  const [users, setUsers] = useState({});
  const [canChat, setCanChat] = useState(false);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on('init', (data) => {
      setMyId(data.id);
      setUsers(data.users);
    });

    newSocket.on('user_joined', (user) => {
      setUsers((prev) => ({ ...prev, [user.id]: user }));
    });

    newSocket.on('user_left', (id) => {
      setUsers((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    });

    newSocket.on('user_moved', (data) => {
      setUsers((prev) => {
        if (!prev[data.id]) return prev;
        return {
          ...prev,
          [data.id]: { ...prev[data.id], x: data.x, y: data.y }
        };
      });
    });

    newSocket.on('chat_status', (data) => {
      setCanChat(data.canChat);
    });

    return () => newSocket.close();
  }, []);

  if (!socket || !myId) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <h2 style={{ color: '#00d2ff', fontWeight: 300 }}>Connecting to the universe...</h2>
    </div>
  );

  return (
    <div className="app-container">
      <div className="viewport-container">
        <Viewport socket={socket} myId={myId} users={users} />
        
        <div className="glass-panel instruction-overlay">
          <h3>Proximity Space</h3>
          <p>Navigate your <strong>Green Orb</strong> using <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>.</p>
          <p>Find other explorers (Red Orbs) and close the distance.</p>
          <p style={{ marginTop: '10px', fontSize: '0.85rem', color: '#b0c4de' }}>
            Connections manifest when you are within 100 units of each other.
          </p>
        </div>
      </div>
      
      <Chat socket={socket} canChat={canChat} myId={myId} />
    </div>
  );
}

export default App;
