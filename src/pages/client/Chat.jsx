import React, { useState, useEffect, useRef } from "react";
import arrowBtn from "../../assets/arrow-button/light.png";
import "./chat.css";

export default function Chat({ messages: initialMessages, onSend }) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  const LINE_HEIGHT = 20;
  const MAX_LINES = 5;

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => setMessages(initialMessages), [initialMessages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset height
      const maxHeight = MAX_LINES * LINE_HEIGHT;
      // only adjust height within max lines, keep CSS font/spacing intact
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }, [inputText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { sender: "user", text: inputText }]);

    try {
      await onSend(inputText); // parent handles API and bot messages
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error sending message." }]);
    } finally {
      setInputText("");
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
    <div className="chat-messages">
        {messages.map((msg, idx) => (
        <div
            key={idx}
            className={`chat-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}
        >
            {msg.text}
        </div>
        ))}
        <div ref={chatEndRef} />
    </div>

    <form className="chat-input-form" onSubmit={handleSubmit}>
        <textarea
        ref={textareaRef}
        className="chat-textarea"
        placeholder="Type your idea..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={1}
        />
        <button type="submit" className="arrow-button" disabled={loading}>
        <img src={arrowBtn} alt="Send" className="arrow-btn-image" />
        </button>
    </form>
    </div>

  );
}
