// src/components/chat/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import SendMessageForm from "../../components/chat/SendMessageForm";
import "./chat.css";

export default function Chat({ messages: initialMessages = [], onSend }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null); // 🆕 for popup image
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

  // 🆕 Intercept image clicks inside message HTML
  const handleBubbleClick = (e) => {
    const target = e.target;
    if (target.tagName === "IMG" && target.src.startsWith("data:image/svg+xml")) {
      e.preventDefault();
      setModalImage(target.src);
    }
  };

  return (
    <div className="chat-page">
    <div className="chat-messages">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`chat-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}
          onClick={handleBubbleClick}
        >
          {msg.sender === "user" ? (
            <div className="message-content">
              {msg.plannerId && (
                <div>
                  <div><b>Planner:</b> {msg.plannerId}</div>
                  <div><b>Text:</b> {msg.text}</div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="message-content"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            ></div>
          )}
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

      {/* 🆕 Popup modal for image */}
      {modalImage && (
        <div className="image-modal" onClick={() => setModalImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Mermaid diagram" />
            <button className="close-modal" onClick={() => setModalImage(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
