import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { MessageCircle, ArrowLeft, X } from "lucide-react";

const NutriPalChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        text: "I'm a simple demo. In a real app, I'd analyze your question and respond appropriately!",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="px-5 py-3 flex flex-col">
        <div className="flex justify-between items-center">
          <ArrowLeft
            className="w-9 h-9 text-black p-2 bg-white rounded-full cursor-pointer"
            onClick={onClose}
          />
          <X
            className="w-9 h-9 text-black p-2 bg-white rounded-full cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="text-black flex flex-col items-center border-b border-gray-300 gap-1">
          <MessageCircle className="w-9 h-9 text-white p-1 bg-green-600 rounded-full" />
          <h1 className="text-xl font-bold">NutriPal</h1>
          <p className="text-sm opacity-80 pb-2">Your nutrition assistant</p>
        </div>
      </div>

      {/* Chat messages and input area remain the same */}
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg  p-3 ${
                message.sender === "user"
                  ? "bg-green-400 text-white rounded-full rounded-br-none"
                  : "bg-white text-gray-800 rounded-lg rounded-bl-none shadow"
              }`}
            >
              {typeof message.text === "string" ? message.text : message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="p-4 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask NutriPal..."
            className="flex-1 bg-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 my-2 text-center">
          NutriPal can make mistakes, so please verify important information.
        </p>
      </form>
    </div>
  );
};

export default NutriPalChat;
