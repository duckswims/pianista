import React, { useState } from "react";
import MermaidRender from "../../../features/chart/MermaidRender";


function ChartRender() {
  const [activeTab, setActiveTab] = useState("mermaid-render");

  return (
    <div className="container">
      <h2>Interactive Chart Generator</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "mermaid-render" ? "active" : ""}`}
            onClick={() => setActiveTab("mermaid-render")}
          >
            Mermaid Render
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "mermaid-render" && <MermaidRender />}
      </div>
    </div>
  );
}

export default ChartRender;
