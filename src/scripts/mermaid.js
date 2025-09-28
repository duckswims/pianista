// src/scripts/mermaid.js
import mermaid from "mermaid";

// Initialize Mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  flowchart: { useMaxWidth: true },
});

/**
 * Generates a Mermaid diagram from text.
 * @param {string} code - The Mermaid diagram code
 * @returns {Promise<{ svg: string }>} - The generated SVG
 * @throws {Error} - If parsing or rendering fails
 */
export async function generateMermaidDiagram(code) {
  if (!code.trim()) {
    throw new Error("Mermaid code is empty.");
  }

  try {
    // Validate syntax first
    mermaid.parse(code);

    // Render diagram
    const { svg } = await mermaid.render("mermaidDiagram", code);
    return { svg };
  } catch (err) {
    console.error("Mermaid rendering error:", err);
    throw new Error(err?.str || err?.message || "Unknown Mermaid rendering error");
  }
}
