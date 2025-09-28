import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import componentsData from "../components/data/components.json";
import CardGrid from "../components/layout/card-grid/CardGrid.jsx";

function SectionPage() {
  const { sectionKey } = useParams();
  const navigate = useNavigate();
  const sectionData = componentsData[sectionKey];

  if (!sectionData || !sectionData.Children) {
    return (
      <div className="container">
        <h2>No {sectionKey} options available</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">{sectionData.Title}</h2>
      <p className="mb-4">{sectionData.Description}</p>

      <CardGrid
        data={Object.entries(sectionData.Children)}
        onNavigate={(link) => navigate(link)}
      />
    </div>
  );
}

export default SectionPage;
