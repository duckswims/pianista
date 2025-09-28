// src/components/chat/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import SendMessageForm from "../../components/chat/SendMessageForm";
import { generateAndValidatePddl } from "../../scripts/api/chat";
import "./chat.css";

export default function Chat({ messages: initialMessages, onSend }) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update messages if initialMessages change
  useEffect(() => setMessages(initialMessages), [initialMessages]);

  // Handle submitting message + selected planner
  const handleSubmit = async (text, plannerId) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text, plannerId }]);
    setInputText("");
    setLoading(true);

    try {
      // Pass a callback so messages are pushed as they happen
      await generateAndValidatePddl(text, plannerId, (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error generating/validating PDDL." },
      ]);
    } finally {
      setLoading(false);
    }

    if (onSend) onSend(text, plannerId);
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
