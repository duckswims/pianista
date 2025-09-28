import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { fetchApi } from "../../scripts/api";
import routes from "../data/components.json";
import { ApiKeyContext } from "../../contexts/ApiKeyContext";

import "./sidebar.css";
import logo from "../../assets/logo/VisionSpace_eye_Black.png";
import sidebarIcon from "../../assets/sidebar/light.png";
import darkIcon from "../../assets/darkmode/dark.png";
import lightIcon from "../../assets/darkmode/light.png";
import devOnIcon from "../../assets/dev/devON.png";
import devOffIcon from "../../assets/dev/devOFF.png";

export default function Sidebar({ isOpen, setIsOpen, devMode, setDevMode, darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { apiKey } = useContext(ApiKeyContext);
  const [apiStatus, setApiStatus] = useState(null);
  const [openMenus, setOpenMenus] = useState({});
  const [hovered, setHovered] = useState(false);

  const excludedKeys = ["planners", "solvers"];
  const devKeys = ["solve", "validate", "convert", "chart"];

  // Redirect to home if devMode turned off
  useEffect(() => {
    if (!devMode && location.pathname !== "/") {
      navigate("/");
    }
  }, [devMode, navigate, location.pathname]);

  useEffect(() => {
    async function checkApi() {
      if (!apiKey) {
        setApiStatus(false);
        return;
      }
      const result = await fetchApi("/", {
        headers: { "Ocp-Apim-Subscription-Key": apiKey },
      });
      setApiStatus(!result?.error);
    }
    checkApi();
  }, [apiKey]);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSidebar = () => setIsOpen(true);

  const goHome = () => navigate("/"); // 🆕 Navigate to home

  const isActive = (link) => location.pathname === link;

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--collapsed"}`}>
      {/* Top: Logo + Sidebar Toggle */}
      <div className="sidebar__top d-flex justify-content-between align-items-center p-2">
        {isOpen ? (
          <>
            <img
              src={logo}
              alt="Logo"
              className="sidebar-logo"
              style={{ cursor: "pointer" }}
              onClick={goHome} // 🆕 Click logo to go home
            />
            <button onClick={() => setIsOpen(false)} className="sidebar__toggle-btn">
              <img src={sidebarIcon} alt="Toggle Sidebar" className="sidebar-toggle-icon" />
            </button>
          </>
        ) : (
          <button
            className="sidebar__toggle-btn collapsed-btn d-flex justify-content-center align-items-center"
            onClick={toggleSidebar}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src={hovered ? sidebarIcon : logo}
              alt="Toggle Sidebar"
              className="sidebar-toggle-icon"
              style={{ cursor: "pointer" }}
              onClick={goHome} // 🆕 Click collapsed icon to go home
            />
          </button>
        )}
      </div>

      {/* Navigation + scrollable */}
      {isOpen && (
        <div className="sidebar__nav-container d-flex flex-column flex-grow-1">
          <nav className="nav flex-column gap-2 mt-2 flex-grow-1">
            {Object.entries(routes)
              .filter(([key]) => !excludedKeys.includes(key) && (devMode || !devKeys.includes(key)))
              .map(([key, item]) => (
                <div key={key}>
                  {item.Children ? (
                    <>
                      <button
                        className="btn text-start w-100 d-flex justify-content-between align-items-center px-2 py-1 text-black"
                        onClick={() => toggleMenu(key)}
                      >
                        {item.Title}
                        <span className="ms-2">{openMenus[key] ? "▾" : "▸"}</span>
                      </button>

                      {openMenus[key] && (
                        <div className="ms-3 mt-1">
                          {Object.entries(item.Children).map(([childKey, child]) => (
                            <Link
                              key={childKey}
                              to={child.Link}
                              className={`d-block px-2 py-1 rounded ${
                                isActive(child.Link) ? "bg-primary text-white" : ""
                              }`}
                            >
                              {child.Title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.Link}
                      className={`d-block px-2 py-1 rounded ${
                        isActive(item.Link) ? "bg-primary text-white" : "text-black"
                      }`}
                    >
                      {item.Title}
                    </Link>
                  )}
                </div>
              ))}
          </nav>

          {/* Dark Mode toggle (expanded) */}
          <div className="sidebar__dark-mode d-flex justify-content-between align-items-center px-2 py-2 mt-auto">
            <span>Dark Mode</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode((prev) => !prev)}
              />
              <span></span>
            </label>
          </div>

          {/* Dev Mode toggle (expanded) */}
          {apiStatus && (
            <div className="sidebar__dev-mode d-flex justify-content-between align-items-center px-2 py-2">
              <span>Development Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={devMode}
                  onChange={() => setDevMode((prev) => !prev)}
                />
                <span></span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Dark Mode toggle (collapsed) */}
      {!isOpen && (
        <>
          <button
            className="sidebar__toggle-btn collapsed-btn d-flex justify-content-center align-items-center mt-auto mb-2"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <img
              src={darkMode ? darkIcon : lightIcon}
              alt="Dark Mode Toggle"
              className="sidebar-toggle-icon"
            />
          </button>

          {/* Collapsed Dev Mode toggle */}
          {apiStatus && (
            <button
              className="sidebar__toggle-btn collapsed-btn d-flex justify-content-center align-items-center mb-2"
              onClick={() => setDevMode((prev) => !prev)}
            >
              <img
                src={devMode ? devOnIcon : devOffIcon}
                alt="Dev Mode Toggle"
                className="sidebar-toggle-icon"
              />
            </button>
          )}
        </>
      )}
    </aside>
  );
}
