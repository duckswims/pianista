// src/components/chat/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import SendMessageForm from "../../components/chat/SendMessageForm";
import "./chat.css";

export default function Chat({ messages: initialMessages = [], onSend }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update messages if initialMessages change
  useEffect(() => {
    if (initialMessages) setMessages(initialMessages);
  }, [initialMessages]);

  const handleSubmit = async (text, plannerId) => {
    if (!text.trim() || loading) return;
    setLoading(true);

    if (onSend) {
      await onSend(text, plannerId); // Messages will be pushed via callback
    }

    setInputText("");
    setLoading(false);
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
            {msg.plannerId && <div className="planner-tag">Planner: {msg.plannerId}</div>}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <SendMessageForm
        value={inputText}
        onChange={setInputText}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
