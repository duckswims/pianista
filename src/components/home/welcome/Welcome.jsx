import { useEffect, useState } from "react";
import { fetchApi } from "../../../scripts/api/index.js";

function Welcome() {
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY || "";

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing. Please set VITE_API_KEY in your .env file.");
      return;
    }

    async function getData() {
      setError("");
      try {
        const response = await fetchApi("/", {}, apiKey);
        if (!response.ok) {
          setError("Failed to fetch API message. Please check your API key.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch API message. Please check your API key.");
      }
    }

    getData();
  }, [apiKey]);

  const displayMessage =
    "AI-powered planning made fast and intuitive. Turn your ideas into optimised plans in seconds.";

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Welcome to Pianista! 🚀</h1>

      {/* Always show display message */}
      <p className="mb-4">{displayMessage}</p>

      {/* Show error if API fails */}
      {error && <p className="text-danger mb-4">{error}</p>}
    </div>
  );
}

export default Welcome;
