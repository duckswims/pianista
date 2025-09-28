import React, { useState } from "react";
import GetPlanners from "../../../features/planners/GetPlanners";
import GetPlan from "../../../features/solve/pddl/GetPlan";
import PostPlan from "../../../features/solve/pddl/PostPlan";


function SolvePddl() {
  const [activeTab, setActiveTab] = useState("post"); // "post" or "get"
  const [selectedPlannerId, setSelectedPlannerId] = useState(null);

  return (
    <div className="container">
      <h2 className="mb-4">PDDL Dashboard</h2>

      {/* Available Planners above tabs */}
      <div className="mb-4">
        <GetPlanners onSelectPlanner={setSelectedPlannerId} />
      </div>

      {/* Tab navigation */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post" ? "active" : ""}`}
            onClick={() => setActiveTab("post")}
          >
            Post Plan
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "get" ? "active" : ""}`}
            onClick={() => setActiveTab("get")}
          >
            Get Plan
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "post" && <PostPlan plannerId={selectedPlannerId} />}
        {activeTab === "get" && <GetPlan />}
      </div>
    </div>
  );
}

export default SolvePddl;
