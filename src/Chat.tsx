import React, { useState, useEffect } from 'react';

const Chat = ({ selectedText }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (selectedText) {
      setMessages([...messages, selectedText]);
    }
  }, [selectedText]);

  return (
    <div className="bg-gray-200 p-4 h-screen overflow-y-scroll">
      {messages.map((message, index) => (
        <div key={index} className="message bg-white p-2 rounded-md shadow-md mb-2">
          {message}
        </div>
      ))}
      <div className="flex items-center mt-4">
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <span role="img" aria-label="send">✈️</span>
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type something..."
          className="ml-4 px-4 py-2 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Chat;
