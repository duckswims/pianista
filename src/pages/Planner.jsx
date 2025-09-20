import React from "react";
import GetPlanners from "../components/planners/get-planners/GetPlanners";
import PostPlan from "../components/planners/post-plan/PostPlan";
import GetPlan from "../components/planners/get-plan/GetPlan";

function Planner() {
  return (
    <div className="container mt-4">
      <h2>Planner Dashboard</h2>

      <div className="row mt-4">
        <div className="col-12">
          <GetPlanners />
        </div>
        
        <div className="col-12 mt-4">
          <PostPlan />
        </div>

        <div className="col-12 mt-4">
          <GetPlan />
        </div>
      </div>
    </div>
  );
}

export default Planner;
