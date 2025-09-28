import React, { useState, useEffect } from "react";
import { postPlan } from "../../../scripts/pianista-api/pddl";
import { removeWhitespaces } from "../../../scripts/helper/removeWhitespaces";
import ErrorDisplay from "../../../components/response/error/ErrorDisplay";
import ResultDisplay from "../../../components/response/result/ResultDisplay";
import "../../styles.css"

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

    let cleanedDomain = removeWhitespaces(domain);
    let cleanedProblem = removeWhitespaces(problem);

    const requestBody = {
      domain: cleanedDomain,
      problem: cleanedProblem,
    };

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
      <p className="text-muted fst-italic mb-3">
        Post a planning request.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Planner ID */}
        <div className="mb-3">
          <label className="form-label">Planner ID</label>
          <input
            type="text"
            className="form-control"
            value={plannerIdState}
            onChange={(e) => setPlannerIdState(e.target.value)}
            placeholder="Select a planner above"
          />
        </div>

        {/* Domain */}
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

        {/* Problem */}
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

      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default PostPlan;
