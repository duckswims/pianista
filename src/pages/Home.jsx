import Welcome from "../components/home/welcome/Welcome";
import HomePlanner from "../components/home/planner/HomePlanner";
import HomeSolver from "../components/home/solver/HomeSolver";

function Home() {
  return (
    <>
      {/* Welcome section */}
      <div>
        <Welcome />
      </div>

      {/* HomePlanner section inside a Bootstrap container */}
      <div className="container mt-4">
        <HomePlanner description="Create plans for your domain and problem using Pianista." />
        <HomeSolver description="Run solvers to execute plans or validate solutions." />
      </div>
    </>
  );
}

export default Home;
