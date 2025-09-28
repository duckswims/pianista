// src/components/chat/SendMessageForm.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import arrowBtn from "../../assets/arrow-button/light.png";
import { getPlanners } from "../../scripts/api/planners";
import "./SendMessageForm.css";

export default function SendMessageForm({ value, onChange, onSubmit, loading }) {
  const textareaRef = useRef(null);
  const LINE_HEIGHT = 20;
  const MAX_LINES = 8;

  const [planners, setPlanners] = useState([]);
  const [selectedPlanner, setSelectedPlanner] = useState("");

  // Auto resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = MAX_LINES * LINE_HEIGHT;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }, [value]);

  // Fetch planners once
  const fetchPlanners = useCallback(async () => {
    try {
      const res = await getPlanners();
      if (Array.isArray(res)) {
        setPlanners(res);
        if (res.length > 0) setSelectedPlanner(res[0].id);
      }
    } catch (err) {
      console.error("Error fetching planners:", err);
    }
  }, []);

  useEffect(() => {
    fetchPlanners();
  }, [fetchPlanners]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value, selectedPlanner);
    onChange("");
  };

  return (
    <form className="send-message-form flex-column" onSubmit={handleSubmit}>
      {/* First row: textarea */}
      <div className="w-100">
        <textarea
          ref={textareaRef}
          className="send-message-textarea w-100"
          placeholder="Type your idea..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent newline
              handleSubmit(e);
            }
          }}
        />
      </div>

      {/* Second row: Planner & Submit */}
      <div className="row align-items-center w-100">
        <div className="col-auto d-flex align-items-center gap-2">
          <label className="mb-0">Planner:</label>
          <select
            className="form-select"
            style={{ width: "auto" }}
            value={selectedPlanner}
            onChange={(e) => setSelectedPlanner(e.target.value)}
          >
            {planners.map((planner) => (
              <option key={planner.id} value={planner.id}>
                {planner.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-auto ms-auto">
          <button type="submit" className="send-message-button" disabled={loading}>
            <img src={arrowBtn} alt="Send" className="send-message-btn-image" />
          </button>
        </div>
      </div>
    </form>
  );
}
