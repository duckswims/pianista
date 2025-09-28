// src/pages/client/Client.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../../assets/logo/VisionSpace_eye_Black.png";
import arrowBtn from "../../assets/arrow-button/light.png";
import { fetchApi } from "../../scripts/api";
import { postGeneratePddl } from "../../scripts/api/convert";
import { ApiKeyContext } from "../../contexts/ApiKeyContext";
import Chat from "./Chat";
import "./Client.css";

export default function Client() {
  const [idea, setIdea] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeyValid, setApiKeyValid] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatActive, setChatActive] = useState(false);
  const textareaRef = useRef(null);
  const { apiKey, setApiKey } = useContext(ApiKeyContext);

  const LINE_HEIGHT = 20;
  const MAX_LINES = 8;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = MAX_LINES * LINE_HEIGHT;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }, [idea]);

  useEffect(() => {
    async function checkApiKey() {
      const currentKey = window.VISIONSPACE_API_KEY || import.meta.env.VITE_API_KEY;
      if (!currentKey) {
        setApiKeyValid(false);
        return;
      }
      try {
        const res = await fetchApi("/", {
          headers: { "Ocp-Apim-Subscription-Key": currentKey },
        });
        setApiKeyValid(!res?.error || res?.status !== 401);
      } catch {
        setApiKeyValid(false);
      }
    }
    checkApiKey();
  }, []);

  const handleSubmitApiKey = async (e) => {
    e.preventDefault();
    const res = await fetchApi("/", {
      headers: { "Ocp-Apim-Subscription-Key": apiKeyInput },
    });

    if (!res?.error || res?.status !== 401) {
      setTransitioning(true);
      setTimeout(() => {
        setApiKey(apiKeyInput);
        setApiKeyValid(true);
        setTransitioning(false);
      }, 500);
    } else {
      alert("Invalid API key!");
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setChatActive(true);

    try {
      const res = await postGeneratePddl("problem", { text, domain: "" }, true);

      // Return entire response as string
      const responseText = JSON.stringify(res, null, 2);

      setChatMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error generating response." },
      ]);
    }
  };

  return (
    <div className="client-page">
      {!chatActive && (
        <div className="client-content">
          <img src={logo} alt="Logo" className="client-logo" />
          <h1 className="client-title">Pianista</h1>

          <div
            className={`form-transition-container ${
              transitioning ? "fade-out" : "fade-in"
            }`}
          >
            {apiKeyValid === true ? (
              <>
                <p className="client-welcome">Welcome! Share your ideas with us.</p>
                <form
                  className="client-input-form d-flex align-items-end"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(idea);
                    setIdea("");
                  }}
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
              </>
            ) : (
              <>
                <p className="client-warning">
                  To use our service, obtain your API token{" "}
                  <a
                    href="https://planner-apim.developer.azure-api.net"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  .
                </p>
                <form
                  className="client-api-form d-flex align-items-center"
                  onSubmit={handleSubmitApiKey}
                >
                  <input
                    type="text"
                    placeholder="Enter your API key"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="flex-grow-1 px-3"
                  />
                  <button type="submit" className="arrow-button ms-2">
                    <img src={arrowBtn} alt="Submit" className="arrow-btn-image" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {chatActive && <Chat messages={chatMessages} onSend={handleSendMessage} />}
    </div>
  );
}
