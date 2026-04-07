import React, { useEffect, useState, useRef } from 'react';
import { Stage, Graphics, Text } from '@pixi/react';

const Connections = ({ users, myId }) => {
  const drawLines = React.useCallback((g) => {
    g.clear();
    const myUser = users[myId];
    if (!myUser) return;

    // Pulse radar ring around me
    g.lineStyle(2, 0x00d2ff, 0.15);
    g.beginFill(0x00d2ff, 0.03);
    g.drawCircle(myUser.x, myUser.y, 100);
    g.endFill();

    // Draw laser lines to all connected users
    g.lineStyle(2, 0x00ffcc, 0.7);
    Object.values(users).forEach(u => {
      if (u.id !== myId) {
        const dx = u.x - myUser.x;
        const dy = u.y - myUser.y;
        if (Math.sqrt(dx*dx + dy*dy) < 100) {
          g.moveTo(myUser.x, myUser.y);
          g.lineTo(u.x, u.y);
        }
      }
    });
  }, [users, myId]);

  return <Graphics draw={drawLines} />;
};

const SPEED = 10;

const Viewport = ({ socket, myId, users, setUsers }) => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth - 350, height: window.innerHeight });
  const usersRef = useRef(users);

  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth - 350, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const keys = { w: false, a: false, s: false, d: false };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) keys[key] = true;
    };
    
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) keys[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId;

    const gameLoop = () => {
      const currentUsers = usersRef.current;
      if (myId && currentUsers[myId]) {
        const myUser = currentUsers[myId];
        let dx = 0; let dy = 0;
        if (keys.w) dy -= SPEED;
        if (keys.s) dy += SPEED;
        if (keys.a) dx -= SPEED;
        if (keys.d) dx += SPEED;

        if (dx !== 0 || dy !== 0) {
          const newX = myUser.x + dx;
          const newY = myUser.y + dy;
          socket.emit('move', { x: newX, y: newY });
          
          if (setUsers) {
            setUsers(prev => ({
              ...prev,
              [myId]: { ...prev[myId], x: newX, y: newY }
            }));
          }
        }
      }
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [socket, myId]);

  const drawCircle = React.useCallback((isMe) => (g) => {
    g.clear();
    // Premium glow effect for me vs other
    g.lineStyle(2, 0xffffff, 0.5);
    g.beginFill(isMe ? 0x00d2ff : 0xff4b2b, 0.9);
    g.drawCircle(0, 0, 20);
    g.endFill();
  }, []);

  return (
    <Stage 
      width={windowSize.width} 
      height={windowSize.height} 
      options={{ backgroundAlpha: 0, antialias: true, resolution: window.devicePixelRatio || 1 }}
    >
      <Connections users={users} myId={myId} />
      
      {Object.values(users).map((user) => (
        <React.Fragment key={user.id}>
          <Graphics
            draw={drawCircle(user.id === myId)}
            x={user.x}
            y={user.y}
          />
          <Text
            text={user.id === myId ? 'You' : user.name}
            x={user.x - 20}
            y={user.y - 38}
            style={{ fontSize: 13, fill: 0xffffff, fontWeight: '800', dropShadow: true, dropShadowColor: '#000000', dropShadowDistance: 2, dropShadowAlpha: 0.5, fontFamily: 'Inter' }}
          />
        </React.Fragment>
      ))}
    </Stage>
  );
};

export default Viewport;
