import React, { useState } from "react";
import PostGeneratePddl from "../components/generate/post-generate-pddl/PostGeneratePddl";

function Generate() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div className="container mt-4">
      <h2>PDDL Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "generate" ? "active" : ""}`}
            onClick={() => setActiveTab("generate")}
          >
            Generate PDDL
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "other" ? "active" : ""}`}
            onClick={() => setActiveTab("other")}
          >
            Other Tool
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "generate" && <PostGeneratePddl />}
        {activeTab === "other" && <div className="card shadow-sm p-4">Other PDDL tool will go here…</div>}
      </div>
    </div>
  );
}

export default Generate;
