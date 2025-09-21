import React from "react";
import { useNavigate } from "react-router-dom";
import componentsData from "../components/data/components.json";
import CardGrid from "../components/card-grid/CardGrid.jsx";

function Chart() {
  const navigate = useNavigate();
  const chartData = componentsData.chart;

  if (!chartData || !chartData.Children) {
    return (
      <div className="container mt-4">
        <h2>No Chart options available</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{chartData.Title}</h1>
      <p className="mb-4">{chartData.Description}</p>

      <CardGrid
        data={Object.entries(chartData.Children)}
        onNavigate={(link) => navigate(link)}
      />
    </div>
  );
}

export default Chart;
