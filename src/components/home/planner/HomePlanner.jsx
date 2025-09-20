import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePlanner({ description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/planner");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h2 className="card-title">Planner</h2>
          <p className="card-text mt-3">{description}</p>
          <button className="btn btn-primary mt-3" onClick={handleClick}>
            Go to Planner
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePlanner;
