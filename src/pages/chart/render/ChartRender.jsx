import React, { useState } from "react";
import MermaidRenderer from "../../../components/functions/chart/mermaid-renderer/MermaidRenderer";


function ChartRender() {
  const [activeTab, setActiveTab] = useState("mermaid-renderer");

  return (
    <div className="container mt-4">
      <h2>Generate Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "mermaid-renderer" ? "active" : ""}`}
            onClick={() => setActiveTab("mermaid-renderer")}
          >
            Mermaid Renderer
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "mermaid-renderer" && <MermaidRenderer />}
      </div>
    </div>
  );
}

export default ChartRender;
