import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ChatbotPage.css';

const fruits = [
  { name: 'Apple', image: 'https://hips.hearstapps.com/hmg-prod/images/apples-at-farmers-market-royalty-free-image-1627321463.jpg' },
  { name: 'Banana', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuOmgr-zA0mnfsWY54K8UK4Ndhh2MP1ZGvXg&s' },
  { name: 'Orange', image: 'https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg' },
  { name: 'Grape', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAue1qW16o7ojB1PFL0IiQ7B9NbYwZta81Pw&s' },
  { name: 'Strawberry', image: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/15/22/2048x2048/square-1432664914-strawberry-facts1.jpg?resize=1200:*' },
];

const getChatbotResponse = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowercaseMessage = message.toLowerCase();
  if (lowercaseMessage.includes('apple')) {
    return "Apples are rich in fiber and antioxidants. They come in various colors and are great for snacking or baking.";
  } else if (lowercaseMessage.includes('banana')) {
    return "Bananas are high in potassium and provide quick energy. They're perfect for smoothies or as a pre-workout snack.";
  } else if (lowercaseMessage.includes('orange')) {
    return "Oranges are packed with vitamin C and have a refreshing taste. They're commonly used for juicing or eaten as a whole fruit.";
  } else if (lowercaseMessage.includes('grape')) {
    return "Grapes come in various colors and are rich in antioxidants. They're great for snacking or making wine.";
  } else if (lowercaseMessage.includes('strawberry')) {
    return "Strawberries are low in calories but high in vitamin C and fiber. They're delicious on their own or in desserts.";
  } else {
    return "I'm sorry, I don't have information about that fruit. Can you ask me about apples, bananas, oranges, grapes, or strawberries?";
  }
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await getChatbotResponse(message);
      const botMessage = { text: response, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleFruitClick = (fruitName) => {
    handleSendMessage(`Tell me about ${fruitName}`);
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Fruit.ai Chatbot</h1>
      <div className="fruit-grid">
        {fruits.map((fruit, index) => (
          <div key={index} className="fruit-card" onClick={() => handleFruitClick(fruit.name)}>
            <img src={fruit.image} alt={fruit.name} className="fruit-image" />
            <p className="fruit-name">{fruit.name}</p>
          </div>
        ))}
      </div>
      <div className="chatbot-card">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isTyping && <div className="message bot typing">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }} className="chat-input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about a fruit..."
            className="chat-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
      <Link to="/home" className="btn back-link">
        Back to Home
      </Link>
    </div>
  );
}