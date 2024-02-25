import React, { useState, useEffect } from 'react';

const Chat = ({ selectedText }) => {
  // State to store the input value
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessage] = useState([]);

  // Handler function to update state based on user input
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    setMessage([...messages, inputValue]);
    setInputValue(''); // Clear the input field after sending
  };

  // Handle "Enter" key in the input field to send message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (selectedText) {
      setMessage([...messages, selectedText]);
    }
  }, [selectedText]); // This effect depends on changes to selectedText

  return (
    <div className="chat h-full flex flex-col">
      <div className="overflow-y-auto flex-grow">
        {messages.map((message, index) => (
          <div key={index} className="message p-2 bg-gray-100 my-1 rounded-lg">
            {message}
          </div>
        ))}
      </div>
      <div className="chat_input p-2 flex justify-between border-t border-gray-300">
        <input
          type="text"
          value={inputValue} // Bind the input value to the component's state
          onChange={handleChange} // Update state when the input changes
          onKeyPress={handleKeyPress}
          placeholder="Type something..."
          className="w-full py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md focus:outline-none"
        >
          ✈️
        </button>
      </div>
    </div>
  );
};

export default Chat;
