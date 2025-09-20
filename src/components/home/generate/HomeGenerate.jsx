import React from "react";
import { useNavigate } from "react-router-dom";

function HomeGenerate({ description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/pddl");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h2 className="card-title">Generate</h2>
          <p className="card-text mt-3">{description}</p>
          <button className="btn btn-primary mt-3" onClick={handleClick}>
            Go to Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeGenerate;
