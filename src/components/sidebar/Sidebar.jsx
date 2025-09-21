import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchApi } from "../../scripts/api";

import "./online-indicator.css";

function Sidebar() {
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    async function checkApi() {
      const result = await fetchApi();
      setApiStatus(!result?.error); // true if API is online
    }
    checkApi();
  }, []);

  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ minHeight: "100%" }}>
      <h5 className="d-flex align-items-center">
        Pianista API
        <div className={`online-indicator ${apiStatus ? "online" : "offline"} ms-2`}>
          <span className="blink"></span>
        </div>
      </h5>

      <nav className="nav flex-column">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/planners" className="nav-link">Planners</Link>
        <Link to="/solvers" className="nav-link">Solvers</Link>
        <Link to="/solve" className="nav-link">Solve</Link>
        <Link to="/validate" className="nav-link">Validation</Link>
        <Link to="/convert" className="nav-link">Convert</Link>
        <Link to="/chart" className="nav-link">Interactive Chart</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
