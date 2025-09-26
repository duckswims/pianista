import React, { useState } from "react";
import GetSolvers from "../../../components/functions/solvers/get-solvers/GetSolvers";
import PostSolve from "../../../components/functions/solve/minizinc/post-solve/PostSolve";
import GetSolution from "../../../components/functions/solve/minizinc/get-solution/GetSolution";

function SolveMinizinc() {
  const [activeTab, setActiveTab] = useState("post");
  const [selectedSolverId, setSelectedSolverId] = useState(null);

  return (
    <div className="container mt-4">
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
