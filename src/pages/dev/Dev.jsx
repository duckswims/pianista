import CardGrid from "../../components/card-grid/CardGrid";
import componentsData from "../../components/data/components.json";
import { useNavigate } from "react-router-dom";

export default function Dev() {
  const navigate = useNavigate();
  const excludedKeys = ["root", "planners", "solvers"];
  const filteredData = Object.entries(componentsData).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Development Mode</h2>
      <CardGrid
        data={filteredData}
        onNavigate={(link) => navigate(link)}
      />
    </div>
  );
}
