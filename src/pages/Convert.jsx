import React from "react";
import { useNavigate } from "react-router-dom";
import componentsData from "../components/data/components.json";

function Convert() {
  const navigate = useNavigate();
  const convertData = componentsData.convert;

  if (!convertData || !convertData.Children) {
    return (
      <div className="container mt-4">
        <h2>No Validate options available</h2>
      </div>
    );
  }

  const renderCard = (key, comp) => (
    <div className="col-md-6" key={key}>
      <div className="card shadow-sm h-100">
        <div className="card-body text-center">
          <h2 className="card-title">{comp.Title}</h2>
          {comp.Description && (
            <p className="card-text mt-3">{comp.Description}</p>
          )}
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate(comp.Link)} // absolute path
          >
            Go to {comp.Title}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{convertData.Title}</h1>
      <p className="mb-4">{convertData.Description}</p>

      <div className="row g-4 mb-4">
        {Object.entries(convertData.Children).map(([childKey, child]) =>
          renderCard(childKey, child)
        )}
      </div>
    </div>
  );
}

export default Convert;
