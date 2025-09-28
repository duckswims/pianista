// src/components/tools/mermaid/MermaidRender.jsx
import React, { useState, useRef } from "react";
import ErrorDisplay from "../../components/feedback/ErrorDisplay";
import ResultDisplay from "../../components/feedback/ResultDisplay";
import { generateMermaidDiagram } from "../../utils/mermaid";

function MermaidRender() {
  const [mermaidText, setMermaidText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const diagramRef = useRef(null);

  const handleGenerate = async () => {
    if (!mermaidText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Clear previous diagram
      if (diagramRef.current) diagramRef.current.innerHTML = "";

      // Use helper function from scripts
      const { svg } = await generateMermaidDiagram(mermaidText);

      // Inject SVG into DOM
      if (diagramRef.current) diagramRef.current.innerHTML = svg;

      // Set result
      setResult({ generated_mermaid: svg });
    } catch (err) {
      setError({
        status: "Invalid Syntax",
        message: "Mermaid code could not be rendered.",
        details: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Mermaid Render</h3>

      <div className="mb-3">
        <label className="form-label">Mermaid Code</label>
        <textarea
          className="form-control"
          rows="8"
          placeholder="Enter any Mermaid code here..."
          value={mermaidText}
          onChange={(e) => setMermaidText(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary mb-3"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Diagram"}
      </button>

      {/* Error / Result */}
      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default MermaidRender;
