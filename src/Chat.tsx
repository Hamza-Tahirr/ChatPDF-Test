import { useState, useEffect, type ChangeEvent, type KeyboardEvent } from 'react';

type ChatProps = {
  selectedText: string;
};

const Chat = ({ selectedText }: ChatProps) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages((prev) => [...prev, text]);
    setInputValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (selectedText) {
      setMessages((prev) => [...prev, selectedText]);
    }
  }, [selectedText]);

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
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type something..."
          className="w-full py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
