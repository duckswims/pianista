import React from "react";
import "./style.css";

import chartImg from "../../../assets/chart.png";
import convertImg from "../../../assets/convert.png";
import solveImg from "../../../assets/solve.png";
import validateImg from "../../../assets/validate.png";

const keyToImage = {
  chart: chartImg,
  convert: convertImg,
  solve: solveImg,
  validate: validateImg,
};

function CardGrid({ data, onNavigate }) {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        {data.map(([key, comp]) => {
          const imgSrc = keyToImage[key];

          return (
            <div className="col-12 col-md-6" key={key}>
              <div className="card shadow-sm h-100 card-hover text-center">
                {imgSrc && (
                  <div
                    className="card-img-container mt-3 mx-auto"
                    style={{ backgroundImage: `url(${imgSrc})` }}
                  />
                )}

                <div className="card-body">
                  <h4 className="card-title">{comp.Title}</h4>
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
          );
        })}
      </div>
    </div>
  );
}

export default CardGrid;
