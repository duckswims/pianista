import React from "react";
import { useNavigate } from "react-router-dom";

function HomeValidate({ description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/validate");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h2 className="card-title">Validation</h2>
          <p className="card-text mt-3">{description}</p>
          <button className="btn btn-primary mt-3" onClick={handleClick}>
            Go to Validate
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeValidate;
