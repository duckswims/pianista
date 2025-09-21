import React, { useState, useEffect } from "react";
import { postPlan } from "../../../../scripts/api/post_plan";

function PostPlan({ plannerId }) {
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [plannerIdState, setPlannerIdState] = useState(plannerId || "");
  const [convertRealTypes, setConvertRealTypes] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPlannerIdState(plannerId || "");
  }, [plannerId]);

  async function handleSubmit(e) {
    e.preventDefault();

    const requestBody = { domain, problem };
    const response = await postPlan(
      requestBody,
      plannerIdState || null,
      convertRealTypes
    );

    if (response.error) {
      setError(response);
      setResult(null);
    } else {
      setError(null);
      setResult(response);
    }
  }

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-3">Post Plan</h3>
      <form onSubmit={handleSubmit}>
        {/* Planner ID */}
        <div className="mb-3">
          <label className="form-label">Planner ID (optional)</label>
          <input
            type="text"
            className="form-control"
            value={plannerIdState}
            onChange={(e) => setPlannerIdState(e.target.value)}
          />
        </div>

        {/* Domain */}
        <div className="mb-3">
          <label className="form-label">Domain</label>
          <textarea
            className="form-control"
            rows="4"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>

        {/* Problem */}
        <div className="mb-3">
          <label className="form-label">Problem</label>
          <textarea
            className="form-control"
            rows="4"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>

        {/* Convert Real Types */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="convertRealTypes"
            checked={convertRealTypes}
            onChange={(e) => setConvertRealTypes(e.target.checked)}
          />
          <label htmlFor="convertRealTypes" className="form-check-label">
            Convert Real Types
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Plan
        </button>
      </form>

      {/* Error / Result */}
      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error {error.status}:</strong> {error.message}
          {error.details && (
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
          <strong>Job Created:</strong> ID = {result.id}
        </div>
      )}
    </div>
  );
}

export default PostPlan;
