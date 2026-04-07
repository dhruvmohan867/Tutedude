import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ socket, canChat, myId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleChat = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on('chat_message', handleChat);
    return () => socket.off('chat_message', handleChat);
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && canChat) {
      socket.emit('chat_message', input.trim());
      setInput('');
    }
  };

  return (
    <div className={`glass-panel chat-container ${canChat ? 'half-screen' : 'minimized'}`}>
      <div className={`chat-header ${canChat ? 'active' : 'disabled'}`}>
        {canChat ? (
          <span>Comms Link Active</span>
        ) : (
          <span className="minimized-text">🔌 SIGNAL LOST - MOVE CLOSER 🔌</span>
        )}
      </div>
      
      <div className="chat-content">
        <div className="chat-history">
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === myId;
            return (
              <div key={idx} className={`message-wrapper ${isMe ? 'me' : 'other'}`}>
                <div className="message-meta">
                  {isMe ? 'You' : msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <form onSubmit={sendMessage} className="chat-form">
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)}
              disabled={!canChat}
              placeholder={canChat ? 'Transmit message...' : 'Connection severed...'}
              className="chat-input"
            />
            <button 
              type="submit" 
              disabled={!canChat || !input.trim()}
              className="chat-send-btn"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
