import React, { useState } from "react";
import PostGeneratePddl from "../components/generate/post-generate-pddl/PostGeneratePddl";
import PostConvertPddlToMermaid from "../components/generate/post-convert-pddl-to-mermaid/PostConvertPddlToMermaid";

function Generate() {
  const [activeTab, setActiveTab] = useState("post-generate-pddl");

  return (
    <div className="container mt-4">
      <h2>Generate Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post-generate-pddl" ? "active" : ""}`}
            onClick={() => setActiveTab("post-generate-pddl")}
          >
            Generate PDDL
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post-convert-pddl-to-mermaid" ? "active" : ""}`}
            onClick={() => setActiveTab("post-convert-pddl-to-mermaid")}
          >
            Convert PDDL to Mermaid
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "post-generate-pddl" && <PostGeneratePddl />}
        {activeTab === "post-convert-pddl-to-mermaid" && <PostConvertPddlToMermaid />}
      </div>
    </div>
  );
}

export default Generate;
