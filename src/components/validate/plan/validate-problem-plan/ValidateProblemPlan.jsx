import React, { useState } from "react";
import { validateProblemPlan } from "../../../../scripts/api/validate_problem_plan";

function ValidateProblemPlan() {
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [plan, setPlan] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await validateProblemPlan(domain, problem, plan);

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
      <h3 className="mb-3">Validate Problem Plan</h3>

      <form onSubmit={handleSubmit}>
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

        <div className="mb-3">
          <label className="form-label">Plan</label>
          <textarea
            className="form-control"
            rows="4"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Validate Plan
        </button>
      </form>

      {/* Error */}
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

      {/* Result */}
      {result && (
        <div className="alert alert-success mt-3">
          <p>
            <strong>Result:</strong> {result.result || "Unknown"}
          </p>
          {result.pddl_type && (
            <p>
              <strong>PDDL Type:</strong> {result.pddl_type}
            </p>
          )}
          {result.message && (
            <p>
              <strong>Message:</strong> {result.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ValidateProblemPlan;
