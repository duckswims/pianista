import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../../assets/logo/VisionSpace_eye_Black.png";
import arrowBtn from "../../assets/arrow-button/light.png";
import { fetchApi } from "../../scripts/api"; // import your API fetcher
import { ApiKeyContext } from "../../contexts/ApiKeyContext";
import "./Client.css";

export default function Client() {
  const [idea, setIdea] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeyValid, setApiKeyValid] = useState(null); // null = checking, true/false
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

  // Check if API key exists and is valid
  useEffect(() => {
    async function checkApiKey() {
      if (!import.meta.env.VITE_API_KEY) {
        setApiKeyValid(false);
        return;
      }

      try {
        const res = await fetchApi("/", {
          headers: { "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY },
        });

        setApiKeyValid(!res?.error || res?.status !== 401);
      } catch {
        setApiKeyValid(false);
      }
    }

    checkApiKey();
  }, []);

  const handleSubmitIdea = (e) => {
    e.preventDefault();
    console.log("Idea submitted:", idea);
  };

    const handleSubmitApiKey = async (e) => {
    e.preventDefault();
    const res = await fetchApi("/", {
        headers: { "Ocp-Apim-Subscription-Key": apiKeyInput },
    });

    if (!res?.error || res?.status !== 401) {
        setApiKey(apiKeyInput); // updates context and window.VISIONSPACE_API_KEY
        setApiKeyValid(true);
        alert("API key saved successfully!");
    } else {
        alert("Invalid API key!");
    }
    };

  return (
    <div className="client-page">
      <div className="client-content">
        <img src={logo} alt="Logo" className="client-logo" />
        <h1 className="client-title">Pianista</h1>
        <p className="client-welcome">Welcome! Share your ideas with us.</p>

        {apiKeyValid === false ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
}
