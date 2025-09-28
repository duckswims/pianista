import React, { useState } from "react";
import { validateProblemPlan } from "../../../scripts/pianista-api/validate";
import { removeWhitespaces } from "../../../scripts/helper/removeWhitespaces";
import ErrorDisplay from "../../../components/feedback/ErrorDisplay";
import ResultDisplay from "../../../components/feedback/ResultDisplay";
import "../../styles.css"

function ValidateProblemPlan() {
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [plan, setPlan] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const requestBody = {
      domain: removeWhitespaces(domain),
      problem: removeWhitespaces(problem),
      plan: removeWhitespaces(plan),
    };

    const response = await validateProblemPlan(requestBody);

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
      <p className="text-muted fst-italic mb-3">
        Validate that a precomputed plan is valid for a given problem.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Domain <span className="required">*</span>
          </label>
          <textarea
            className="form-control"
            rows="4"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Problem <span className="required">*</span>
          </label>
          <textarea
            className="form-control"
            rows="4"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>


        <div className="mb-3">
          <label className="form-label">
            Plan <span className="required">*</span>
          </label>
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

      {/* Error / Result */}
      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default ValidateProblemPlan;
