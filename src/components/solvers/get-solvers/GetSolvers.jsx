import React, { useEffect, useState } from "react";
import { getSolvers } from "../../../scripts/api/get_solvers";

function GetSolvers({ onSelectSolver }) {
  const [solvers, setSolvers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSolvers() {
      const result = await getSolvers();

      if (result.error) {
        setError(result.message);
      } else {
        if (Array.isArray(result)) {
          setSolvers(result);
        } else if (result && typeof result === "object") {
          setSolvers([result]);
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

      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      )}

      {solvers.length > 0 ? (
        <>
          <div className="d-flex flex-wrap gap-2">
            {solvers.map((solver, index) => (
              <div
                key={`${solver.id}-${index}`}
                className="card p-3 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => onSelectSolver && onSelectSolver(solver.name)} // Pass name
              >
                <h6 className="card-title">{solver.name}</h6>
                <p className="card-text text-muted" style={{ fontSize: "0.85rem" }}>
                  id: {solver.id}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-muted">{solvers.length} available solvers found.</p>
        </>
      ) : (
        !error && <p>No solvers available.</p>
      )}
    </div>
  );
}

export default GetSolvers;
