import { useState, useEffect } from "react";
import { fetchApi } from "../../scripts/api";
import "./online-indicator.css"; 

export default function Header() {
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    async function checkApi() {
      const result = await fetchApi();
      setApiStatus(!result?.error);
    }
    checkApi();
  }, []);

  return (
    <header className="d-flex align-items-center justify-content-between p-0">
      <h5 className="fw-bold mb-0 d-flex align-items-center">
        Pianista API
        <span className={`online-indicator ms-2 ${apiStatus ? "online" : "offline"}`}>
          <span className="blink"></span>
        </span>
      </h5>
    </header>
  );
}
