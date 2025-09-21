import React, { useState } from "react";
import { getPlan } from "../../../../scripts/api/get_plan";

function GetPlan() {
  const [planId, setPlanId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await getPlan(planId);

    if (response.error || response.status) {
      setError(response);
      setResult(null);
    } else {
      setError(null);
      setResult(response);
    }
  }

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Get a Plan</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Plan ID</label>
          <input
            type="text"
            className="form-control"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Retrieve Plan
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error {error.status || ""}:</strong> {error.message || "Validation error"}
          {error.detail && Array.isArray(error.detail) && (
            <ul className="mt-2 mb-0">
              {error.detail.map((d, i) => (
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

      {/* Result */}
      {result && (
        <div className="alert alert-success mt-3">
          <strong>Success: </strong>
          <pre className="mt-2">{result.detail}</pre>
        </div>
      )}
    </div>
  );
}

export default GetPlan;
