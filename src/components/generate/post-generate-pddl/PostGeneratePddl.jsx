import React, { useState } from "react";
import { postGeneratePddl } from "../../../scripts/api/post_generate_pddl";

function PostGeneratePddl() {
  const [pddlType, setPddlType] = useState("domain");
  const [text, setText] = useState("");
  const [domain, setDomain] = useState("");
  const [generateBoth, setGenerateBoth] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await postGeneratePddl(
      pddlType,
      { text, domain },
      generateBoth,
      attempts
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
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Generate PDDL</h3>

      <form onSubmit={handleSubmit}>
        {/* PDDL Type */}
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

        {/* Prompt Text */}
        <div className="mb-3">
          <label className="form-label">Prompt Text</label>
          <textarea
            className="form-control"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        {/* Domain (optional) */}
        <div className="mb-3">
          <label className="form-label">Domain (optional)</label>
          <textarea
            className="form-control"
            rows="3"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        {/* Generate Both */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={generateBoth}
            onChange={() => setGenerateBoth(!generateBoth)}
            id="generateBothCheck"
          />
          <label className="form-check-label" htmlFor="generateBothCheck">
            Generate both domain and problem
          </label>
        </div>

        {/* Attempts */}
        <div className="mb-3">
          <label className="form-label">Attempts</label>
          <input
            type="number"
            className="form-control"
            value={attempts}
            min="1"
            onChange={(e) => setAttempts(Number(e.target.value))}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Generate
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error {error.status || ""}:</strong> {error.message || "Generation error"}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="alert alert-success mt-3">
          <p><strong>Result Status:</strong> {result.result_status || "Unknown"}</p>
          {result.generated_domain && (
            <div className="mt-2">
              <strong>Generated Domain:</strong>
              <pre className="bg-light p-2 mt-1">{result.generated_domain}</pre>
            </div>
          )}
          {result.generated_problem && (
            <div className="mt-2">
              <strong>Generated Problem:</strong>
              <pre className="bg-light p-2 mt-1">{result.generated_problem}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostGeneratePddl;
