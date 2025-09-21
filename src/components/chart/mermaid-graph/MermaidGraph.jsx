import React, { useState } from "react";
import mermaid from "mermaid";

function MermaidGraph() {
  const [mermaidText, setMermaidText] = useState("");
  const [svgContent, setSvgContent] = useState("");

  const generateGraph = () => {
    try {
      mermaid.mermaidAPI.render("mermaid-svg", mermaidText, (svgCode) => {
        setSvgContent(svgCode);
      });
    } catch (err) {
      setSvgContent(
        `<text x="10" y="20" fill="red">Invalid Mermaid Syntax</text>`
      );
      console.error("Mermaid render error:", err);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Mermaid Graph</h3>

      {/* Mermaid input */}
      <div className="mb-3">
        <label className="form-label">Mermaid Code</label>
        <textarea
          className="form-control"
          rows="6"
          value={mermaidText}
          onChange={(e) => setMermaidText(e.target.value)}
        />
      </div>

      {/* Generate button */}
      <button className="btn btn-primary mb-3" onClick={generateGraph}>
        Generate Graph
      </button>

      {/* Rendered graph */}
      {svgContent && (
        <div
          className="mermaid mt-3"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
}

export default MermaidGraph;
