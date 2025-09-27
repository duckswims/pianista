// src/contexts/ApiKeyContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ApiKeyContext = createContext();

export function ApiKeyProvider({ children }) {
  // Initialize with either window, env, or empty string
  const [apiKey, _setApiKey] = useState(
    window.VISIONSPACE_API_KEY || import.meta.env.VITE_API_KEY || ""
  );

  // Whenever apiKey changes, also update the global variable
  useEffect(() => {
    if (apiKey) {
      window.VISIONSPACE_API_KEY = apiKey;
      console.log("[ApiKeyContext] Global API key updated:", apiKey);
    }
  }, [apiKey]);

  // ✅ Wrapper ensures both state and global variable update immediately
  const setApiKey = (key) => {
    window.VISIONSPACE_API_KEY = key;
    _setApiKey(key);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}
