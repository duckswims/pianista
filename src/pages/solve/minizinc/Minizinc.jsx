import React, { useState } from "react";
import GetSolvers from "../../../features/solvers/GetSolvers";
import PostSolve from "../../../features/solve/minizinc/PostSolve";
import GetSolution from "../../../features/solve/minizinc/GetSolution";

function SolveMinizinc() {
  const [activeTab, setActiveTab] = useState("post");
  const [selectedSolverId, setSelectedSolverId] = useState(null);

  return (
    <div className="container">
      <h2 className="mb-4">MiniZinc Dashboard</h2>

      {/* Available Solvers above tabs */}
      <div className="mb-4">
        <GetSolvers onSelectSolver={setSelectedSolverId} />
      </div>

      {/* Tab navigation */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "post" ? "active" : ""}`}
            onClick={() => setActiveTab("post")}
          >
            Post Solve
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "get" ? "active" : ""}`}
            onClick={() => setActiveTab("get")}
          >
            Get Solution
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div>
        {activeTab === "post" && <PostSolve solverId={selectedSolverId} />}
        {activeTab === "get" && <GetSolution />}
      </div>
    </div>
  );
}

export default SolveMinizinc;
