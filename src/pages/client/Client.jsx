import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../../assets/logo/VisionSpace_eye_Black.png";
import arrowBtn from "../../assets/arrow-button/light.png";
import { fetchApi } from "../../scripts/api";
import { ApiKeyContext } from "../../contexts/ApiKeyContext";
import "./Client.css";

export default function Client() {
  const [idea, setIdea] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeyValid, setApiKeyValid] = useState(null); // null = checking, true/false
  const [transitioning, setTransitioning] = useState(false); // controls fade
  const textareaRef = useRef(null);
  const { apiKey, setApiKey } = useContext(ApiKeyContext);

  const LINE_HEIGHT = 20;
  const MAX_LINES = 8;

  // Dynamically resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = MAX_LINES * LINE_HEIGHT;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }, [idea]);

  // Check API key validity
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

  // Submit idea
  const handleSubmitIdea = (e) => {
    e.preventDefault();
    console.log("Idea submitted:", idea);
  };

  // Submit API key
  const handleSubmitApiKey = async (e) => {
    e.preventDefault();
    const res = await fetchApi("/", {
      headers: { "Ocp-Apim-Subscription-Key": apiKeyInput },
    });

    if (!res?.error || res?.status !== 401) {
      setTransitioning(true); // trigger fade-out of old form
      setTimeout(() => {
        setApiKey(apiKeyInput);
        setApiKeyValid(true);
        setTransitioning(false); // fade-in new content
      }, 500); // match CSS duration
    } else {
      alert("Invalid API key!");
    }
  };

  return (
    <div className="client-page">
      <div className="client-content">
        <img src={logo} alt="Logo" className="client-logo" />
        <h1 className="client-title">Pianista</h1>

        {/* Transition container only for forms + messages */}
        <div
          className={`form-transition-container ${
            transitioning ? "fade-out" : "fade-in"
          }`}
        >
          {apiKeyValid === true ? (
            <>
              <p className="client-welcome">
                Welcome! Share your ideas with us.
              </p>
              <form
                className="client-input-form d-flex align-items-end"
                onSubmit={handleSubmitIdea}
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
                To use our service, you may obtain your API token from{" "}
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
    </div>
  );
}
