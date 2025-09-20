import React, { useState } from "react";
import GetPlanners from "../components/planners/get-planners/GetPlanners";
import PostPlan from "../components/planners/post-plan/PostPlan";
import GetPlan from "../components/planners/get-plan/GetPlan";

function Planner() {
  const [activeTab, setActiveTab] = useState("post"); // "post" or "get"
  const [selectedPlannerId, setSelectedPlannerId] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Planner Dashboard</h2>

      <div className="row">
        {/* Left column: GetPlanners */}
        <div className="col-md-3">
          <GetPlanners onSelectPlanner={setSelectedPlannerId} />
        </div>

        {/* Right column: Tabs for PostPlan / GetPlan */}
        <div className="col-md-9">
          {/* <div className="card shadow-sm p-4"> */}
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
        {/* </div> */}
      </div>
    </div>
  );
}

export default Planner;
