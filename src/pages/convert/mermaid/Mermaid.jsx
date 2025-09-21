import React, { useState } from "react";
import PostConvertPddlToMermaid from "../../../components/convert/mermaid/post-convert-pddl-to-mermaid/PostConvertPddlToMermaid";
import PostConvertMermaidToPddl from "../../../components/convert/mermaid/post-convert-mermaid-to-pddl/PostConvertMermaidToPddl";

function ConvertMermaid() {
  const [activeTab, setActiveTab] = useState("post-convert-pddl-to-mermaid");

  return (
    <div className="container mt-4">
      <h2>Generate Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post-convert-pddl-to-mermaid" ? "active" : ""}`}
            onClick={() => setActiveTab("post-convert-pddl-to-mermaid")}
          >
            Convert PDDL to Mermaid
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post-convert-mermaid-to-pddl" ? "active" : ""}`}
            onClick={() => setActiveTab("post-convert-mermaid-to-pddl")}
          >
            Convert Mermaid to PDDL
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "post-convert-pddl-to-mermaid" && <PostConvertPddlToMermaid />}
        {activeTab === "post-convert-mermaid-to-pddl" && <PostConvertMermaidToPddl />}
      </div>
    </div>
  );
}

export default ConvertMermaid;
