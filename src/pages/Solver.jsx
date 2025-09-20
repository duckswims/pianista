import React, { useState } from "react";
import PostSolve from "../components/solvers/post-solve/PostSolve";
import GetSolution from "../components/solvers/get-solution/GetSolution";

function HomeSolver() {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <div className="container mt-4">
      <h2>Solver Dashboard</h2>

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

      <div>
        {activeTab === "post" && <PostSolve />}
        {activeTab === "get" && <GetSolution />}
      </div>
    </div>
  );
}

export default HomeSolver;
