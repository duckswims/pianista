import React, { useState } from "react";
import { getSolution } from "../../../../../scripts/api/minizinc";
import ErrorDisplay from "../../../../response/error/ErrorDisplay";
import ResultDisplay from "../../../../response/result/ResultDisplay";
import "../../../styles.css"

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
          <label className="form-label">
            Job ID <span className="required">*</span>
          </label>
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

      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default GetSolution;
