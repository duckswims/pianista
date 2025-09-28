import CardGrid from "../components/layout/card-grid/CardGrid";
import componentsData from "../components/data/components.json";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Arguments passed into HomeCardGrid
  const excludedKeys = ["root", "planners", "solvers"];
  const filteredData = Object.entries(componentsData).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  return (
    <>
      <div>
      </div>
      <CardGrid
        data={filteredData}
        onNavigate={(link) => navigate(link)}
      />
    </>
  );
}

export default Home;
