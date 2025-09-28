import React, { useState, useEffect, useRef } from "react";
import SendMessageForm from "../../components/chat/SendMessageForm";
import { generateAndValidatePddl } from "../../scripts/api/chat";
import "./chat.css";

export default function Chat({ messages: initialMessages, onSend }) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => setMessages(initialMessages), [initialMessages]);

  const handleSubmit = async (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputText("");
    setLoading(true);

    try {
      const botMessages = await generateAndValidatePddl(text);
      setMessages((prev) => [...prev, ...botMessages]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error generating/validating PDDL." }]);
    } finally {
      setLoading(false);
    }

    if (onSend) onSend(text);
  };

  return (
    <div className="chat-page">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
            {msg.text}
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
