import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  flowchart: { useMaxWidth: true },
});

/**
 * Generates a Mermaid diagram and optionally inserts it into a container.
 * Returns the SVG string for further use.
 *
 * @param {string} code - Mermaid diagram code
 * @param {HTMLElement} [container] - Optional container to insert the diagram
 * @returns {Promise<{svg: string}>} - SVG code of the rendered diagram
 */
export async function generateMermaidDiagram(code, container) {
  if (!code.trim()) throw new Error("Empty Mermaid code");

  try {
    const trimmedCode = code.trim();
    const isGantt = trimmedCode.toLowerCase().startsWith("gantt");

    // For non-Gantt diagrams, validate syntax first
    if (!isGantt) {
      try {
        mermaid.parse(trimmedCode);
      } catch (parseErr) {
        console.warn("Mermaid syntax error:", parseErr);
        if (container) container.innerHTML = `<pre style="color:red">${parseErr.message}</pre>`;
        throw parseErr;
      }
    }

    const diagramId = `mermaidDiagram-${Date.now()}`;

    // Render diagram
    const svgCode = await mermaid.render(diagramId, trimmedCode);

    // Insert into container if provided
    if (container) {
      container.innerHTML = typeof svgCode === "string" ? svgCode : svgCode.svg;
    }

    return { svg: typeof svgCode === "string" ? svgCode : svgCode.svg };
  } catch (err) {
    console.warn("Mermaid rendering error:", err);
    if (container) container.innerHTML = `<pre style="color:red">${err.message}</pre>`;
    throw err;
  }
}


