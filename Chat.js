// src/components/Chat/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'

const Chat = ({ currentUserId, friendId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3008/api/messages/${currentUserId}/${friendId}`
        );
        setMessages(response.data); // Set the fetched messages to state
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUserId, friendId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return; // Avoid sending empty messages

    try {
      // Send new message to the backend
      const response = await axios.post('http://localhost:3008/api/messages', {
        senderId: currentUserId,
        receiverId: friendId,
        content: newMessage,
      });

      // Add the new message to the messages state
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((message) => (
            <div key={message._id} className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="send-message-form">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
