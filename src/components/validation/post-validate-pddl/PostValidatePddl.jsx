import React, { useState } from "react";
import { postValidatePddl } from "../../../scripts/api/post_validate_pddl";

function PostValidatePddl() {
  const [pddl, setPddl] = useState("");
  const [pddlType, setPddlType] = useState(""); // "domain" or "problem"
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const type = pddlType || null;
    const response = await postValidatePddl(pddl, type);

    if (response.error) {
      setError(response);
      setResult(null);
    } else {
      setError(null);
      setResult(response);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-3">Validate PDDL</h3>

      <form onSubmit={handleSubmit}>
        {/* PDDL Type */}
        <div className="mb-3">
          <label className="form-label">PDDL Type (optional)</label>
          <select
            className="form-select"
            value={pddlType}
            onChange={(e) => setPddlType(e.target.value)}
          >
            <option value="">Auto Detect</option>
            <option value="domain">Domain</option>
            <option value="problem">Problem</option>
          </select>
        </div>

        {/* PDDL Content */}
        <div className="mb-3">
          <label className="form-label">PDDL Content</label>
          <textarea
            className="form-control"
            rows="6"
            value={pddl}
            onChange={(e) => setPddl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Validate
        </button>
      </form>

      {/* Result / Error */}
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
          <p><strong>Result:</strong> {result.result}</p>
          <p><strong>PDDL Type:</strong> {result.pddl_type}</p>
          <p><strong>Message:</strong> {result.message}</p>
        </div>
      )}
    </div>
  );
}

export default PostValidatePddl;
