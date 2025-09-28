// src/components/client/Client.jsx
import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo/VisionSpace_eye_Black.png";
import arrowBtn from "../../assets/arrow-button/light.png";
import SendMessageForm from "../../components/chat/SendMessageForm";
import Chat from "./Chat";
import { ApiKeyContext } from "../../contexts/ApiKeyContext";
import { fetchApi } from "../../scripts/pianista-api";
import { runChatFlow } from "../../scripts/chat";
import "./Client.css";

export default function Client() {
  const [idea, setIdea] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeyValid, setApiKeyValid] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatActive, setChatActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { apiKey, setApiKey } = useContext(ApiKeyContext);

  // Check API key on load
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
        setApiKeyValid(!res?.error && res?.status !== 401);
      } catch {
        setApiKeyValid(false);
      }
    }
    checkApiKey();
  }, []);

  const handleSubmitApiKey = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchApi("/", {
        headers: { "Ocp-Apim-Subscription-Key": apiKeyInput },
      });

      if (!res?.error && res?.status !== 401) {
        setTransitioning(true);
        setTimeout(() => {
          setApiKey(apiKeyInput);
          setApiKeyValid(true);
          setTransitioning(false);
        }, 500);
      } else {
        alert("Invalid API key!");
      }
    } catch {
      alert("Error validating API key!");
    }
  };

  // ✅ handleSendMessage uses push-based updates
  const handleSendMessage = async (text, plannerId) => {
    if (!text.trim() || loading) return;

    setChatMessages((prev) => [...prev, { sender: "user", text, plannerId }]);
    setChatActive(true);
    setLoading(true);

    try {
      await runChatFlow(text, plannerId, (msg) => {
        setChatMessages((prev) => [...prev, msg]);
      });
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error generating/validating PDDL." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-page">
      {!chatActive && (
        <div className="client-content">
          <img src={logo} alt="Logo" className="client-logo" />
          <h1 className="client-title">Pianista</h1>

          <div className={`form-transition-container ${transitioning ? "fade-out" : "fade-in"}`}>
            {apiKeyValid === true ? (
              <>
                <p className="client-welcome">Welcome! Share your ideas with us.</p>
                <SendMessageForm
                  value={idea}
                  onChange={setIdea}
                  onSubmit={(text, plannerId) => {
                    handleSendMessage(text, plannerId);
                    setIdea("");
                  }}
                  loading={loading}
                />
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
                <form className="client-api-form" onSubmit={handleSubmitApiKey}>
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

      {chatActive && (
        <Chat
          messages={chatMessages}
          onSend={handleSendMessage}
        />
      )}
    </div>
  );
}
