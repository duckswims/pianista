import Welcome from "../components/home/welcome/Welcome";
import HomePlanner from "../components/home/planner/HomePlanner";
import HomeSolver from "../components/home/solver/HomeSolver";
import HomeValidation from "../components/home/validation/HomeValidation";
import HomeGenerate from "../components/home/generate/HomeGenerate";

function Home() {
  return (
    <>
      {/* Welcome section */}
      <div>
        <Welcome />
      </div>

      {/* Home sections in grid */}
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-6">
            <HomePlanner description="Create plans for your domain and problem using Pianista." />
          </div>
          <div className="col-md-6">
            <HomeSolver description="Run solvers to execute plans or validate solutions." />
          </div>
          <div className="col-md-6">
            <HomeValidation description="Run solvers to execute plans or validate solutions." />
          </div>
          <div className="col-md-6">
            <HomeGenerate description="Run solvers to execute plans or validate solutions." />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
