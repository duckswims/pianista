import React, { useState } from "react";
import { postValidatePddlMatch } from "../../../api/validate";
import { removeWhitespaces } from "../../../scripts/helper/removeWhitespaces";
import ErrorDisplay from "../../../components/feedback/ErrorDisplay";
import ResultDisplay from "../../../components/feedback/ResultDisplay";
import "../../styles.css"

function PostValidatePddlMatch() {
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      domain: removeWhitespaces(domain),
      problem: removeWhitespaces(problem),
    };

    const response = await postValidatePddlMatch(requestBody);

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
      <p className="text-muted fst-italic mb-3">
        Validate that problem references domain.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Domain PDDL <span className="required">*</span>
          </label>
          <textarea
            className="form-control"
            rows="6"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Problem PDDL <span className="required">*</span>
          </label>
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

      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default PostValidatePddlMatch;
