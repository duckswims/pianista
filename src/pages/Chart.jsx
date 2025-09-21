import React, { useState } from "react";
import MermaidGantt from "../components/chart/mermaid-gantt/MermaidGantt";
import MermaidGraph from "../components/chart/mermaid-graph/MermaidGraph";


function ConvertMermaid() {
  const [activeTab, setActiveTab] = useState("mermaid-gantt");

  return (
    <div className="container mt-4">
      <h2>Generate Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "mermaid-gantt" ? "active" : ""}`}
            onClick={() => setActiveTab("mermaid-gantt")}
          >
            Mermaid Gantt
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "mermaid-graph" ? "active" : ""}`}
            onClick={() => setActiveTab("mermaid-graph")}
          >
            Mermaid Gantt
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "mermaid-gantt" && <MermaidGantt />}
        {activeTab === "mermaid-graph" && <MermaidGraph />}
      </div>
    </div>
  );
}

export default ConvertMermaid;
