import React, { useEffect, useState } from "react";
import { getPlanners } from "../../../scripts/api/get_planners";

function GetPlanners() {
  const [planners, setPlanners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlanners() {
      const result = await getPlanners();

      if (result.error) {
        setError(result.message);
      } else {
        // Ensure it's always an array
        if (Array.isArray(result)) {
          setPlanners(result);
        } else if (result && typeof result === "object") {
          setPlanners([result]); // wrap single object in array
        } else {
          setPlanners([]);
        }
      }
    }
    fetchPlanners();
  }, []);

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Available Planners</h5>
          {console.log(planners)}

          {planners.length > 0 ? (
            <div className="d-flex flex-wrap gap-2">
              {planners.map((planner, index) => (
                <button
                  key={`${planner.id}-${planner.name}-${index}`}
                  className="btn btn-primary"
                  onClick={() => alert(`Selected planner: ${planner.id}`)}
                >
                  {planner.name}
                </button>
              ))}
            </div>
          ) : (
            !error && <p>No planners available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetPlanners;
