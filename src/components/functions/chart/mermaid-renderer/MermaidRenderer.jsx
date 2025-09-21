import React, { useState, useRef } from "react";
import mermaid from "mermaid";

function MermaidRenderer() {
  const [mermaidText, setMermaidText] = useState(""); 
  const [error, setError] = useState("");
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
    setError("");

    try {
      // Clear previous diagram
      if (diagramRef.current) diagramRef.current.innerHTML = "";

      console.log("Generating Mermaid diagram...");
      
      // Validate syntax first
      mermaid.parse(mermaidText);

      // Render diagram
      const { svg } = await mermaid.render("mermaidDiagram", mermaidText);
      console.log("Diagram generated successfully");
      
      if (diagramRef.current) diagramRef.current.innerHTML = svg;

    } catch (err) {
      console.error("Mermaid rendering error:", err);
      setError("Invalid Mermaid syntax. Please check your code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Dynamic Mermaid Diagram</h3>

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

      {error && <div className="alert alert-danger">{error}</div>}

      <div
        ref={diagramRef}
        style={{
          overflowX: "auto",
          minHeight: "400px",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      />
    </div>
  );
}

export default MermaidRenderer;
