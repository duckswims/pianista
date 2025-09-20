import React, { useState } from "react";
import ValidateProblemPlan from "../components/validation/validate-problem-plan/ValidateProblemPlan";

function Validation() {
  const [activeTab, setActiveTab] = useState("validate");

  return (
    <div className="container mt-4">
      <h2>Validation Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "validate" ? "active" : ""}`}
            onClick={() => setActiveTab("validate")}
          >
            Validate Problem Plan
          </button>
        </li>
        {/* Future tabs can be added here */}
      </ul>

      <div>
        {activeTab === "validate" && <ValidateProblemPlan />}
      </div>
    </div>
  );
}

export default Validation;
