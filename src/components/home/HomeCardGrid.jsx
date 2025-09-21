import React from "react";

function HomeCardGrid({ data, onNavigate }) {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        {data.map(([key, comp]) => (
          <div className="col-md-6" key={key}>
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h2 className="card-title">{comp.Title}</h2>
                <p className="card-text mt-3">{comp.Description}</p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => onNavigate(comp.Link)}
                >
                  Go to {comp.Title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeCardGrid;
