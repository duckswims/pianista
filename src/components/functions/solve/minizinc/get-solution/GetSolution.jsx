import React, { useState } from "react";
import { getSolution } from "../../../../../scripts/api/get_solution";

function GetSolution() {
  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await getSolution(jobId);

    if (response.error) {
      setError(response);
      setResult(null);
    } else {
      setError(null);
      setResult(response);
    }
  }

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Get Solution</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Job ID</label>
          <input
            type="text"
            className="form-control"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Retrieve Solution
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error {error.status || ""}:</strong> {error.message || "Validation error"}
          {error.details && Array.isArray(error.details) && (
            <ul className="mt-2">
              {error.details.map((d, i) => (
                <li key={i}>
                  <strong>Loc:</strong> {d.loc?.join(" → ") || "unknown"} <br />
                  <strong>Msg:</strong> {d.msg} <br />
                  <strong>Type:</strong> {d.type}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {result && (
        <div className="alert alert-success mt-3">
          <strong>Solution:</strong>
          <pre className="mt-2">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GetSolution;
