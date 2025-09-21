import React, { useState } from "react";
import PostGeneratePddl from "../../../components/convert/natural_language/post-generate-pddl/PostGeneratePddl";

function ConvertNaturalLanguage() {
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
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "post-generate-pddl" && <PostGeneratePddl />}
      </div>
    </div>
  );
}

export default ConvertNaturalLanguage;
