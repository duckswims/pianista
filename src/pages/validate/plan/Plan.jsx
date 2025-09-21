import React, { useState } from "react";
import ValidateProblemPlan from "../../../components/validate/plan/validate-problem-plan/ValidateProblemPlan";

function ValidatePlan() {
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
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "validate-plan" && <ValidateProblemPlan />}
      </div>
    </div>
  );
}

export default ValidatePlan;
