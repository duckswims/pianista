// src/components/chat/SendMessageForm.jsx
import React, { useRef, useEffect } from "react";
import arrowBtn from "../../assets/arrow-button/light.png";
import "./SendMessageForm.css";

export default function SendMessageForm({ value, onChange, onSubmit, loading }) {
  const textareaRef = useRef(null);
  const LINE_HEIGHT = 20;
  const MAX_LINES = 8;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = MAX_LINES * LINE_HEIGHT;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }, [value]);

  return (
    <form className="send-message-form" onSubmit={onSubmit}>
      <textarea
        ref={textareaRef}
        className="send-message-textarea"
        placeholder="Type your idea..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
      />
      <button type="submit" className="send-message-button" disabled={loading}>
        <img src={arrowBtn} alt="Send" className="send-message-btn-image" />
      </button>
    </form>
  );
}
