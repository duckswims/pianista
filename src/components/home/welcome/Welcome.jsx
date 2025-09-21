import { useEffect, useState } from "react";
import { fetchApi } from "../../../scripts/api/index.js";

function Welcome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY || "";

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing. Please set VITE_API_KEY in your .env file.");
      return;
    }

    async function getData() {
      setLoading(true);
      setError("");
      try {
        await fetchApi("/", {}, apiKey); // call API but ignore message
      } catch (err) {
        console.error(err);
        setError("Failed to fetch API message. Please check your API key.");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [apiKey]);

  const displayMessage = "AI-powered planning made fast and intuitive. Turn your ideas into optimised plans in seconds.";

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Welcome to Pianista! 🚀</h1>
      {error ? (
        <p className="text-danger mb-4">{error}</p>
      ) : (
        <p className={loading ? "text-muted mb-4" : "mb-4"}>{displayMessage}</p>
      )}
    </div>
  );
}

export default Welcome;
