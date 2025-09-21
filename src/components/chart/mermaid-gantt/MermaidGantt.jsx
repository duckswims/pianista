import React, { useState, useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";

function MermaidGantt() {
  const [mermaidText, setMermaidText] = useState(""); // no example text
  const [tasks, setTasks] = useState([]);
  const ganttRef = useRef(null);

  // Parse Mermaid Gantt to frappe-gantt tasks
  const parseMermaidGantt = (text) => {
    if (!text) return [];
    const lines = text.split("\n");
    const taskLines = lines.filter((line) => line.includes(":"));
    return taskLines.map((line, idx) => {
      const [namePart, rest] = line.split(":");
      const name = namePart.trim();
      const parts = rest.split(",");
      const start = parts[1]?.trim();
      let duration = parts[2]?.trim() || "1d";

      // Convert duration to end date
      const days = parseInt(duration.replace("d", ""), 10) || 1;
      const end = start
        ? new Date(new Date(start).getTime() + days * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
        : start;

      return { id: `task-${idx}`, name, start, end, progress: 0 };
    });
  };

  // Update tasks whenever mermaidText changes
  useEffect(() => {
    setTasks(parseMermaidGantt(mermaidText));
  }, [mermaidText]);

  // Render Gantt chart
  useEffect(() => {
    if (!tasks.length) {
      if (ganttRef.current) ganttRef.current.innerHTML = "";
      return;
    }
    new Gantt(ganttRef.current, tasks, {
      onDateChange: (task) => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id ? { ...t, start: task.start, end: task.end } : t
          )
        );
      },
      onProgressChange: (task) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? { ...t, progress: task.progress } : t))
        );
      },
      view_mode: "Day",
    });
  }, [tasks]);

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Interactive Mermaid Gantt</h3>

      <div className="mb-3">
        <label className="form-label">Mermaid Gantt Text</label>
        <textarea
          className="form-control"
          rows="6"
          placeholder="Enter Mermaid Gantt code here..."
          value={mermaidText}
          onChange={(e) => setMermaidText(e.target.value)}
        />
      </div>

      <div ref={ganttRef} style={{ overflowX: "auto", minHeight: "400px" }} />
    </div>
  );
}

export default MermaidGantt;
