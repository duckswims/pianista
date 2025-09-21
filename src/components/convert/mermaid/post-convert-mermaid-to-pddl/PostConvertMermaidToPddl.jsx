import React, { useState } from "react";
import { postConvertMermaidToPddl } from "../../../../scripts/api/post_convert_mermaid_to_pddl";

export default function PostConvertMermaidToPddl() {
  const [text, setText] = useState("");
  const [domain, setDomain] = useState("");
  const [attempts, setAttempts] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await postConvertMermaidToPddl(
        { text, domain },
        attempts
      );

      if (response.error) {
        setError(response);
      } else {
        setResult(response);
      }
    } catch (err) {
      setError({ message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Convert Mermaid to PDDL</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Mermaid Code</label>
          <textarea
            className="form-control"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Domain (optional)</label>
          <textarea
            className="form-control"
            rows="2"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Attempts</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={attempts}
            onChange={(e) => setAttempts(Number(e.target.value))}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error:</strong> {error.message || "Conversion failed"}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="alert alert-success mt-3">
          <p>
            <strong>Result:</strong>
          </p>
          <pre className="whitespace-pre-wrap">{result.conversion_result}</pre>
        </div>
      )}
    </div>
  );
}
