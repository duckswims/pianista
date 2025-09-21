import React, { useState } from "react";
import { postConvertPddlToMermaid } from "../../../../../scripts/api/postConvertPddlToMermaid";
import ErrorDisplay from "../../../../response/error/ErrorDisplay";
import ResultDisplay from "../../../../response/result/ResultDisplay";

export default function PostConvertPddlToMermaid() {
  const [pddlType, setPddlType] = useState("domain");
  const [pddl, setPddl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    const response = await postConvertPddlToMermaid(pddlType, pddl);

    if (response.error) {
      setError(response);
    } else {
      setResult(response);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Convert PDDL to Mermaid</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">PDDL Type</label>
          <select
            className="form-select"
            value={pddlType}
            onChange={(e) => setPddlType(e.target.value)}
          >
            <option value="domain">Domain</option>
            <option value="problem">Problem</option>
          </select>
        </div>

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
          Convert
        </button>
      </form>

      {/* Error and Result Display */}
      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}
