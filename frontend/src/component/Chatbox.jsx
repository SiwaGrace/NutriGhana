import React, { useState, useEffect, useRef } from "react";
import picture from "../assets/logo&icons/nutrighanaLogo.svg";

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isEnded, setIsEnded] = useState(false);

  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChatbox = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (inputText.trim() === "" || isEnded) return;

    if (["bye", "quit", "exit"].includes(inputText.toLowerCase())) {
      setMessages((prev) => [
        ...prev,
        { name: "User", message: inputText },
        {
          name: "Lica",
          message: "Are you sure you want to end the chat? Type 'yes' to confirm.",
        },
      ]);
      setInputText("");
      return;
    }

    if (inputText.toLowerCase() === "yes") {
      setMessages((prev) => [
        ...prev,
        { name: "User", message: inputText },
        { name: "Lica", message: "Chatbot session ended. Goodbye!" },
      ]);
      setInputText("");
      setIsEnded(true);
      return;
    }

    setMessages((prev) => [...prev, { name: "User", message: inputText }]);

    fetch("http://localhost:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message: inputText }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.reply) {
          setMessages((prev) => [...prev, { name: "Lica", message: data.reply }]);
        }
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          { name: "Lica", message: "Sorry, I couldn't process that request." },
        ]);
      });

    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed bottom-8 right-8">
      <div className="relative">
        <div
          className={`flex flex-col bg-gray-100 w-[350px] h-[450px] rounded-t-2xl shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "translate-y-[-40px] z-50 opacity-100" : "z-[-999] opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-red-600 flex items-center justify-center p-4 rounded-t-2xl shadow-md">
            <div className="mr-2">
              <img
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                alt="avatar"
              />
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">Chat support</h4>
              <p className="text-white text-sm">Hi. My name is Lica. Your nutritional assistant</p>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex flex-col overflow-y-scroll max-h-[400px] px-5 mt-auto"
          >
            {messages.map((item, index) => (
              <div
                key={index}
                className={`mt-2 p-2 rounded-t-2xl ${
                  item.name === "Lica"
                    ? "bg-gray-300 rounded-br-2xl mr-auto"
                    : "bg-purple-800 text-white rounded-bl-2xl ml-auto"
                } max-w-[70%] w-fit`}
              >
                {item.message}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-l from-yellow-400 to-red-600 shadow-md rounded-b-lg mt-5">
            <input
              type="text"
              placeholder="Write a message..."
              className="w-4/5 px-4 py-2 rounded-full bg-white border-none focus:outline-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              ref={inputRef}
              disabled={isEnded}
            />
            <button
              className="text-white ml-2"
              onClick={handleSendMessage}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>

        <div className="text-right mt-2">
          <button
            onClick={toggleChatbox}
            className="p-2 bg-white rounded-full shadow-md focus:outline-none"
            aria-label="Toggle chatbox"
          >
            <img src={picture} alt="Chatbox Icon" className="h-12" />
          </button>
        </div>

        {isEnded && (
          <button
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md shadow-md w-full"
            onClick={() => {
              setMessages([]);
              setIsEnded(false);
            }}
          >
            Restart Chat
          </button>
        )}
      </div>
    </div>
  );
}

export default Chatbox;
