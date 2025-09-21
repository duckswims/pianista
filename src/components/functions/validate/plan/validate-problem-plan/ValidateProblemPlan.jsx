import React, { useState } from "react";
import { validateProblemPlan } from "../../../../../scripts/api/validateProblemPlan";
import ErrorDisplay from "../../../../response/error/ErrorDisplay";
import ResultDisplay from "../../../../response/result/ResultDisplay";

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
          <label className="form-label">Plan</label>
          <textarea
            className="form-control"
            rows="4"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
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

        <button type="submit" className="btn btn-primary">
          Validate Plan
        </button>
      </form>

      {/* Error / Result */}
      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default ValidateProblemPlan;
