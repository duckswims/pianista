import React from "react";
import { useNavigate } from "react-router-dom";
import componentsData from "../components/data/components.json";
import CardGrid from "../components/card-grid/CardGrid.jsx";

function Validate() {
  const navigate = useNavigate();
  const validateData = componentsData.validate;

  if (!validateData || !validateData.Children) {
    return (
      <div className="container mt-4">
        <h2>No Validate options available</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{validateData.Title}</h1>
      <p className="mb-4">{validateData.Description}</p>

      <CardGrid
        data={Object.entries(validateData.Children)}
        onNavigate={(link) => navigate(link)}
      />
    </div>
  );
}

export default Validate;
