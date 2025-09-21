import React, { useState } from "react";
import PostValidatePddlMatch from "../../../components/validate/match/post-validate-pddl-match/PostValidatePddlMatch";

function Validation() {
  const [activeTab, setActiveTab] = useState("post-pddl-match");

  return (
    <div className="container mt-4">
      <h2>Validation Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post-pddl-match" ? "active" : ""}`}
            onClick={() => setActiveTab("post-pddl-match")}
          >
            Post Validate PDDL Match
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "post-pddl-match" && <PostValidatePddlMatch />}
      </div>
    </div>
  );
}

export default Validation;
