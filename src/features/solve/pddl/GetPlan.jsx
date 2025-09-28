import React, { useState } from "react";
import { getPlan } from "../../../scripts/api/pddl";
import ErrorDisplay from "../../../components/response/error/ErrorDisplay";
import ResultDisplay from "../../../components/response/result/ResultDisplay";
import "../../styles.css"

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
      <h3 className="mb-3">Get Plan</h3>
      <p className="text-muted fst-italic mb-3">
        Get a previously requested plan.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Plan ID <span className="required">*</span>
          </label>
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

      {/* Error / Result */}
      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default GetPlan;
