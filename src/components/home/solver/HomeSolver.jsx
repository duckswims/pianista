import React from "react";
import { useNavigate } from "react-router-dom";

function HomeSolver({ description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/solver"); // redirect to Solver page
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h2 className="card-title">Solver</h2>
          <p className="card-text mt-3">{description}</p>
          <button className="btn btn-primary mt-3" onClick={handleClick}>
            Go to Solvers
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeSolver;
