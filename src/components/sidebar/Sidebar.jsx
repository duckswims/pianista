import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchApi } from "../../scripts/api";
import routes from "../data/components.json";

import "./sidebar.css";
import logo from "../../assets/logo/VisionSpace_eye_Black.png";
import sidebarIcon from "../../assets/sidebar.png";

export default function Sidebar({ isOpen, setIsOpen, devMode, setDevMode }) {
  const location = useLocation();
  const [apiStatus, setApiStatus] = useState(null);
  const [openMenus, setOpenMenus] = useState({});
  const [hovered, setHovered] = useState(false);
  const excludedKeys = ["planners", "solvers"];
  const devKeys = ["solve", "validate", "convert", "chart"];

  useEffect(() => {
    async function checkApi() {
      const result = await fetchApi();
      setApiStatus(!result?.error);
    }
    checkApi();
  }, []);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSidebar = () => {
    setIsOpen(true);
  };

  const isActive = (link) => location.pathname === link;

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--collapsed"}`}>
      {/* Top: Logo + Toggle */}
      <div className="sidebar__top d-flex justify-content-between align-items-center p-2">
        {isOpen ? (
          <>
            <img src={logo} alt="Logo" className="sidebar-logo" />
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
                                isActive(child.Link) ? "bg-primary text-white" : "text-black"
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

          {/* Dev Mode toggle at bottom */}
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
        </div>
      )}
    </aside>
  );
}
