import React, { useState } from "react";
import { postValidatePddlMatch } from "../../../../../scripts/api/post_validate_pddl_match";

function PostValidatePddlMatch() {
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postValidatePddlMatch(domain, problem);

    if (response.error) {
      setError(response);
      setResult(null);
    } else {
      setResult(response);
      setError(null);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Validate PDDL Match</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Domain PDDL</label>
          <textarea
            className="form-control"
            rows="6"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Problem PDDL</label>
          <textarea
            className="form-control"
            rows="6"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Validate Match
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="alert alert-success mt-3">
          <strong>Result:</strong> {result.result} <br />
          <strong>Type:</strong> {result.pddl_type} <br />
          <strong>Message:</strong> {result.message}
        </div>
      )}

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
    </div>
  );
}

export default PostValidatePddlMatch;
