import React, { useState } from "react";
import { postGeneratePddl } from "../../../../../scripts/api/convert";
import { removeWhitespaces } from "../../../../../scripts/helper/removeWhitespaces";
import ErrorDisplay from "../../../../response/error/ErrorDisplay";
import ResultDisplay from "../../../../response/result/ResultDisplay";

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

    const requestBody = {
      text: removeWhitespaces(text),
      domain: removeWhitespaces(domain),
    };

    const response = await postGeneratePddl(
      pddlType,
      requestBody,
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

        <button type="submit" className="btn btn-primary">
          Generate
        </button>
      </form>

      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default PostGeneratePddl;
