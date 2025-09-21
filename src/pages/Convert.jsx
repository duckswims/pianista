import React from "react";
import { useNavigate } from "react-router-dom";
import componentsData from "../components/data/components.json";
import CardGrid from "../components/card-grid/CardGrid.jsx";

function Convert() {
  const navigate = useNavigate();
  const convertData = componentsData.convert;

  if (!convertData || !convertData.Children) {
    return (
      <div className="container mt-4">
        <h2>No Convert options available</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{convertData.Title}</h1>
      <p className="mb-4">{convertData.Description}</p>

      <CardGrid
        data={Object.entries(convertData.Children)}
        onNavigate={(link) => navigate(link)}
      />
    </div>
  );
}

export default Convert;
