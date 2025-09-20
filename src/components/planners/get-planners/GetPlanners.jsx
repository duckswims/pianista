import React, { useEffect, useState } from "react";
import { getPlanners } from "../../../scripts/api/get_planners";

function GetPlanners({ onSelectPlanner }) {
  const [planners, setPlanners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlanners() {
      const result = await getPlanners();

      if (result.error) {
        setError(result.message);
      } else {
        if (Array.isArray(result)) setPlanners(result);
        else if (result && typeof result === "object") setPlanners([result]);
        else setPlanners([]);
      }
    }
    fetchPlanners();
  }, []);

  return (    
    
    <div className="card shadow-sm p-4 mb-4">

      <h4 className="card-title mb-3">Available Planners</h4>

      {error && (
        <div className="alert alert-danger">
          <strong>Error {error.status}:</strong> {error.message}
        </div>
      )}

      {planners.length > 0 ? (
        <>
          <div className="d-flex flex-wrap gap-3">
            {planners.map((planner, index) => (
              <div
                key={`${planner.id}-${planner.name}-${index}`}
                className="card p-3 shadow-sm"
                style={{ width: "12rem", cursor: "pointer" }}
                onClick={() => onSelectPlanner && onSelectPlanner(planner.id)}
              >
                <h6 className="card-title">{planner.name}</h6>
                <p className="card-text text-muted" style={{ fontSize: "0.85rem" }}>
                  ID: {planner.id}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-muted">{planners.length} available planners found.</p>
        </>
      ) : (
        !error && <p>No planners available.</p>
      )}

    </div>
  );
}

export default GetPlanners;
