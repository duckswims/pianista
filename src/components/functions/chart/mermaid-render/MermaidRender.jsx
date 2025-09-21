import React, { useState, useRef } from "react";
import mermaid from "mermaid";
import ErrorDisplay from "../../../response/error/ErrorDisplay";
import ResultDisplay from "../../../response/result/ResultDisplay";

function MermaidRender() {
  const [mermaidText, setMermaidText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const diagramRef = useRef(null);

  // Initialize Mermaid
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
    flowchart: { useMaxWidth: true },
  });

  const generateDiagram = async () => {
    if (!mermaidText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Clear previous diagram
      if (diagramRef.current) diagramRef.current.innerHTML = "";

      // Validate Mermaid syntax
      mermaid.parse(mermaidText);

      // Render diagram
      const { svg } = await mermaid.render("mermaidDiagram", mermaidText);
      if (diagramRef.current) diagramRef.current.innerHTML = svg;

      // Send SVG as result
      setResult({ generated_mermaid: svg });

    } catch (err) {
      console.error("Mermaid rendering error:", err);
      setError({
        status: "Invalid Syntax",
        message: "Mermaid code could not be rendered.",
        details: err?.str || err?.message || "Unknown error",
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
        onClick={generateDiagram}
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