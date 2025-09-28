import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  flowchart: { useMaxWidth: true },
});

/**
 * Generates a Mermaid diagram inside a specific container.
 * @param {string} code - The Mermaid diagram code
 * @param {HTMLElement} container - The element to insert the diagram into
 */
export async function generateMermaidDiagram(code, container) {
  if (!code.trim()) return;

  try {
    // Validate syntax first
    mermaid.parse(code);

    // Render diagram into string
    const svgCode = await mermaid.render("mermaidDiagram", code);

    // Insert SVG into container
    container.innerHTML = svgCode.svg;
  } catch (err) {
    console.warn("Mermaid rendering error (ignored):", err);
    // Optional: clear the container if rendering failed
    container.innerHTML = "";
  }
}
