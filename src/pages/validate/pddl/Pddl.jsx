import React, { useState } from "react";
import PostValidatePddl from "../../../components/functions/validate/pddl/post-validate-pddl/PostValidatePddl";

function ValidatePddl() {
  const [activeTab, setActiveTab] = useState("post-pddl");

  return (
    <div className="container">
      <h2>Validation Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post-pddl" ? "active" : ""}`}
            onClick={() => setActiveTab("post-pddl")}
          >
            Post Validate PDDL
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "post-pddl" && <PostValidatePddl />}
      </div>
    </div>
  );
}

export default ValidatePddl;
