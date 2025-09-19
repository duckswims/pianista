import React from "react";
import { Link } from "react-router-dom";

function HomePlanner({ description }) {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body d-flex flex-column justify-content-between" style={{ height: "200px" }}>
          {/* Title */}
          <h5 className="card-title text-center">Planner</h5>

          {/* Description */}
          <p className="card-text text-center">{description}</p>

          {/* Button centered */}
          <div className="d-flex justify-content-center mt-auto">
            <Link to="/planner" className="btn btn-primary">
              Go to Planner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePlanner;
