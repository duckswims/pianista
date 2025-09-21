import React from "react";
import { useNavigate } from "react-router-dom";
import componentsData from "../components/data/components.json";
import CardGrid from "../components/card-grid/CardGrid.jsx";

function Solve() {
  const navigate = useNavigate();
  const solveData = componentsData.solve;

  if (!solveData || !solveData.Children) {
    return (
      <div className="container mt-4">
        <h2>No Solve options available</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{solveData.Title}</h1>
      <p className="mb-4">{solveData.Description}</p>

      <CardGrid
        data={Object.entries(solveData.Children)}
        onNavigate={(link) => navigate(link)} // pass navigate callback
      />
    </div>
  );
}

export default Solve;
