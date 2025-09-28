import React, { useEffect, useState } from "react";
import { getSolvers } from "../../api/solvers";
import ErrorDisplay from "../../components/feedback/ErrorDisplay";

function GetSolvers({ onSelectSolver }) {
  const [solvers, setSolvers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSolvers() {
      const response = await getSolvers();

      if (response.error) {
        setError(response);
        setSolvers([]);
      } else {
        setError(null);

        if (Array.isArray(response)) {
          setSolvers(response);
        } else if (response && typeof response === "object") {
          setSolvers([response]);
        } else {
          setSolvers([]);
        }
      }
    }

    fetchSolvers();
  }, []);

  return (
    <div>
      <h4 className="card-title mb-3">Available Solvers</h4>

      {error && <ErrorDisplay error={error} />}

      {solvers.length > 0 ? (
        <>
          <div className="d-flex flex-wrap gap-2">
            {solvers.map((solver, index) => (
              <div
                key={`${solver.id}-${index}`}
                className="card p-3 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => onSelectSolver && onSelectSolver(solver.id)} // Pass name
              >
                <h6 className="card-title">{solver.name}</h6>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "0.85rem" }}
                >
                  id: {solver.id}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-muted">
            {solvers.length} available solvers found.
          </p>
        </>
      ) : (
        !error && <p>No solvers available.</p>
      )}
    </div>
  );
}

export default GetSolvers;
