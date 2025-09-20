import React, { useState } from "react";
import ValidateProblemPlan from "../components/validation/validate-problem-plan/ValidateProblemPlan";
import PostValidatePddl from "../components/validation/post-validate-pddl/PostValidatePddl";

function Validation() {
  const [activeTab, setActiveTab] = useState("validate-plan");

  return (
    <div className="container mt-4">
      <h2>Validation Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "validate-plan" ? "active" : ""}`}
            onClick={() => setActiveTab("validate-plan")}
          >
            Validate Problem Plan
          </button>
        </li>
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
        {activeTab === "validate-plan" && <ValidateProblemPlan />}
        {activeTab === "post-pddl" && <PostValidatePddl />}
      </div>
    </div>
  );
}

export default Validation;
