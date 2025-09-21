import React, { useState } from "react";
import GetPlanners from "../../../components/planners/get-planners/GetPlanners";
import PostPlan from "../../../components/solve/pddl/post-plan/PostPlan";
import GetPlan from "../../../components/solve/pddl/get-plan/GetPlan";


function PDDL() {
  const [activeTab, setActiveTab] = useState("post"); // "post" or "get"
  const [selectedPlannerId, setSelectedPlannerId] = useState(null);

  return (
    <div className="container mt-4">
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

export default PDDL;
