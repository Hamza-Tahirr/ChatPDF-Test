import React, { useState,useEffect } from 'react';
import './PdfViewer.css'

const Chat = ({selectedText}) => {
    // State to store the input value
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessage] = useState([]);

  // Handler function to update state based on user input
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    setMessage([...messages,inputValue])
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
      setMessage([...messages,selectedText]);
    }
  }, [selectedText]); // This effect depends on changes to selectedText

  return (
    <div className="chat">

    {
        messages.map((message) => (
            <div className="messages">
                {message}
            </div>
      ))
    }
      <div className='chat_input'>
      <button onClick={handleSendMessage}>
            <center><span>✈️</span></center>
        </button>
        <input

            type="text"
            value={inputValue} // Bind the input value to the component's state
            onChange={handleChange} // Update state when the input changes
            onKeyPress={handleKeyPress}
            placeholder="Type something..."
        />
        
      </div>
    </div>
  );
};

export default Chat;
