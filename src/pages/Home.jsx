import Welcome from "../components/home/welcome/Welcome";
import HomeCardGrid from "../components/home/HomeCardGrid";
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
        <Welcome />
      </div>
      <HomeCardGrid
        data={filteredData}
        onNavigate={(link) => navigate(link)}
      />
    </>
  );
}

export default Home;
