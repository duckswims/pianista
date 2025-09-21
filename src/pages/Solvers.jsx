import React, { useState } from "react";
import PostSolve from "../components/solvers/post-solve/PostSolve";
import GetSolution from "../components/solvers/get-solution/GetSolution";
import GetSolvers from "../components/solvers/get-solvers/GetSolvers";

function Solvers() {
  const [activeTab, setActiveTab] = useState("post");
  const [selectedSolverName, setSelectedSolverName] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Solver Dashboard</h2>

      {/* Available Solvers above tabs */}
      <div className="mb-4">
        <GetSolvers onSelectSolver={setSelectedSolverName} />
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
        {activeTab === "post" && <PostSolve solverName={selectedSolverName} />}
        {activeTab === "get" && <GetSolution />}
      </div>
    </div>
  );
}

export default Solvers;
