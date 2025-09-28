import React, { useEffect, useState } from "react";
import { getPlanners } from "../../scripts/pianista-api/planners";
import ErrorDisplay from "../../components/feedback/ErrorDisplay";

function GetPlanners({ onSelectPlanner }) {
  const [planners, setPlanners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlanners() {
      const response = await getPlanners();

      if (response.error) {
        setError(response);
        setPlanners([]);
      } else {
        setError(null);

        if (Array.isArray(response)) {
          setPlanners(response);
        } else if (response && typeof response === "object") {
          setPlanners([response]);
        } else {
          setPlanners([]);
        }
      }
    }

    fetchPlanners();
  }, []);

  return (
    <div>
      <h4 className="card-title mb-3">Available Planners</h4>

      {error && <ErrorDisplay error={error} />}

      {planners.length > 0 ? (
        <>
          <div className="d-flex flex-wrap gap-2">
            {planners.map((planner, index) => (
              <div
                key={`${planner.id}-${index}`}
                className="card p-3 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => onSelectPlanner && onSelectPlanner(planner.id)}
              >
                <h6 className="card-title">{planner.name}</h6>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "0.85rem" }}
                >
                  id: {planner.id}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-muted">
            {planners.length} available planners found.
          </p>
        </>
      ) : (
        !error && <p>No planners available.</p>
      )}
    </div>
  );
}

export default GetPlanners;
