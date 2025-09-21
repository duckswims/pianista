import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchApi } from "../../scripts/api";
import routes from "../data/components.json";

import "./online-indicator.css";
import "./styles.css";

function Sidebar() {
  const [apiStatus, setApiStatus] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    async function checkApi() {
      const result = await fetchApi();
      setApiStatus(!result?.error); // true if API is online
    }
    checkApi();
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ minHeight: "100%" }}>
      <h5 className="d-flex align-items-center">
        Pianista API
        <div className={`online-indicator ${apiStatus ? "online" : "offline"} ms-2`}>
          <span className="blink"></span>
        </div>
      </h5>

      <nav className="nav flex-column">
        {Object.entries(routes).map(([key, item]) => (
          <div key={key} className="mb-1">
            <div className="d-flex align-items-center justify-content-between">
              <Link to={item.Link} className="nav-link flex-grow-1">
                {item.Title}
              </Link>

              {item.Children && (
                <button
                  className="btn btn-sm btn-link p-0 ms-2"
                  onClick={() => toggleDropdown(key)}
                >
                  {openDropdown === key ? "▾" : "▸"}
                </button>
              )}
            </div>

            {item.Children && openDropdown === key && (
              <div className="ms-3">
                {Object.entries(item.Children).map(([childKey, child]) => (
                  <Link key={childKey} to={child.Link} className="nav-link small">
                    {child.Title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;