import { useContext, useState, useEffect } from "react";
import { fetchApi } from "../../scripts/pianista-api";
import { ApiKeyContext } from "../../contexts/ApiKeyContext";
import "./online-indicator.css"; 

export default function Header() {
  const { apiKey } = useContext(ApiKeyContext);
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    async function checkApi() {
      const res = await fetchApi();
      setApiStatus(res.error ? "invalid" : "valid");
    }
    checkApi();
  }, [apiKey]);

  return (
    <header className="d-flex align-items-center justify-content-between p-3">
      <h5 className="fw-bold mb-0 d-flex align-items-center">
        Pianista API
        <span
          className={`online-indicator ms-2 ${
            apiStatus === "valid" ? "online" : "offline"
          }`}
        >
          <span className="blink"></span>
        </span>
      </h5>
    </header>
  );
}
