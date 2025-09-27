import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo/VisionSpace_eye_Black.png";
import arrowBtn from "../../assets/arrow-button/light.png";
import "./Client.css";

export default function Client() {
  const [idea, setIdea] = useState("");
  const textareaRef = useRef(null);

  const LINE_HEIGHT = 20; // px per line, adjust if font-size changes
  const MAX_LINES = 8;    // maximum number of lines

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Idea submitted:", idea);
  };

  // Dynamically resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset
      const maxHeight = MAX_LINES * LINE_HEIGHT;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }, [idea]);

  return (
    <div className="client-page">
      <div className="client-content">
        <img src={logo} alt="Logo" className="client-logo" />
        <h1 className="client-title">Pianista</h1>
        <p className="client-welcome">Welcome! Share your ideas with us.</p>

        <form
          className="client-input-form d-flex align-items-end"
          onSubmit={handleSubmit}
        >
          <textarea
            ref={textareaRef}
            placeholder="Tell us your idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="client-textarea flex-grow-1"
            rows={1}
          />
          <button type="submit" className="arrow-button ms-2">
            <img src={arrowBtn} alt="Submit" className="arrow-btn-image" />
          </button>
        </form>
      </div>
    </div>
  );
}
