import React, { useEffect, useState } from "react";
import { getSolvers } from "../../../scripts/api/get_solvers";

function GetSolvers() {
  const [solvers, setSolvers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSolvers() {
      const result = await getSolvers();

      if (result.error) {
        setError(result.message);
      } else {
        // Ensure array format
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
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Available Solvers</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mt-3 d-flex flex-wrap gap-2">
            {solvers.map((solver, index) => (
              <button
                key={`${solver.id}-${index}`}
                className="btn btn-outline-primary"
                onClick={() => alert(`Selected solver: ${solver.id}`)}
              >
                {solver.name}
              </button>
            ))}
            {solvers.length === 0 && !error && <p>No solvers available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetSolvers;
