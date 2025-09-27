import React, { useState } from "react";
import { postValidatePddl } from "../../../../../scripts/api/validate";
import { removeWhitespaces } from "../../../../../scripts/helper/removeWhitespaces";
import ErrorDisplay from "../../../../response/error/ErrorDisplay";
import ResultDisplay from "../../../../response/result/ResultDisplay";
import "../../../styles.css"

function PostValidatePddl() {
  const [pddl, setPddl] = useState("");
  const [pddlType, setPddlType] = useState(""); // "domain" or "problem"
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      pddl: removeWhitespaces(pddl),
    };

    const response = await postValidatePddl(requestBody, pddlType || null);

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
          <label className="form-label">PDDL Type</label>
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
          <label className="form-label">
            PDDL Content <span className="required">*</span>
          </label>
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

      {/* Error / Result */}
      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default PostValidatePddl;
